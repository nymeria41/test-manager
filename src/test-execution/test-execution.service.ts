import { Injectable } from '@nestjs/common';
import { CreateTestExecutionDto } from './dto/create-test-execution.dto';
import { UpdateTestExecutionDto } from './dto/update-test-execution.dto';
import {PrismaService} from "../prisma/prisma.service";

@Injectable()
export class TestExecutionService {
  constructor(private prisma: PrismaService) {}

  create(createTestExecutionDto: CreateTestExecutionDto, userId: number) {
    const { testCaseId, ...rest } = createTestExecutionDto;
    return this.prisma.testExecution.create({
      data: {
        ...rest,
        testCase: { connect: { id: testCaseId } },  // Connect via relation
        owner: { connect: { id: userId } },
      },
      include: {
        owner: true,
        testCase: true,
      },
    });
  }

  async findAll(page = 1, limit = 10) {
    const skip = (page - 1) * limit;

    const [data, total] = await this.prisma.$transaction([
      this.prisma.testExecution.findMany({
        skip,
        take: limit,
      }),
      this.prisma.testExecution.count(),
    ]);

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  findOne(id: number) {
    return this.prisma.testExecution.findUnique({ where: { id } });
  }

  async update(id: number, dto: UpdateTestExecutionDto, userId: number) {
    const { testCaseId, ...rest } = dto;
    return this.prisma.testExecution.update({
      where: { id },
      data: {
        ...rest,
        ...(testCaseId ? { testCase: { connect: { id: testCaseId } } } : {}),
        updatedBy: { connect: { id: userId } },
      },
      include: {
        updatedBy: true,
      },
    });
  }

  async findByUser(userId: number) {
    return this.prisma.testExecution.findMany({
      where: { ownerId: userId },
      include: { testCase: true },
    });
  }

  async findByTestCase(testCaseId: number) {
    return this.prisma.testExecution.findMany({
      where: { testCaseId },
      include: { owner: true },
    });
  }

  remove(id: number) {
    return this.prisma.testExecution.delete({where: { id }});
  }
}
