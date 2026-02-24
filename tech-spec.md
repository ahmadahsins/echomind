# 📄 Technical Specification: EchoMind

## 1. Ringkasan Proyek

**EchoMind** adalah aplikasi mobile sederhana untuk menganalisis sentimen dari teks yang diinputkan pengguna. Menggunakan Google Gemini AI, aplikasi ini mengklasifikasikan input menjadi **Positif**, **Negatif**, atau **Netral**, beserta penjelasan singkat.

## 2. Tech Stack

| Komponen | Teknologi | Alasan |
| --- | --- | --- |
| **Mobile Frontend** | React Native (Expo SDK 54) | Framework universal untuk membuat app native dengan React. Menggunakan **Expo Router** untuk file-based routing. |
| **Styling** | NativeWind v4 + Tailwind CSS v3 | Tailwind CSS untuk React Native, styling konsisten dengan pendekatan utility-first. |
| **Backend** | NestJS v11 | Framework Node.js terstruktur (modul, controller, service) dengan TypeScript. |
| **AI Integration** | Google Gemini API (`@google/genai`) | SDK terbaru Google GenAI. Model: `gemini-2.5-flash`. |
| **Validation** | class-validator + class-transformer | Validasi request body di NestJS menggunakan decorator. |
| **Communication** | Axios | HTTP client untuk komunikasi mobile app ↔ server. |
| **API Docs** | Swagger (`@nestjs/swagger`) | Dokumentasi API interaktif, tersedia di `/api/docs`. |
| **Config** | `@nestjs/config` | Environment variable management via `.env`. |

## 3. Arsitektur Sistem

1. **Client (Mobile):** User memasukkan teks → Request dikirim ke Backend via POST (Axios).
2. **Server (NestJS):** Memvalidasi request via `ValidationPipe` → Mengirim prompt ke Gemini API via `@google/genai`.
3. **AI Engine (Gemini):** Menganalisis teks → Mengembalikan JSON (sentiment, score, explanation) via `responseSchema`.
4. **Server (NestJS):** Mengirimkan respon akhir ke Client.
5. **Client (Mobile):** Menampilkan hasil dengan warna dinamis (Emerald/Rose/Slate) via NativeWind.

## 4. Spesifikasi Fitur (MVP)

- **Input Field:** Area teks multiline dengan placeholder dan character counter (maks 1000 karakter).
- **Submit Button:** Tombol analisis dengan *loading state* dan disabled state.
- **Result Card:** Label sentimen dengan emoji, confidence score (progress bar), penjelasan, dan timestamp.
- **Dynamic UI:** Warna berubah berdasarkan hasil sentimen:
  - Positif → Emerald 🟢
  - Negatif → Rose 🔴
  - Netral → Slate ⚪

## 5. Rancangan API

### `POST /api/sentiment/analyze`

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

**Error Responses:**
- `400` — Validasi gagal (teks kosong / melebihi 1000 karakter)
- `500` — Gagal menganalisis sentimen

> 📚 Dokumentasi API interaktif tersedia di **`/api/docs`** (Swagger UI).

## 6. Gemini Integration (Server-side)

Menggunakan SDK `@google/genai` dengan **GeminiModule** yang menginisialisasi `GoogleGenAI` client via `useFactory` provider:

```typescript
// gemini.module.ts
@Module({
  providers: [
    {
      provide: 'GEMINI_CLIENT',
      useFactory: (configService: ConfigService) =>
        new GoogleGenAI({ apiKey: configService.get<string>('GEMINI_API_KEY') }),
      inject: [ConfigService],
    },
  ],
  exports: ['GEMINI_CLIENT'],
})
export class GeminiModule {}
```

```typescript
// sentiment.service.ts
const response = await this.ai.models.generateContent({
  model: 'gemini-2.5-flash',
  contents: `Analisis sentimen dari teks berikut: '${dto.text}'.`,
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
│   │   │   ├── _layout.tsx         # Root layout + import global.css
│   │   │   └── index.tsx           # Main screen
│   │   ├── components/
│   │   │   ├── InputField.tsx      # Multiline input + char counter
│   │   │   ├── SubmitButton.tsx    # Button with loading state
│   │   │   └── ResultCard.tsx      # Dynamic sentiment card
│   │   ├── services/
│   │   │   └── sentimentApi.ts     # Axios API client
│   │   ├── global.css              # @tailwind base/components/utilities
│   │   ├── tailwind.config.js      # NativeWind preset + custom colors
│   │   ├── metro.config.js         # withNativeWind wrapper
│   │   ├── babel.config.js         # jsxImportSource: "nativewind"
│   │   ├── app.json                # Expo config
│   │   └── package.json
│   │
│   └── backend/                    # NestJS
│       ├── src/
│       │   ├── gemini/
│       │   │   └── gemini.module.ts    # GoogleGenAI useFactory provider
│       │   ├── sentiment/
│       │   │   ├── sentiment.controller.ts  # POST /sentiment/analyze
│       │   │   ├── sentiment.service.ts     # Gemini integration
│       │   │   ├── sentiment.module.ts
│       │   │   └── dto/
│       │   │       └── analyze-sentiment.dto.ts
│       │   ├── app.module.ts           # ConfigModule, GeminiModule, SentimentModule
│       │   └── main.ts                # ValidationPipe, CORS, Swagger setup
│       ├── .env                        # GEMINI_API_KEY
│       └── package.json
│
├── package.json                    # Root (pnpm workspaces)
├── pnpm-workspace.yaml
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
    "dev:mobile": "pnpm --filter mobile start",
    "dev:backend": "pnpm --filter backend start:dev"
  }
}
```
