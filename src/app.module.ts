import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import {TestSuiteModule} from "./test-suite/test-suite.module";
import { TestCaseModule } from './test-case/test-case.module';
import { TestExecutionModule } from './test-execution/test-execution.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }),PrismaModule, UsersModule, AuthModule, TestSuiteModule, TestCaseModule, TestExecutionModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
