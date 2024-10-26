import { PrismaClient, ItemAvailability, MovementStatus, MovementType } from '@prisma/client';
import * as bcrypt from 'bcrypt';
const prisma = new PrismaClient();

const main = async () => {
  try {
    // Clear existing data
    await prisma.movement_log.deleteMany();
    await prisma.items.deleteMany();
    await prisma.items_type.deleteMany();
    await prisma.room.deleteMany();
    await prisma.supplier.deleteMany();
    await prisma.users.deleteMany();

    // Create Users
    const hashPassword = await bcrypt.hash('admin', 10);
    const hashPasswordPetugas = await bcrypt.hash('petugas', 10);

    const users = await prisma.users.createMany({
      data: [
        {
          username: 'admin',
          password: hashPassword,
          role: 0, // Super Admin
        },
        {
          username: 'petugas',
          password: hashPasswordPetugas,
          role: 1, // Petugas
        },
        {
          username: 'petugas2',
          password: hashPasswordPetugas,
          role: 1, // Petugas
        }
      ],
    });

    // Create Rooms
    const rooms = await prisma.room.createMany({
      data: [
        {
          name: 'Gudang Utama',
          building: 'TULT',
          number: '0650',
          address: 'Jl.Telekomunikasi no 1',
        },
        {
          name: 'Lab Komputer',
          building: 'TULT',
          number: '0651',
          address: 'Jl.Telekomunikasi no 1',
        },
        {
          name: 'Ruang Server',
          building: 'TULT',
          number: '0652',
          address: 'Jl.Telekomunikasi no 1',
        },
        {
          name: 'Lab Database', 
          building: 'TULT',
          number: '0653',
          address: 'Jl.Telekomunikasi no 1',
        },
        {
          name: 'Lab Networking',
          building: 'TULT', 
          number: '0654',
          address: 'Jl.Telekomunikasi no 1',
        }
      ],
    });

    // Create Suppliers
    const suppliers = await prisma.supplier.createMany({
      data: [
        {
          name: 'PT Komputer Sejahtera',
          phone: '08123456789',
        },
        {
          name: 'CV Elektronik Maju',
          phone: '08234567890',
        },
        {
          name: 'PT Network Solution',
          phone: '08345678901'
        },
        {
          name: 'CV Server Indonesia',
          phone: '08456789012'
        }
      ],
    });

    // Create Item Types
    const itemTypes = await prisma.items_type.createMany({
      data: [
        {
          name: 'Komputer Asus ROG',
          description: 'Komputer Gaming High-End',
          quantity: 5,
          supplierId: 1,
          inputBy: 2,
          type: 'INVENTORY',
        },
        {
          name: 'Monitor Asus ROG',
          description: 'Monitor Gaming 144Hz',
          quantity: 5,
          supplierId: 1,
          inputBy: 2,
          type: 'INVENTORY',
        },
        {
          name: 'Keyboard Mechanical',
          description: 'Keyboard Gaming RGB',
          quantity: 5,
          supplierId: 2,
          inputBy: 2,
          type: 'INVENTORY',
        },
        {
          name: 'Server Dell PowerEdge',
          description: 'Server Rack Mount',
          quantity: 3,
          supplierId: 4,
          inputBy: 2,
          type: 'INVENTORY',
        },
        {
          name: 'UPS APC',
          description: 'Uninterruptible Power Supply',
          quantity: 5,
          supplierId: 3,
          inputBy: 2,
          type: 'INVENTORY',
        }
      ],
    });

    // Create Items
    const items = await prisma.items.createMany({
      data: [
        {
          typeId: 1,
          roomId: 1,
          condition: 'Baik',
          spec: 'RTX 3080, 32GB RAM, Ryzen 9',
          image: 'komputer-1.jpg',
          availability: 'TERSEDIA',
        },
        {
          typeId: 1,
          roomId: 1,
          condition: 'Baik',
          spec: 'RTX 3080, 32GB RAM, Ryzen 9',
          image: 'komputer-2.jpg',
          availability: 'TERSEDIA',
        },
        {
          typeId: 1,
          roomId: 2,
          condition: 'Baik',
          spec: 'RTX 3080, 32GB RAM, Ryzen 9',
          image: 'komputer-3.jpg', 
          availability: 'TERSEDIA',
        },
        {
          typeId: 2,
          roomId: 1,
          condition: 'Baik',
          spec: '27 inch, 144Hz, 1ms Response Time',
          image: 'monitor-1.jpg',
          availability: 'TERSEDIA',
        },
        {
          typeId: 2,
          roomId: 2,
          condition: 'Baik',
          spec: '27 inch, 144Hz, 1ms Response Time',
          image: 'monitor-2.jpg',
          availability: 'TERSEDIA',
        },
        {
          typeId: 3,
          roomId: 2,
          condition: 'Baik',
          spec: 'Cherry MX Blue Switches, RGB Backlight',
          image: 'keyboard-1.jpg',
          availability: 'TERSEDIA',
        },
        {
          typeId: 4,
          roomId: 3,
          condition: 'Baik',
          spec: 'Intel Xeon, 64GB RAM, 4TB Storage',
          image: 'server-1.jpg',
          availability: 'TERSEDIA',
        },
        {
          typeId: 5,
          roomId: 3,
          condition: 'Baik',
          spec: '3000VA, Pure Sine Wave',
          image: 'ups-1.jpg',
          availability: 'TERSEDIA',
        }
      ],
    });

    // Create Movement Logs
    const movementLogs = await prisma.movement_log.createMany({
      data: [
        {
          MovementTitle: 'Penerimaan Awal Komputer',
          movementType: 'BARANG_MASUK',
          itemTypeName: 'Komputer Asus ROG',
          quantity: 5,
          toRoom: 'Gudang Utama',
          requesterName: 'petugas',
          status: 'SELESAI',
          itemAvailability: 'TERSEDIA',
          description: 'Penerimaan awal batch komputer gaming',
        },
        {
          MovementTitle: 'Penerimaan Awal Monitor',
          movementType: 'BARANG_MASUK',
          itemTypeName: 'Monitor Asus ROG',
          quantity: 5,
          toRoom: 'Gudang Utama',
          requesterName: 'petugas',
          status: 'SELESAI',
          itemAvailability: 'TERSEDIA',
          description: 'Penerimaan awal batch monitor gaming',
        },
        {
          MovementTitle: 'Pemindahan Komputer ke Lab',
          movementType: 'PERPINDAHAN',
          itemTypeName: 'Komputer Asus ROG',
          quantity: 1,
          fromRoom: 'Gudang Utama',
          toRoom: 'Lab Komputer',
          requesterName: 'petugas',
          status: 'SELESAI',
          itemAvailability: 'TERSEDIA',
          description: 'Pemindahan komputer untuk kebutuhan lab',
        },
        {
          MovementTitle: 'Penerimaan Server',
          movementType: 'BARANG_MASUK',
          itemTypeName: 'Server Dell PowerEdge',
          quantity: 3,
          toRoom: 'Ruang Server',
          requesterName: 'petugas',
          status: 'SELESAI',
          itemAvailability: 'TERSEDIA',
          description: 'Penerimaan server baru',
        },
        {
          MovementTitle: 'Maintenance Komputer',
          movementType: 'MAINTENANCE',
          itemTypeName: 'Komputer Asus ROG',
          quantity: 1,
          fromRoom: 'Lab Komputer',
          requesterName: 'petugas',
          status: 'SELESAI',
          itemAvailability: 'TERSEDIA',
          description: 'Maintenance rutin komputer',
        }
      ],
    });

    console.log({
      users,
      rooms,
      suppliers,
      itemTypes,
      items,
      movementLogs,
    });

    return 'Seeding completed successfully';
  } catch (error) {
    console.error('Error during seeding:', error);
    throw error;
  }
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });