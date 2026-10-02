import fs from 'fs';
import Tesseract from 'tesseract.js';
import ollama from 'ollama';

async function testNewReceipt() {
  const filePath = 'public/assets/sample_receipt_meal_pack.jpg';
  const fileBuffer = fs.readFileSync(filePath);
  const b64 = fileBuffer.toString('base64');

  console.log('--- 1. Testing Tesseract OCR on user receipt ---');
  const t0 = Date.now();
  const { data: { text: rawText } } = await Tesseract.recognize(filePath, 'eng');
  console.log(`Tesseract completed in ${Date.now() - t0}ms`);
  console.log('RAW TEXT:\n', rawText);

  console.log('\n--- 2. Testing Arithmetic table parser ---');
  const lines = rawText.split('\n');
  let arithFound = null;
  for (const line of lines) {
    const rawNums = line.match(/\b\d[\d,]*(?:\.\d+)?\b/g);
    if (!rawNums || rawNums.length < 2) continue;
    const nums = rawNums.map(n => parseFloat(n.replace(/,/g, ''))).filter(n => !isNaN(n) && n > 0);
    for (let i = 0; i < nums.length; i++) {
      for (let j = 0; j < nums.length; j++) {
        if (i === j) continue;
        const q = nums[i];
        const p = nums[j];
        const prod = q * p;
        for (let k = 0; k < nums.length; k++) {
          if (k === i || k === j) continue;
          const t = nums[k];
          if (Math.abs(prod - t) < 1.0) {
            arithFound = { quantity: Math.min(q, p), unitPrice: Math.max(q, p), total: t, line };
            break;
          }
        }
      }
    }
  }
  console.log('Arithmetic parsed:', arithFound);

  console.log('\n--- 3. Testing Ollama Gemma 4 Vision on user receipt ---');
  const t1 = Date.now();
  const prompt = `Analyze this invoice image and extract key details as strict JSON only.
Return ONLY valid JSON matching this schema with no markdown formatting or extra text:
{
  "vendor": "Name of Vendor/Restaurant/Supplier",
  "invoiceNumber": "Invoice Number",
  "date": "Invoice Date",
  "gstin": "GSTIN",
  "darpanId": "NGO Darpan ID if present",
  "billTo": "Bill To Organization",
  "item": "Item Description",
  "quantity": 0,
  "unitPrice": 0,
  "subtotal": 0,
  "total": 0
}`;

  try {
    const res = await ollama.chat({
      model: 'gemma4:e4b',
      messages: [{
        role: 'user',
        content: prompt,
        images: [b64]
      }],
      options: { temperature: 0.1 }
    });
    console.log(`Ollama Gemma 4 Vision completed in ${Date.now() - t1}ms`);
    console.log('VISION JSON OUTPUT:\n', res.message.content);
  } catch (err) {
    console.error('Vision error:', err.message);
  }
}

testNewReceipt();
