import { Injectable, NotFoundException } from '@nestjs/common';
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

    getUserById(id: number) {
        return this.prisma.user.findUnique({where: {id}})
    }

    updateUser(id: number, data: UpdateUserDto ) {
        const user = this.prisma.user.findUnique({where: {id}});
        if(!user) throw new NotFoundException(`User with id: ${id} not found`);
        return this.prisma.user.update({
            where: { id },
            data,
        })
    }
}
