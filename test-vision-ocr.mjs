import ollama from 'ollama';
import fs from 'fs';

async function testVision() {
  console.log('Testing multimodal vision extraction with gemma4:e4b...');
  const t0 = Date.now();
  const imgBuf = fs.readFileSync('public/assets/sample_invoice_inv4821.jpg');
  const b64 = imgBuf.toString('base64');

  const prompt = `Analyze this invoice image and extract the key details as strict JSON only.
Return ONLY valid JSON matching this schema, with no markdown code fences, no explanations:
{
  "vendor": "Name of Vendor/Supplier",
  "invoiceNumber": "Invoice Number",
  "date": "Invoice Date",
  "gstin": "GSTIN number",
  "item": "Description of items/goods",
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
      options: {
        temperature: 0.1
      }
    });

    console.log(`Extraction took: ${Date.now() - t0}ms`);
    console.log('Raw output:');
    console.log(res.message.content);
  } catch (err) {
    console.error('Vision error:', err);
  }
}

testVision();
