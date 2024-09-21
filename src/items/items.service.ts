/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ItemIdDTO } from './dto/items';
@Injectable()
export class ItemsService {
    constructor(
        private prismaService: PrismaService
    ){}

    async findOne(data: ItemIdDTO){
        return this.prismaService.items.findUnique({
            where: {
                id: data.id
            }
        })
    }

    async findAll(){
        return this.prismaService.items.findMany()
    }
    async create(data:any){
        return this.prismaService.items.create({data})
    }
    async update(){}
    async delete(){}
}
