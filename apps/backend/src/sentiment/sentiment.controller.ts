import { Controller, Post, Body } from '@nestjs/common';
import { SentimentService } from './sentiment.service';
import { AnalyzeSentimentDto } from './dto/analyze-sentiment.dto';

@Controller('sentiment')
export class SentimentController {
  constructor(private readonly sentimentService: SentimentService) {}

  @Post('analyze')
  analyze(@Body() dto: AnalyzeSentimentDto) {
    return this.sentimentService.analyze(dto);
  }
}
