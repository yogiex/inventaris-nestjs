/* eslint-disable prettier/prettier */
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';

import { JwtService } from '@nestjs/jwt';
import { LoginDTO, RegisterDTO } from './dto/auth';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(data: LoginDTO) {
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
      username: user.username,
      role: user.role,
    };
  }
  async register(data: any) {
    const hashPassword = await bcrypt.hash(data.password, 10);
    data.password = hashPassword;
    const user = this.prisma.users.create({ data });
    const datas = {
      username: (await user).username,
      role: (await user).role,
      created_at: (await user).createdAt,
      update_at: (await user).update_at,
    };
    return {
      datas,
    };
  }

  async userFindOne(id: number) {
    return this.prisma.users.findUnique({
      where: {
        id: id,
      },
    });
  }
}
