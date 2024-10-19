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
  const items_type_Input = await prisma.items_type.createMany({
    data: [
      {
        name: 'Komputer Asus ROG',
        description: 'deskripsi',
        quantity: 100,
        roomId: 1,
        supplierId: 1,
        inputBy: 2,
        status: 'BARANG_MASUK',
        availability: true,
        type: 'INVENTORY',
      },
      {
        name: 'Monitor Asus ROG',
        description: 'deskripsi',
        quantity: 100,
        roomId: 1,
        supplierId: 1,
        inputBy: 2,
        status: 'BARANG_MASUK',
        availability: true,
        type: 'INVENTORY',
      },
    ],
  });

  // const itemsInput = await prisma.items.create({
  //   data: {
  //     roomId: 1,
  //     condition: 'baik',
  //     spec: '',
  //     image: 'tes',
  //   },
  // });

  return { room, supplier, user, userPetugas, items_type_Input };
};

console.log(main());
