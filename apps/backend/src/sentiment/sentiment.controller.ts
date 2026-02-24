import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SentimentService } from './sentiment.service';
import { AnalyzeSentimentDto } from './dto/analyze-sentiment.dto';

@ApiTags('Sentiment')
@Controller('sentiment')
export class SentimentController {
  constructor(private readonly sentimentService: SentimentService) {}

  @Post('analyze')
  @ApiOperation({ summary: 'Analisis sentimen teks menggunakan Gemini AI' })
  @ApiResponse({
    status: 200,
    description: 'Hasil analisis sentimen',
    schema: {
      example: {
        sentiment: 'Positif',
        confidence_score: 0.95,
        explanation:
          "Teks mengandung kata sifat positif seperti 'menyenangkan' dan 'asik'.",
        timestamp: '2026-02-24T03:30:00.000Z',
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Validasi gagal' })
  @ApiResponse({ status: 500, description: 'Gagal menganalisis sentimen' })
  analyze(@Body() dto: AnalyzeSentimentDto) {
    return this.sentimentService.analyze(dto);
  }
}
