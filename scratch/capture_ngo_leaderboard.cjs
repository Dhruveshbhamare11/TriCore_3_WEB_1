const fs = require('fs');

async function run() {
  const targetsRes = await fetch('http://127.0.0.1:9222/json');
  const targets = await targetsRes.json();
  const target = targets[0];
  if (!target) {
    console.error('No CDP target available');
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
      console.log('Connected to CDP');
      await send('Page.enable');
      await send('Emulation.setDeviceMetricsOverride', { width: 1400, height: 1100, deviceScaleFactor: 1, mobile: false });
      
      console.log('Navigating to NGO profile...');
      await send('Page.navigate', { url: 'http://localhost:3000/#/ngo/ngo_udaan/leaderboard' });
      await new Promise(r => setTimeout(r, 2000));

      // Scroll to leaderboard section
      await send('Runtime.evaluate', { expression: 'window.scrollTo(0, 380);' });
      await new Promise(r => setTimeout(r, 800));

      const shot = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync('scratch/ngo_udaan_leaderboard.png', Buffer.from(shot.data, 'base64'));
      console.log('Captured scratch/ngo_udaan_leaderboard.png successfully!');
      
      ws.close();
      process.exit(0);
    } catch(err) {
      console.error('Error during capture:', err);
      process.exit(1);
    }
  };
}

run();
