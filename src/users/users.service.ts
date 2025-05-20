import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
    //inject prisma service
    constructor(private prisma: PrismaService) {}

    createUser(data: Prisma.UserCreateInput) {
        this.prisma.user.create({data})
    }

    getUsers() {}

    getUserById() {}
}
