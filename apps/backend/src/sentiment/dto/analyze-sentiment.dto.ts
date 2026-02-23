import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class AnalyzeSentimentDto {
  @IsString()
  @IsNotEmpty({ message: 'Teks tidak boleh kosong' })
  @MaxLength(1000, { message: 'Teks maksimal 1000 karakter' })
  text: string;
}
