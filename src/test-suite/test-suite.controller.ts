import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Patch,
    Delete,
    ParseIntPipe,
    UseGuards, Req,
} from '@nestjs/common';
import { TestSuiteService } from './test-suite.service';
import { CreateTestSuiteDto } from './dto/create-test-suite.dto';
import { UpdateTestSuiteDto } from './dto/update-test-suite.dto';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import {CurrentUser} from "../common/decorators/current-user.decorator";
import {ApiBearerAuth} from "@nestjs/swagger";

@Controller('test-suites')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard) // protège toutes les routes avec JWT
export class TestSuiteController {
    constructor(private readonly testSuiteService: TestSuiteService) {}

    @Post()
    async create(@CurrentUser() user,@Body() dto: CreateTestSuiteDto, @Req() req: any) {
        return this.testSuiteService.create({
            ...dto,
            createdById: user.userId,
        });
    }

    @Get('my-suites')
    async findMySuites(@CurrentUser() user: { userId: number }) {
        return this.testSuiteService.findByCreator(user.userId);
    }

    @Get()
    findAll() {
        return this.testSuiteService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.testSuiteService.findOne(id);
    }



    @Patch(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdateTestSuiteDto,
        @CurrentUser() user: { userId: number; email: string }
    ) {
        return this.testSuiteService.update(id, { ...dto, updatedById: user.userId });
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.testSuiteService.remove(id);
    }
}
