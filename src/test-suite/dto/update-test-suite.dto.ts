import { ApiPropertyOptional } from '@nestjs/swagger';
import {IsOptional, IsString} from 'class-validator';

export class UpdateTestSuiteDto {
    @ApiPropertyOptional({ description: 'Titre de la suite de test' })
    @IsOptional()
    @IsString()
    title?: string;

    @ApiPropertyOptional({ description: 'Description de la suite de test' })
    @IsOptional()
    @IsString()
    description?: string;

}