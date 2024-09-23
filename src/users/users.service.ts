import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { SupplierDTO } from './dto/supplier';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async findAll() {}
  async findOne() {}
  async createUser() {}
  async updateUser() {}
  async deleteUser() {}

  async findAllSupplier() {
    return this.prismaService.supplier.findMany();
  }
  async findOneSupplier(id: number) {
    return this.prismaService.supplier.findUnique({
      where: {
        id: id,
      },
    });
  }
  async addSupplier(data: SupplierDTO) {
    return this.prismaService.supplier.create({
      data: {
        name: data.name,
        phone: data.phone,
      },
    });
  }
  async updateSupplier() {}
  async deleteSupplier(id: number) {
    return this.prismaService.supplier.findUnique({
      where: {
        id: id,
      },
    });
  }
}
