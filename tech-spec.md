# 📄 Technical Specification: EchoMind

## 1. Ringkasan Proyek

**EchoMind** adalah aplikasi mobile sederhana untuk menganalisis sentimen dari teks yang diinputkan pengguna. Menggunakan Google Gemini AI, aplikasi ini mengklasifikasikan input menjadi **Positif**, **Negatif**, atau **Netral**, beserta penjelasan singkat.

## 2. Tech Stack

| Komponen | Teknologi | Alasan |
| --- | --- | --- |
| **Mobile Frontend** | React Native (Expo SDK 54) | Framework universal untuk membuat app native dengan React. Menggunakan **Expo Router** untuk file-based routing. |
| **Styling** | NativeWind v4 | Tailwind CSS untuk React Native, styling konsisten dengan pendekatan utility-first. |
| **Backend** | NestJS v11 | Framework Node.js terstruktur (modul, controller, service) dengan TypeScript. |
| **AI Integration** | Google Gemini API (`@google/genai`) | SDK terbaru Google GenAI. Model: `gemini-2.0-flash`. |
| **Validation** | class-validator | Validasi request body di NestJS menggunakan decorator. |
| **Communication** | Axios | HTTP client untuk komunikasi mobile app ↔ server. |

## 3. Arsitektur Sistem

1. **Client (Mobile):** User memasukkan teks → Request dikirim ke Backend via POST.
2. **Server (NestJS):** Memvalidasi request → Mengirim prompt ke Gemini API via `@google/genai`.
3. **AI Engine (Gemini):** Menganalisis teks → Mengembalikan JSON (sentiment, score, explanation).
4. **Server (NestJS):** Mengirimkan respon akhir ke Client.
5. **Client (Mobile):** Menampilkan hasil dengan warna dinamis (Hijau/Merah/Abu-abu).

## 4. Spesifikasi Fitur (MVP)

- **Input Field:** Area teks untuk menuliskan pesan atau perasaan.
- **Submit Button:** Tombol analisis dengan *loading state*.
- **Result Card:** Label sentimen, skor kepercayaan, dan penjelasan.
- **Dynamic UI:** Warna berubah berdasarkan hasil sentimen menggunakan NativeWind.

## 5. Rancangan API

**Endpoint:** `POST /api/sentiment/analyze`

**Request Body:**

```json
{
  "text": "Hari ini kuliah sangat menyenangkan karena dosennya asik!"
}
```

**Response Body (200):**

```json
{
  "sentiment": "Positif",
  "confidence_score": 0.95,
  "explanation": "Teks mengandung kata sifat positif seperti 'menyenangkan' dan 'asik'.",
  "timestamp": "2026-02-23T13:18:00Z"
}
```

## 6. Gemini Integration (Server-side)

Menggunakan SDK `@google/genai` (pengganti `@google/generative-ai` yang deprecated):

```typescript
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const response = await ai.models.generateContent({
  model: 'gemini-2.0-flash',
  contents: `Analisis sentimen dari teks berikut: '${inputText}'.`,
  config: {
    responseMimeType: 'application/json',
    responseSchema: {
      type: 'object',
      properties: {
        sentiment: { type: 'string', enum: ['Positif', 'Negatif', 'Netral'] },
        confidence_score: { type: 'number' },
        explanation: { type: 'string' },
      },
      required: ['sentiment', 'confidence_score', 'explanation'],
    },
  },
});
```

> Fitur `responseSchema` memastikan output Gemini selalu valid JSON sesuai schema, tanpa parsing manual.

## 7. Struktur Folder Proyek (Monorepo)

Menggunakan **pnpm workspaces** untuk mengelola frontend dan backend dalam satu repository.

```text
echomind/
├── apps/
│   ├── mobile/                     # Expo React Native
│   │   ├── app/                    # Expo Router (file-based routing)
│   │   │   ├── _layout.tsx
│   │   │   └── index.tsx
│   │   ├── components/             # InputField, SubmitButton, ResultCard
│   │   ├── services/               # API calls (sentimentApi.ts)
│   │   ├── global.css              # @tailwind base/components/utilities
│   │   ├── tailwind.config.js
│   │   ├── metro.config.js
│   │   ├── babel.config.js
│   │   └── package.json
│   │
│   └── backend/                    # NestJS
│       ├── src/
│       │   ├── sentiment/
│       │   │   ├── sentiment.controller.ts
│       │   │   ├── sentiment.service.ts
│       │   │   ├── sentiment.module.ts
│       │   │   └── dto/
│       │   │       └── analyze-sentiment.dto.ts
│       │   ├── app.module.ts
│       │   └── main.ts
│       ├── .env                    # GEMINI_API_KEY
│       └── package.json
│
├── package.json                    # Root (npm workspaces)
├── .gitignore
├── tech-spec.md
└── README.md
```

### `pnpm-workspace.yaml`:

```yaml
packages:
  - 'apps/*'
```

### Root `package.json`:

```json
{
  "name": "echomind",
  "private": true,
  "scripts": {
    "dev:mobile": "pnpm --filter mobile dev",
    "dev:backend": "pnpm --filter backend start:dev"
  }
}
```

