# 🧠 EchoMind

Aplikasi mobile untuk menganalisis sentimen teks menggunakan Google Gemini AI.

## ✨ Fitur

- 📝 Input teks bebas
- 🤖 Analisis sentimen otomatis (Positif / Negatif / Netral)
- 📊 Confidence score & penjelasan
- 🎨 Dynamic UI sesuai hasil sentimen

## 🛠️ Tech Stack

| Layer | Technology |
| --- | --- |
| **Mobile** | React Native (Expo SDK 54) + Expo Router |
| **Styling** | NativeWind v4 (Tailwind CSS) |
| **Backend** | NestJS v11 |
| **AI** | Google Gemini API (`@google/genai`) |

## 📁 Struktur Proyek

```
echomind/
├── apps/
│   ├── mobile/       # Expo React Native
│   └── backend/      # NestJS API
├── package.json      # pnpm workspaces
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js ≥ 18
- Expo Go app (di HP)
- [Gemini API Key](https://aistudio.google.com/apikey)

### Setup

```bash
# 1. Clone & install
git clone https://github.com/your-username/echomind.git
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
{ "text": "Hari ini menyenangkan!" }
```

**Response:**
```json
{
  "sentiment": "Positif",
  "confidence_score": 0.95,
  "explanation": "Teks mengandung kata positif 'menyenangkan'.",
  "timestamp": "2026-02-23T13:18:00Z"
}
```

## 📄 Dokumentasi

Lihat [tech-spec.md](./tech-spec.md) untuk spesifikasi teknis lengkap.

## 📝 Lisensi

MIT
