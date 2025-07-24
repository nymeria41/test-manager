// src/users/dto/create-user.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
    @ApiProperty({ description: 'Adresse email de l\'utilisateur' })
    @IsEmail()
    email: string;

    @ApiProperty({ description: 'Mot de passe (min. 6 caractères)' })
    @IsNotEmpty()
    @MinLength(6)
    password: string;

    @ApiProperty({ description: 'Nom de l\'utilisateur' })
    @IsNotEmpty()
    name: string;
}
