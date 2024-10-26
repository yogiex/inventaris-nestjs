import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateSupplierDTO, UpdateSupplierDTO } from './dto/supplier';

@Injectable()
export class SupplierService {
  constructor(private prismaService: PrismaService) {}

  async findAllSupplier() {
    return this.prismaService.supplier.findMany({
      include: {
        Items_type: true,
      },
    });
  }

  async findOneSupplier(id: number) {
    const supplier = await this.prismaService.supplier.findUnique({
      where: { id },
      include: {
        Items_type: true,
      },
    });

    if (!supplier) throw new NotFoundException('Supplier not found');
    return supplier;
  }

  async addSupplier(data: CreateSupplierDTO) {
    return this.prismaService.supplier.create({
      data,
      include: {
        Items_type: true,
      },
    });
  }

  async updateSupplier(id: number, data: UpdateSupplierDTO) {
    const supplier = await this.prismaService.supplier.update({
      where: { id },
      data,
      include: {
        Items_type: true,
      },
    });

    if (!supplier) throw new NotFoundException('Supplier not found');
    return supplier;
  }

  async deleteSupplier(id: number) {
    // Check if supplier has any items
    const supplier = await this.prismaService.supplier.findUnique({
      where: { id },
      include: {
        Items_type: true,
      },
    });

    if (!supplier) throw new NotFoundException('Supplier not found');

    if (supplier.Items_type.length > 0) {
      throw new Error('Cannot delete supplier with existing items');
    }

    return this.prismaService.supplier.delete({
      where: { id },
    });
  }

  // supplier.service.ts
  async getSupplierInventory(id: number) {
    const supplier = await this.prismaService.supplier.findUnique({
      where: { id },
      include: {
        Items_type: {
          select: {
            id: true,
            name: true,
            description: true,
            type: true,
            created_at: true,
            // Tidak include quantity karena itu adalah stok di inventaris kita, 
            // bukan stok supplier
          }
        }
      },
    });

    if (!supplier) throw new NotFoundException('Supplier not found');

    return {
      supplier: {
        id: supplier.id,
        name: supplier.name,
        phone: supplier.phone,
      },
      suppliedItems: supplier.Items_type  // Hanya menampilkan tipe item yang pernah/sedang disupply
    };
  }
}