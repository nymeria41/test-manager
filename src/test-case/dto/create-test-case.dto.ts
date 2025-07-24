import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsInt, IsArray } from 'class-validator';

export class CreateTestCaseDto {
    @ApiProperty({ description: 'Nom du cas de test' })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiPropertyOptional({ description: 'Description du cas de test' })
    @IsString()
    @IsOptional()
    description?: string;

    @ApiProperty({ description: "Nom de l'application concernée" })
    @IsString()
    @IsNotEmpty()
    application: string;

    @ApiProperty({ description: 'Temps estimé en minutes' })
    @IsInt()
    estimatedTime: number;

    @ApiPropertyOptional({ description: 'URLs des images associées', type: [String] })
    @IsArray()
    @IsOptional()
    imageUrls?: string[];

    @ApiProperty({ description: 'ID de la suite de test associée' })
    @IsInt()
    suiteId: number;
}
