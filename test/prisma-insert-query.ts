import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
const prisma = new PrismaClient();

const main = async () => {
  const password = 'coba';
  const hashPassword = await bcrypt(password, 10);
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
      username: 'coba',
      password: hashPassword,
      role: 0,
    },
  });
  return { room, supplier, user };
};

main();
