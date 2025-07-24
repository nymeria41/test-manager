import { Test, TestingModule } from '@nestjs/testing';
import { TestSuiteService } from './test-suite.service';
import { PrismaService } from '../prisma/prisma.service';

const mockTestSuites = [
    { id: 1, name: 'Suite 1', createdById: 1 },
    { id: 2, name: 'Suite 2', createdById: 2 },
];

describe('TestSuiteService', () => {
    let service: TestSuiteService;
    let prisma: PrismaService;

    const prismaMock = {
        testSuite: {
            create: jest.fn(),
            findMany: jest.fn(),
            findUnique: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
        },
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                TestSuiteService,
                { provide: PrismaService, useValue: prismaMock },
            ],
        }).compile();

        service = module.get<TestSuiteService>(TestSuiteService);
        prisma = module.get<PrismaService>(PrismaService);

        // Reset mocks before each test
        jest.clearAllMocks();
    });

    describe('create', () => {
        it('should create a new test suite', async () => {
            const dto = { title: 'New Suite', createdById: 1 };
            prismaMock.testSuite.create.mockResolvedValue({ id: 1, ...dto });

            const result = await service.create(dto);

            expect(prismaMock.testSuite.create).toHaveBeenCalledWith({ data: dto });
            expect(result).toEqual({ id: 1, ...dto });
        });
    });

    describe('findAll', () => {
        it('should return all test suites', async () => {
            prismaMock.testSuite.findMany.mockResolvedValue(mockTestSuites);

            const result = await service.findAll();

            expect(prismaMock.testSuite.findMany).toHaveBeenCalled();
            expect(result).toEqual(mockTestSuites);
        });
    });

    describe('findOne', () => {
        it('should return one test suite by id', async () => {
            const id = 1;
            prismaMock.testSuite.findUnique.mockResolvedValue(mockTestSuites[0]);

            const result = await service.findOne(id);

            expect(prismaMock.testSuite.findUnique).toHaveBeenCalledWith({ where: { id } });
            expect(result).toEqual(mockTestSuites[0]);
        });
    });

    describe('update', () => {
        it('should update a test suite', async () => {
            const id = 1;
            const dto = {
                name: 'Updated Suite Name',
                updatedById: 1,
            };
            prismaMock.testSuite.update.mockResolvedValue({ id, ...dto, createdById: 1 });

            const result = await service.update(id, dto);

            expect(prismaMock.testSuite.update).toHaveBeenCalledWith({ where: { id }, data: dto });
            expect(result).toEqual({ id, ...dto, createdById: 1 });
        });
    });

    describe('remove', () => {
        it('should delete a test suite', async () => {
            const id = 1;
            prismaMock.testSuite.delete.mockResolvedValue({ id, name: 'Suite 1', createdById: 1 });

            const result = await service.remove(id);

            expect(prismaMock.testSuite.delete).toHaveBeenCalledWith({ where: { id } });
            expect(result).toEqual({ id, name: 'Suite 1', createdById: 1 });
        });
    });
});
