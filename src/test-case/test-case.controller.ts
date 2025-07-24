import {Controller, Post, Body, Patch, Param, UseGuards, Get, Delete, Query} from '@nestjs/common';
import { TestCaseService } from './test-case.service';
import { CreateTestCaseDto } from './dto/create-test-case.dto';
import { UpdateTestCaseDto } from './dto/update-test-case.dto';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import {CurrentUser} from "../common/decorators/current-user.decorator";
import {ApiBearerAuth, ApiQuery} from "@nestjs/swagger";

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('test-case')
export class TestCaseController {
  constructor(private readonly testCaseService: TestCaseService) {}

  @Post()
  async create(@CurrentUser() user, @Body() createTestCaseDto: CreateTestCaseDto) {
    return this.testCaseService.create({
      ...createTestCaseDto,
      creatorId: user.userId, // on injecte le userId ici
    });
  }

  @Get()
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  findAll(  @Query('page') page = '1',
            @Query('limit') limit = '10',) {
    return this.testCaseService.findAll(Number(page), Number(limit));
  }

  @Get('by-user/:userId')
  findByUser(@Param('userId') userId: string) {
    return this.testCaseService.findByUserId(+userId);
  }


  @Get('my-cases')
  async findMyCases(@CurrentUser() user: { userId: number }) {
    return this.testCaseService.findByCreator(user.userId);
  }

  @Get('by-suite/:suiteId')
  findBySuite(@Param('suiteId') suiteId: string) {
    return this.testCaseService.findBySuiteId(+suiteId);
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.testCaseService.findOne(+id);
  }





  @Patch(':id')
  async update(@Param('id') id: string, @CurrentUser() user, @Body() updateTestCaseDto: UpdateTestCaseDto) {
    return this.testCaseService.update(+id, {
      ...updateTestCaseDto,
      updatedById: user.userId, // idem ici
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.testCaseService.remove(+id);
  }
}
