import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { Prisma } from '@prisma/client';
import { CreateUserDto } from './dtos/CreateUser.dto';
import { UpdateUserDto } from './dtos/UpdateUser.dto';

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
   async getUserById(@Param('id') id: number) {
        return await this.usersService.getUserById(id);
        
    }

    @Patch(':id/update-user')
   // @UsePipes(ValidationPipe, ParseIntPipe)
    async updateUser(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) updatedUser: UpdateUserDto) {
        return await this.usersService.updateUser(id, updatedUser);
    }

    @Delete(':id') //DELETE /users/:id
    deleteUser(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.deleteUser(id);
    }
} 
