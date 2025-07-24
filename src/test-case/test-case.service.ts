import { Injectable } from '@nestjs/common';
import { CreateTestCaseDto } from './dto/create-test-case.dto';
import { UpdateTestCaseDto } from './dto/update-test-case.dto';
import {PrismaService} from "../prisma/prisma.service";

@Injectable()
export class TestCaseService {

  constructor(private prisma: PrismaService) {}

  async create(createDto: CreateTestCaseDto & { creatorId: number }) {
    const { creatorId, suiteId, ...rest } = createDto;

    return this.prisma.testCase.create({
      data: {
        ...rest,
        description: rest.description ?? '',
        creator: {
          connect: { id: creatorId },
        },
        suite: {
          connect: { id: suiteId },
        },
      },
      include: {
        creator: true,
        suite: true,
      },
    });
  }

  findAll() {
    return this.prisma.testCase.findMany();
  }

  findOne(id: number) {
    return this.prisma.testCase.findUnique({
      where: {id},
    });
  }

  async update(id: number, updateDto: UpdateTestCaseDto & { updatedById: number }) {
    return this.prisma.testCase.update({
      where: { id },
      data: {
        ...updateDto,
        updatedById: updateDto.updatedById,
      },
    });
  }

  remove(id: number) {
    return this.prisma.testCase.delete({
      where: {id},
    })
  }

  async findByUserId(userId: number) {
    return this.prisma.testCase.findMany({
      where: {
        creatorId: userId,
      },
      include: {
        suite: true,
      },
    });
  }

  async findBySuiteId(suiteId: number) {
    return this.prisma.testCase.findMany({
      where: {
        suiteId: suiteId,
      },
      include: {
        creator: true,
      },
    });
  }

  async findByCreator(userId: number) {
    return this.prisma.testCase.findMany({
      where: {
        creatorId: userId,
      },
      include: {
        suite: true,
      },
    });
  }
}
