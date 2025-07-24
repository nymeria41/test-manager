import {ConflictException, Injectable, UnauthorizedException} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import {CreateUserDto} from "../users/dto/create-user.dto";
import {LoginDto} from "./dto/login.dto";

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private prisma: PrismaService
    ) {}

    async register(createUserDto: CreateUserDto) {
        const { email, password, name } = createUserDto;

        // Vérifier si l'utilisateur existe déjà
        const existingUser = await this.prisma.user.findUnique({
            where: { email },
        });
        if (existingUser) {
            throw new ConflictException('Email already in use');
        }

        // Hasher le mot de passe
        const hashedPassword = await bcrypt.hash(password, 10);

        // Créer l'utilisateur
        const user = await this.prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name,
            },
        });

        // Tu peux retourner l'utilisateur (sans le mdp), ou un message, ou autre
        return {
            id: user.id,
            email: user.email,
            name: user.name,
            createdAt: user.createdAt,
        };
    }

    async login(loginDto : LoginDto) {
        const user = await this.usersService.findByEmail(loginDto.email);
        if (!user) throw new UnauthorizedException('Email invalide');

        const match = await bcrypt.compare(loginDto.password, user.password);
        if (!match) throw new UnauthorizedException('Mot de passe incorrect');

        return this.generateToken(user.id, user.email);
    }

    private generateToken(id: number, email: string) {
        const payload = {
            sub: id,       // convention JWT (subject)
            email: email,
        };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
