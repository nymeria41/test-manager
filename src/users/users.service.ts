import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    async createUser(email: string, password: string, name: string) {
        const hashed = await bcrypt.hash(password, 10);
        return this.prisma.user.create({
            data: {
                email,
                password: hashed,
                name,

            },
        });
    }

    async findByEmail(email: string) {
        if (!email) {
            throw new Error('Email must be provided');
        }
        return this.prisma.user.findUnique({
            where: { email },
        });
    }

    async getUsers() {
        return this.prisma.user.findMany();
    }

    async remove(id: number) {
        return this.prisma.user.delete({where :  {id},});
    }
}
