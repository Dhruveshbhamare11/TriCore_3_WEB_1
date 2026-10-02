const fs = require('fs');

async function run() {
  // Create or get target
  let target;
  try {
    const newTabRes = await fetch('http://127.0.0.1:9222/json/new?http://localhost:3000/#/', { method: 'PUT' });
    target = await newTabRes.json();
    console.log('Opened new tab:', target.id, target.url);
  } catch (e) {
    const targetsRes = await fetch('http://127.0.0.1:9222/json');
    const targets = await targetsRes.json();
    target = targets[0];
  }

  if (!target) {
    console.error('No target available');
    return;
  }

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
      await new Promise(r => setTimeout(r, 2000));

      // Scroll to top
      await send('Runtime.evaluate', { expression: 'window.scrollTo(0, 0);' });
      await new Promise(r => setTimeout(r, 600));

      // 1. Capture Hero View
      let shot = await send('Page.captureScreenshot', { format: 'png' });
      if (shot && shot.data) {
        fs.writeFileSync('scratch/site_1_hero_dribbble.png', Buffer.from(shot.data, 'base64'));
        console.log('Saved scratch/site_1_hero_dribbble.png');
      }

      // 2. Scroll down to Proof In Action and Clover Grid
      await send('Runtime.evaluate', { expression: 'window.scrollBy(0, 750);' });
      await new Promise(r => setTimeout(r, 600));

      shot = await send('Page.captureScreenshot', { format: 'png' });
      if (shot && shot.data) {
        fs.writeFileSync('scratch/site_2_action_clover.png', Buffer.from(shot.data, 'base64'));
        console.log('Saved scratch/site_2_action_clover.png');
      }

      // 3. Scroll down to 3D Dark Forest Banner & Phone
      await send('Runtime.evaluate', { expression: 'window.scrollBy(0, 750);' });
      await new Promise(r => setTimeout(r, 600));

      shot = await send('Page.captureScreenshot', { format: 'png' });
      if (shot && shot.data) {
        fs.writeFileSync('scratch/site_3_dark_phone_banner.png', Buffer.from(shot.data, 'base64'));
        console.log('Saved scratch/site_3_dark_phone_banner.png');
      }

      // 4. Scroll down to Featured Primary Showcase & Footer
      await send('Runtime.evaluate', { expression: 'window.scrollBy(0, 800);' });
      await new Promise(r => setTimeout(r, 600));

      shot = await send('Page.captureScreenshot', { format: 'png' });
      if (shot && shot.data) {
        fs.writeFileSync('scratch/site_4_showcase_footer.png', Buffer.from(shot.data, 'base64'));
        console.log('Saved scratch/site_4_showcase_footer.png');
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
