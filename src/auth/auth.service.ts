/* eslint-disable prettier/prettier */
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';

import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(data: any) {
    const dataUsername = data.username;
    const user = await this.prisma.users.findUnique({
      where: {
        username: dataUsername,
      },
    });
    if (!user) throw NotFoundException;
    const validPassword = await bcrypt.compare(data.password, user.password);

    if (!validPassword) throw new UnauthorizedException('invalid password');

    return {
      accessToken: this.jwtService.sign({ userId: user.id }),
    };
  }
  async register(data: any) {
    const hashPassword = await bcrypt.hash(data.password, 10);
    data.password = hashPassword;
    return this.prisma.users.create({ data });
  }
}
