import {Controller, Get, UseGuards, Req, Delete, Param, ParseIntPipe} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import {UsersService} from "./users.service";

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get('')
    async getUsers(@Req() req) {
        return this.usersService.getUsers();
    }

    @Delete('/:id')
    async remove(@Param('id',ParseIntPipe) id: number) {
        return this.usersService.remove(id);
    }
}
