import { IsString, IsOptional, IsInt, IsArray } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateTestCaseDto {
    @ApiPropertyOptional({ description: 'Nom du cas de test' })
    @IsOptional()
    @IsString()
    name?: string;

    @ApiPropertyOptional({ description: 'Description du cas de test' })
    @IsOptional()
    @IsString()
    description?: string;

    @ApiPropertyOptional({ description: "Nom de l'application concernée" })
    @IsOptional()
    @IsString()
    application?: string;

    @ApiPropertyOptional({ description: 'Temps estimé en minutes' })
    @IsOptional()
    @IsInt()
    estimatedTime?: number;

    @ApiPropertyOptional({ description: 'URLs des images associées', type: [String] })
    @IsOptional()
    @IsArray()
    imageUrls?: string[];

    @ApiPropertyOptional({ description: 'ID de la suite de test associée' })
    @IsOptional()
    @IsInt()
    suiteId?: number;
}
