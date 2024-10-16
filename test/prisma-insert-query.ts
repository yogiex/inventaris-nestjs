import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
const prisma = new PrismaClient();

const main = async () => {
  const password = 'admin';
  const passwordPetugas = 'petugas';
  const hashPassword = await bcrypt.hash(password, 10);
  const hashPasswordPetugas = await bcrypt.hash(passwordPetugas, 10);
  const room = await prisma.room.create({
    data: {
      name: 'gudang',
      building: 'TULT',
      number: '0650',
      address: 'Jl.Telekomunikasi no 1',
    },
  });
  const supplier = await prisma.supplier.create({
    data: {
      phone: '1122233',
      name: 'yogi',
    },
  });
  const user = await prisma.users.create({
    data: {
      username: 'admin',
      password: hashPassword,
      role: 0,
    },
  });
  const userPetugas = await prisma.users.create({
    data: {
      username: 'petugas',
      password: hashPasswordPetugas,
      role: 1,
    },
  });
  return { room, supplier, user, userPetugas };
};

console.log(main());
