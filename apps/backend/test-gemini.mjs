import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envContent = fs.readFileSync(path.join(__dirname, '.env'), 'utf8');
const apiKey = envContent.match(/GEMINI_API_KEY=(.*)/)[1].trim();

const ai = new GoogleGenAI({ apiKey });

const models = ['gemini-2.0-flash-lite', 'gemini-1.5-flash-8b', 'gemini-2.0-flash'];

for (const model of models) {
  try {
    console.log(`\nTesting ${model}...`);
    const r = await ai.models.generateContent({ model, contents: 'Say hi' });
    console.log(`✅ ${model}: ${r.text}`);
    break;
  } catch (e) {
    console.log(`❌ ${model}: ${e.status} - quota exceeded`);
  }
}
