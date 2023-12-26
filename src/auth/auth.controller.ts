import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';


@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }
    @UseGuards(LocalAuthGuard)//metodo validate de localstrategy
    @Post('/login')
    login(@Request() req) {
        // console.log(req.user);

        return this.authService.login(req.user)
    }
}
