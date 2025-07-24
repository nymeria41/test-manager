import { Module } from '@nestjs/common';
import { TestExecutionService } from './test-execution.service';
import { TestExecutionController } from './test-execution.controller';

@Module({
  controllers: [TestExecutionController],
  providers: [TestExecutionService],
})
export class TestExecutionModule {}
