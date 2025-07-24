import {Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query} from '@nestjs/common';
import { TestExecutionService } from './test-execution.service';
import { CreateTestExecutionDto } from './dto/create-test-execution.dto';
import { UpdateTestExecutionDto } from './dto/update-test-execution.dto';
import {CurrentUser} from "../common/decorators/current-user.decorator";
import {ApiBearerAuth, ApiQuery} from "@nestjs/swagger";
import {JwtAuthGuard} from "../auth/jwt/jwt-auth.guard";

@Controller('test-execution')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard) // protège toutes les routes avec JWT
export class TestExecutionController {
  constructor(private readonly testExecutionService: TestExecutionService) {}

  @Post()
  create(@CurrentUser() user, @Body() dto: CreateTestExecutionDto) {
    return this.testExecutionService.create(dto, user.userId);
  }

  @Get()
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  async findAll(
      @Query('page') page = '1',
      @Query('limit') limit = '10',
  ) {
    return this.testExecutionService.findAll(Number(page), Number(limit));
  }
  @Get('by-user')
  findByUser(@CurrentUser() user) {
    return this.testExecutionService.findByUser(user.userId);
  }

  @Get('by-test-case/:id')
  findByTestCase(@Param('id') id: string) {
    return this.testExecutionService.findByTestCase(+id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.testExecutionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @CurrentUser() user, @Body() dto: UpdateTestExecutionDto) {
    return this.testExecutionService.update(+id, dto, user.userId);
  }



  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.testExecutionService.remove(+id);
  }
}
