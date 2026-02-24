# 🧠 EchoMind

Aplikasi mobile untuk menganalisis sentimen teks menggunakan Google Gemini AI.

## ✨ Fitur

- 📝 Input teks bebas (maks 1000 karakter)
- 🤖 Analisis sentimen otomatis (Positif / Negatif / Netral)
- 📊 Confidence score dengan progress bar & penjelasan
- 🎨 Dynamic UI — warna berubah sesuai hasil sentimen
- 📚 Swagger API docs di `/api/docs`

## 🛠️ Tech Stack

| Layer | Technology |
| --- | --- |
| **Mobile** | React Native (Expo SDK 54) + Expo Router |
| **Styling** | NativeWind v4 (Tailwind CSS v3) |
| **Backend** | NestJS v11 |
| **AI** | Google Gemini API (`@google/genai` · `gemini-2.5-flash`) |
| **API Docs** | Swagger (`@nestjs/swagger`) |

## 📁 Struktur Proyek

```
echomind/
├── apps/
│   ├── mobile/          # Expo React Native + NativeWind
│   │   ├── app/         # Expo Router (file-based routing)
│   │   ├── components/  # InputField, SubmitButton, ResultCard
│   │   └── services/    # Axios API client
│   └── backend/         # NestJS API
│       └── src/
│           ├── gemini/      # GoogleGenAI module (useFactory)
│           └── sentiment/   # Controller, Service, DTO
├── package.json         # pnpm workspaces
├── tech-spec.md
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js ≥ 18
- pnpm
- Expo Go app (di HP)
- [Gemini API Key](https://aistudio.google.com/apikey)

### Setup

```bash
# 1. Clone & install
git clone https://github.com/ahmadahsins/echomind.git
cd echomind
pnpm install

# 2. Setup env
cp apps/backend/.env.example apps/backend/.env
# Isi GEMINI_API_KEY di file .env

# 3. Jalankan backend
pnpm dev:backend

# 4. Jalankan mobile (terminal baru)
pnpm dev:mobile
```

## 📡 API

### `POST /api/sentiment/analyze`

**Request:**

```json
{ "text": "Hari ini kuliah sangat menyenangkan!" }
```

**Response:**

```json
{
  "sentiment": "Positif",
  "confidence_score": 0.95,
  "explanation": "Teks mengandung kata sifat positif seperti 'menyenangkan'.",
  "timestamp": "2026-02-23T13:18:00Z"
}
```

> 📚 Dokumentasi API interaktif: **`http://localhost:3000/api/docs`** (Swagger UI)

## 📄 Dokumentasi

Lihat [tech-spec.md](./tech-spec.md) untuk spesifikasi teknis lengkap.

## 📝 Lisensi

MIT
