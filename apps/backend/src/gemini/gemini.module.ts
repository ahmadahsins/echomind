import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GoogleGenAI } from '@google/genai';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: 'GEMINI_CLIENT',
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const apiKey = configService.get<string>('GEMINI_API_KEY');
        if (!apiKey) {
          throw new Error(
            'GEMINI_API_KEY is not defined in environment variables',
          );
        }
        return new GoogleGenAI({ apiKey });
      },
    },
  ],
  exports: ['GEMINI_CLIENT'],
})
export class GeminiModule {}
