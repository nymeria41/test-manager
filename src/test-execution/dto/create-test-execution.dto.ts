import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsInt, IsArray } from 'class-validator';

export class CreateTestExecutionDto {
    @ApiProperty({ description: 'Statut de l\'exécution' })
    @IsString()
    status: string;

    @ApiProperty({ description: 'Environnement d\'exécution' })
    @IsString()
    environment: string;

    @ApiPropertyOptional({ description: 'Commentaire' })
    @IsOptional()
    @IsString()
    comment?: string;

    @ApiPropertyOptional({ description: 'URLs des images associées', type: [String] })
    @IsArray()
    @IsOptional()
    imageUrls?: string[];

    @ApiProperty({ description: 'Durée en secondes' })
    @IsInt()
    duration: number;

    @ApiProperty({ description: 'ID du cas de test associé' })
    @IsInt()
    testCaseId: number;
}
