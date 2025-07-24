import {Controller, Get, UseGuards, Req, Delete, Param, ParseIntPipe, Patch, Body} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import {UsersService} from "./users.service";
import { Roles } from '../auth/role/roles.decorator';
import { RolesGuard } from '../auth/role/roles.guard';
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {Role} from "../auth/role/roles.enum";
import {UpdateRoleDto} from "./dto/update-role.dto";

@ApiTags('users')
@ApiBearerAuth()
@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get('')
    @Roles(Role.ADMIN)
    async getUsers(@Req() req) {
        return this.usersService.getUsers();
    }

    @Patch(':id/role')
    @Roles(Role.ADMIN)
    async   updateRole(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateRoleDto: UpdateRoleDto,
    ) {
        return this.usersService.updateUserRole(id, updateRoleDto.role);
    }

    @Delete('/:id')
    @Roles(Role.ADMIN)
    async remove(@Param('id',ParseIntPipe) id: number) {
        return this.usersService.remove(id);
    }
}
