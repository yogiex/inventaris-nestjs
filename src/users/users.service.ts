import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async findAll() {}
  async findOne() {}
  async createUser() {}
  async updateUser() {}
  async deleteUser() {}
}
