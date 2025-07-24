import {Controller, Post, Body} from '@nestjs/common';
import { AuthService } from './auth.service';
import {CreateUserDto} from "../users/dto/create-user.dto";
import {LoginDto} from "./dto/login.dto";
import {ApiBody, ApiOperation} from "@nestjs/swagger";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('register')
    async register(@Body() createUserDto: CreateUserDto) {
        return this.authService.register(createUserDto);
    }

    @Post('login')
    @ApiOperation({ summary: 'User login' })
    @ApiBody({ type: LoginDto })
    login(@Body() loginDto: LoginDto ) {
        return this.authService.login(loginDto);
    }


}
