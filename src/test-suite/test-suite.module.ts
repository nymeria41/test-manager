import { Module } from '@nestjs/common';
import { TestSuiteService } from './test-suite.service';
import { TestSuiteController } from './test-suite.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
    imports: [PrismaModule],
    controllers: [TestSuiteController],
    providers: [TestSuiteService],
})
export class TestSuiteModule {}