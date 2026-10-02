const https = require('https');
const fs = require('fs');

const options = {
  hostname: 'dribbble.com',
  path: '/shots/25209975-Empowering-Interfaces-UI-UX-Design-for-an-NGO-Website',
  method: 'GET',
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.9',
    'Cache-Control': 'no-cache'
  }
};

const req = https.request(options, (res) => {
  console.log('Status code:', res.statusCode);
  if (res.statusCode === 301 || res.statusCode === 302) {
    console.log('Redirect to:', res.headers.location);
  }
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    fs.writeFileSync('scratch/dribbble_raw.html', data);
    console.log('HTML size:', data.length);
    const ogImg = data.match(/<meta\s+property=["']og:image["']\s+content=["']([^"']+)["']/i);
    const twImg = data.match(/<meta\s+name=["']twitter:image["']\s+content=["']([^"']+)["']/i);
    console.log('og:image:', ogImg ? ogImg[1] : 'null');
    console.log('twitter:image:', twImg ? twImg[1] : 'null');
    const cdnMatches = data.match(/https:\/\/cdn\.dribbble\.com\/userupload\/[^"'\s<>]+/g);
    if (cdnMatches) {
      console.log('CDN uploads:', [...new Set(cdnMatches)]);
    }
  });
});
req.on('error', (e) => console.error(e));
req.end();
