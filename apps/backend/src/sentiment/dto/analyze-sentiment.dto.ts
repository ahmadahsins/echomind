import { IsString, IsNotEmpty, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AnalyzeSentimentDto {
  @ApiProperty({
    description: 'Teks yang akan dianalisis sentimennya',
    example: 'Hari ini kuliah sangat menyenangkan karena dosennya asik!',
    maxLength: 1000,
  })
  @IsString()
  @IsNotEmpty({ message: 'Teks tidak boleh kosong' })
  @MaxLength(1000, { message: 'Teks maksimal 1000 karakter' })
  text: string;
}
