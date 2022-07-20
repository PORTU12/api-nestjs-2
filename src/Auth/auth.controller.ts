import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { LoginCredentialsDto } from 'src/dto/LoginCredentialsDto';
import { UserSubscribeDto } from 'src/dto/UserSubscribe.dto';
import { AuthService } from './auth.service';

@ApiTags('Authentification')
@Controller('user')
export class  AuthController{
    constructor(private authservice:  AuthService) { }

    @Post('register')
    @ApiCreatedResponse({ description: 'User Register' })
    register(
        @Body() userData: UserSubscribeDto
    ) {
        return this.authservice.subscribe(userData)
    }
    @Post('login')
    @ApiCreatedResponse({ description: 'User Login' })
    Userlogin(
        @Body() userData: LoginCredentialsDto
    ) {
        return this.authservice.Login(userData)
    }
    @Get()
    findAllUsersLogin(){
        return this.authservice.findAll()
    }

    @Get(':id')
    @UseGuards(AuthGuard('jwt'))
    findbyUserlogin(@Param('id')id: number){
        return this.authservice.findOneUserlogin(id)
    }
}