/* eslint-disable prettier/prettier */
import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Post('register')
    async register(@Body() data:any){
        return this.authService.register(data)
    }
    async login(){}
}
