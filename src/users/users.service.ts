import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dtos/UpdateUser.dto';

@Injectable()
export class UsersService {
    //inject prisma service
    constructor(private prisma: PrismaService) {}

    createUser(data: Prisma.UserCreateInput) {
       return this.prisma.user.create({data})
    }

    getUsers() {
        return this.prisma.user.findMany()
    }

    async getUserById(id: number) {
        const user = await this.prisma.user.findUnique({where: {id}});
        if(!user) throw new HttpException("User not found", 404);
        console.log(user);
        return user;
    }

    async updateUser(id: number, data: UpdateUserDto ) {
        const user = await this.prisma.user.findUnique({where: {id}});
        if(!user) throw new NotFoundException(`User with id: ${id} not found`);

        //since username is unique, we need to see if the same username is provided again
        if(data.username) {
            const findUser = await this.prisma.user.findUnique({where: {username: data.username as string}});
            if(findUser) throw new HttpException(`username: ${data.username} already exists`, 409);
        }
        return this.prisma.user.update({
            where: { id },
            data,
        })
    }

    async deleteUser(id: number) {
         await this.getUserById(id);
         await this.prisma.user.delete({where: {id}});
         return await this.prisma.user.findMany();
         
    }
}
