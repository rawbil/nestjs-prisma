import { Body, Controller, Get, Param, ParseIntPipe, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { Prisma } from '@prisma/client';
import { CreateUserDto } from './dtos/CreateUser.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post('create-user') //users/create-user
    @UsePipes(ValidationPipe)
    createUser(@Body() createUserDto: CreateUserDto) {
        return this.usersService.createUser(createUserDto)
    }

    @Get() //GET /users
    getUsers() {
        return this.usersService.getUsers();
    }

    @Get(':id') //GET /users/:id
    @UsePipes(ParseIntPipe)
    getUserById(@Param('id') id: number) {
        return this.usersService.getUserById(id);
    }
}
