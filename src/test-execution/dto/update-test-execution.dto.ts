import { PartialType } from '@nestjs/mapped-types';
import { CreateTestExecutionDto } from './create-test-execution.dto';

export class UpdateTestExecutionDto extends PartialType(CreateTestExecutionDto) {}
