const fs = require('fs');

async function run() {
  const targetsRes = await fetch('http://127.0.0.1:9222/json');
  const targets = await targetsRes.json();
  const target = targets.find(t => t.id === '93674291F28AD9BDCB53C0778D82A44E');
  if (!target) {
    console.error('Target not found');
    return;
  }
  console.log('Connecting to:', target.webSocketDebuggerUrl);

  const ws = new WebSocket(target.webSocketDebuggerUrl);
  let id = 1;
  const pending = new Map();

  function send(method, params = {}) {
    return new Promise((resolve, reject) => {
      const msgId = id++;
      pending.set(msgId, { resolve, reject });
      ws.send(JSON.stringify({ id: msgId, method, params }));
    });
  }

  ws.onmessage = (evt) => {
    const res = JSON.parse(evt.data);
    if (res.id && pending.has(res.id)) {
      const { resolve, reject } = pending.get(res.id);
      pending.delete(res.id);
      if (res.error) reject(res.error);
      else resolve(res.result);
    }
  };

  ws.onopen = async () => {
    try {
      console.log('Connected to CDP!');

      // 1. Evaluate to find all images and text snippets
      const evalRes = await send('Runtime.evaluate', {
        expression: `
          (() => {
            const mediaImgs = Array.from(document.querySelectorAll('img')).map(img => ({
              src: img.src,
              alt: img.alt,
              width: img.naturalWidth || img.width,
              height: img.naturalHeight || img.height
            })).filter(img => img.src.includes('cdn.dribbble.com/userupload') || img.width > 300);

            const headings = Array.from(document.querySelectorAll('h1, h2, h3')).map(h => h.innerText.trim()).filter(Boolean);
            const shotDesc = document.querySelector('.shot-desc')?.innerText || document.querySelector('.shot-description')?.innerText || '';

            return {
              images: mediaImgs,
              headings: headings,
              shotDesc: shotDesc
            };
          })()
        `,
        returnByValue: true
      });

      console.log('Extracted DOM data:', JSON.stringify(evalRes.result.value, null, 2));

      // 2. Capture screenshot of the viewport
      const screenshotRes = await send('Page.captureScreenshot', {
        format: 'png',
        captureBeyondViewport: false
      });

      if (screenshotRes && screenshotRes.data) {
        fs.writeFileSync('scratch/dribbble_screenshot.png', Buffer.from(screenshotRes.data, 'base64'));
        console.log('Saved screenshot to scratch/dribbble_screenshot.png');
      }

      ws.close();
      process.exit(0);
    } catch (err) {
      console.error('CDP Error:', err);
      ws.close();
      process.exit(1);
    }
  };

  ws.onerror = (e) => console.error('WS Error:', e);
}

run();
