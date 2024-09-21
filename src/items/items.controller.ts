/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItem } from './dto/items';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('items')
@Controller('items')
export class ItemsController {
    constructor(
        private itemService: ItemsService
    ){}

    @Get(':id')
    async findOne(){
        
    }

    @Get('/')
    async findAll(){
        return this.itemService.findAll()
    }

    @Post()
    async create(@Body() data: CreateItem){
        return this.itemService.create(data)
    }

    @Patch(':id')
    async update(){
        return this.itemService.update()
    }

    @Delete(':id')
    async delete(){
        return this.itemService.delete()
    }

}
