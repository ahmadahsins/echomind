import axios from "axios";
import { Platform } from "react-native";

export interface SentimentResult {
  sentiment: "Positif" | "Negatif" | "Netral";
  confidence_score: number;
  explanation: string;
  timestamp?: string;
}

// Android emulator uses 10.0.2.2 to reach host machine's localhost
// iOS simulator & physical devices use different addresses
const BASE_URL = Platform.select({
  android: "http://10.0.2.2:3000/api",
  ios: "http://localhost:3000/api",
  default: "http://localhost:3000/api",
});

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

export async function analyzeSentiment(text: string): Promise<SentimentResult> {
  const response = await api.post<SentimentResult>("/sentiment/analyze", {
    text,
  });
  return response.data;
}
