// src/test-suite/test-suite.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTestSuiteDto } from './dto/create-test-suite.dto';
import { UpdateTestSuiteDto } from './dto/update-test-suite.dto';

@Injectable()
export class TestSuiteService {
    constructor(private prisma: PrismaService) {}

    async create(createTestSuiteDto: CreateTestSuiteDto & { createdById: number }) {
        return this.prisma.testSuite.create({
            data: {
                title: createTestSuiteDto.title,
                description: createTestSuiteDto.description,
                createdBy: {
                    connect: { id: createTestSuiteDto.createdById }
                }
            },
            include: {
                createdBy: true,
            }
        });
    }

    async findAll(page = 1, limit = 10) {
        const skip = (page - 1) * limit;

        const [data, total] = await this.prisma.$transaction([
            this.prisma.testSuite.findMany({
                skip,
                take: limit,
            }),
            this.prisma.testSuite.count(),
        ]);

        return {
            data,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };
    }

    async findOne(id: number) {
        return this.prisma.testSuite.findUnique({
            where: { id },
        });
    }

    async update(id: number, updateTestSuiteDto: UpdateTestSuiteDto & { updatedById: number }) {
        return this.prisma.testSuite.update({
            where: { id },
            data: {
                title: updateTestSuiteDto.title,
                description: updateTestSuiteDto.description,
                updatedBy: {
                    connect: { id: updateTestSuiteDto.updatedById }
                }
            },
            include: {
                updatedBy: true,
            }
        });
    }

    async remove(id: number) {
        return this.prisma.testSuite.delete({
            where: { id },
        });
    }

    async findByCreator(userId: number) {
        return this.prisma.testSuite.findMany({
            where: {
                createdById: userId,
            },
            include: {
                createdBy: true,
                testCases: true,
            },
        });
    }
}
