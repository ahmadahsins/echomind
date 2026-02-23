import { Inject, Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { GoogleGenAI } from '@google/genai';
import { AnalyzeSentimentDto } from './dto/analyze-sentiment.dto';

@Injectable()
export class SentimentService {
  constructor(@Inject('GEMINI_CLIENT') private readonly ai: GoogleGenAI) {}

  async analyze(dto: AnalyzeSentimentDto) {
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Analisis sentimen dari teks berikut: '${dto.text}'. Berikan respon hanya dalam format JSON dengan key: sentiment (Positif/Negatif/Netral), confidence_score (0-1), dan explanation (singkat dalam Bahasa Indonesia).`,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: 'object' as const,
            properties: {
              sentiment: {
                type: 'string' as const,
                enum: ['Positif', 'Negatif', 'Netral'],
              },
              confidence_score: { type: 'number' as const },
              explanation: { type: 'string' as const },
            },
            required: ['sentiment', 'confidence_score', 'explanation'],
          },
        },
      });

      const result = JSON.parse(response.text ?? '{}');

      return {
        ...result,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      console.error('Gemini API error:', error);
      throw new HttpException(
        'Gagal menganalisis sentimen. Silakan coba lagi.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}


