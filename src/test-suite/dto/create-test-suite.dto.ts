import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {IsString, IsNotEmpty, IsOptional} from 'class-validator';

export class CreateTestSuiteDto {
    @ApiProperty({ description: 'Titre de la suite de test' })
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiPropertyOptional({ description: 'Description de la suite de test' })
    @IsString()
    @IsOptional()
    description?: string;
}
