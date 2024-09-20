/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client'
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService){}

    async login(data:any){
        const dataUsername = data.username
        const user = await this.prisma.users.findUnique({where: dataUsername})
        if(!user) throw NotFoundException 
        const validPassword = await bcrypt.compare(data.password, ) 
    }
    async register(data:any){
        const hashPassword = await bcrypt.hash(data.password,10)
        data.password = hashPassword
        return this.prisma.users.create({data})
    }
}
