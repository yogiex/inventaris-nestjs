import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateMovement, MovementIdDTO, UpdateMovement } from 'src/movement/dto/movement';
import { ItemAvailability, MovementStatus } from '@prisma/client';

@Injectable()
export class MovementService {
  constructor(private prismaService: PrismaService) {}

  async findOne(id: number, isPublic: boolean = false) {
    const movement = await this.prismaService.movement.findUnique({
      where: { id },
      include: {
        items: {
          include: {
            item: {
              include: {
                room: true,
                itemType: true
              }
            }
          }
        },
        fromRoom: true,
        toRoom: true,
        ...(isPublic ? {} : {
          approvedBy: true,
          assignedTo: true
        })
      }
    });

    if (!movement) throw new NotFoundException('Movement not found');
    return movement;
  }

  async findAll(isPublic: boolean = false) {
    return this.prismaService.movement.findMany({
      include: {
        items: {
          include: {
            item: {
              include: {
                room: true,
                itemType: true
              }
            }
          }
        },
        fromRoom: true,
        toRoom: true,
        ...(isPublic ? {} : {
          approvedBy: true,
          assignedTo: true
        })
      },
      ...(isPublic ? {
        where: {
          status: {
            in: ['PENGAJUAN', 'DISETUJUI', 'SELESAI']
          }
        }
      } : {}),
      orderBy: {
        created_at: 'desc'
      }
    });
  }

  async findAssignedMovements(userId: number) {
    return this.prismaService.movement.findMany({
      where: {
        assignedToId: userId,
        status: {
          in: ['DISETUJUI', 'SEDANG_DIPINDAHKAN', 'SELESAI']
        }
      },
      include: {
        items: {
          include: {
            item: {
              include: {
                room: true,
                itemType: true
              }
            }
          }
        },
        fromRoom: true,
        toRoom: true,
        approvedBy: true,
        assignedTo: true
      },
      orderBy: {
        created_at: 'desc'
      }
    });
  }

  async create(data: CreateMovement, isPublic: boolean = false) {
    // Verify items exist and are available
    const items = await this.prismaService.items.findMany({
      where: {
        id: {
          in: data.itemIds
        },
        availability: 'TERSEDIA'
      },
      include: {
        itemType: true,
        room: true
      }
    });

    if (items.length !== data.itemIds.length) {
      throw new BadRequestException('Some items not found or not available');
    }

    // Check if all items are from the same room
    const uniqueRoomIds = [...new Set(items.map(item => item.roomId))];
    if (uniqueRoomIds.length > 1) {
      throw new BadRequestException('All items must be from the same room');
    }

    // Verify fromRoomId matches items' room
    if (data.fromRoomId !== uniqueRoomIds[0]) {
      throw new BadRequestException('FromRoom must match the current location of items');
    }

    // Additional validation for public access
    if (isPublic) {
      if (items.length > 10) {
        throw new BadRequestException('Public requests are limited to 10 items maximum');
      }
      if (data.movementType !== 'PEMINDAHAN') {
        throw new BadRequestException('Public requests can only be of type PEMINDAHAN');
      }
    }

    // Create the movement with related items
    const movement = await this.prismaService.$transaction(async (prisma) => {
      const newMovement = await prisma.movement.create({
        data: {
          MovementTitle: data.MovementTitle,
          movementType: data.movementType,
          status: 'PENGAJUAN',
          quantity: items.length,
          fromRoomId: data.fromRoomId,
          toRoomId: data.toRoomId,
          requesterName: data.requesterName,
          description: data.description,
          items: {
            create: items.map(item => ({
              item: {
                connect: { id: item.id }
              },
              isActive: true
            }))
          }
        },
        include: {
          items: {
            include: {
              item: {
                include: {
                  itemType: true,
                  room: true
                }
              }
            }
          },
          fromRoom: true,
          toRoom: true,
          ...(isPublic ? {} : {
            approvedBy: true,
            assignedTo: true
          })
        }
      });

      // Update items availability
      await prisma.items.updateMany({
        where: {
          id: {
            in: data.itemIds
          }
        },
        data: {
          availability: 'TIDAK_TERSEDIA' as ItemAvailability
        }
      });

      return newMovement;
    });

    // Create movement log
    await this.prismaService.movement_log.create({
      data: {
        MovementTitle: movement.MovementTitle,
        movementType: movement.movementType,
        itemTypeName: movement.items[0].item.itemType.name,
        quantity: movement.quantity,
        fromRoom: movement.fromRoom?.name,
        toRoom: movement.toRoom?.name,
        requesterName: movement.requesterName,
        status: movement.status as MovementStatus,
        itemAvailability: 'TIDAK_TERSEDIA' as ItemAvailability,
        description: `${movement.description || ''} ${isPublic ? '[Public Request]' : ''}`.trim()
      }
    });

    return movement;
  }

  async update(id: number, data: UpdateMovement) {
    const existingMovement = await this.prismaService.movement.findUnique({
      where: { id },
      include: {
        items: {
          include: {
            item: {
              include: {
                itemType: true,
                room: true
              }
            }
          }
        },
        fromRoom: true,
        toRoom: true,
        approvedBy: true,
        assignedTo: true
      }
    });

    if (!existingMovement) {
      throw new NotFoundException('Movement not found');
    }

    const updatedMovement = await this.prismaService.$transaction(async (prisma) => {
      // Handle status change and item availability
      if (data.status) {
        let newAvailability: ItemAvailability;
        let updateData: any = {};

        switch (data.status) {
          case 'DISETUJUI':
            newAvailability = 'TIDAK_TERSEDIA';
            break;
          case 'SEDANG_DIPINDAHKAN':
            newAvailability = 'TIDAK_TERSEDIA';
            break;
          case 'SELESAI':
            newAvailability = 'TERSEDIA';
            updateData.roomId = existingMovement.toRoomId;
            break;
          case 'DITOLAK':
            newAvailability = 'TERSEDIA';
            break;
          default:
            newAvailability = 'TERSEDIA';
        }

        updateData.availability = newAvailability;

        await prisma.items.updateMany({
          where: {
            id: {
              in: existingMovement.items.map(im => im.item.id)
            }
          },
          data: updateData
        });
      }

      if (data.itemIds) {
        const newItems = await prisma.items.findMany({
          where: {
            id: {
              in: data.itemIds
            },
            availability: 'TERSEDIA'
          },
          include: {
            room: true
          }
        });

        if (newItems.length !== data.itemIds.length) {
          throw new BadRequestException('Some items not found or not available');
        }

        const uniqueRoomIds = [...new Set(newItems.map(item => item.roomId))];
        if (uniqueRoomIds.length > 1) {
          throw new BadRequestException('All items must be from the same room');
        }

        if (data.fromRoomId && data.fromRoomId !== uniqueRoomIds[0]) {
          throw new BadRequestException('FromRoom must match the current location of items');
        }

        await prisma.items.updateMany({
          where: {
            id: {
              in: existingMovement.items.map(im => im.item.id)
            }
          },
          data: {
            availability: 'TERSEDIA' as ItemAvailability
          }
        });

        const newItemAvailability: ItemAvailability = 
          data.status === 'SELESAI' ? 'TERSEDIA' :
          (data.status === 'SEDANG_DIPINDAHKAN' || data.status === 'DISETUJUI') ? 'TIDAK_TERSEDIA' : 
          'TERSEDIA';

        await prisma.items.updateMany({
          where: {
            id: {
              in: data.itemIds
            }
          },
          data: {
            availability: newItemAvailability,
            ...(data.status === 'SELESAI' ? { roomId: existingMovement.toRoomId } : {})
          }
        });
      }

      return prisma.movement.update({
        where: { id },
        data: {
          MovementTitle: data.MovementTitle,
          movementType: data.movementType,
          status: data.status as MovementStatus,
          quantity: data.itemIds?.length || existingMovement.quantity,
          fromRoomId: data.fromRoomId,
          toRoomId: data.toRoomId,
          requesterName: data.requesterName,
          description: data.description,
          approvedById: data.approvedById,
          assignedToId: data.assignedToId,
          items: data.itemIds ? {
            deleteMany: {},
            create: data.itemIds.map(itemId => ({
              item: {
                connect: { id: itemId }
              },
              isActive: true
            }))
          } : undefined
        },
        include: {
          items: {
            include: {
              item: {
                include: {
                  itemType: true,
                  room: true
                }
              }
            }
          },
          fromRoom: true,
          toRoom: true,
          approvedBy: true,
          assignedTo: true
        }
      });
    });

    let logDescription = `Movement updated: ${JSON.stringify(data)}`;
    if (data.status) {
      switch (data.status) {
        case 'DISETUJUI':
          logDescription = `Movement approved by ${updatedMovement.approvedBy?.username} and assigned to ${updatedMovement.assignedTo?.username}`;
          break;
        case 'SEDANG_DIPINDAHKAN':
          logDescription = `Movement started by ${updatedMovement.assignedTo?.username}`;
          break;
        case 'SELESAI':
          logDescription = `Movement completed by ${updatedMovement.assignedTo?.username}. Items moved to ${updatedMovement.toRoom?.name}`;
          break;
        case 'DITOLAK':
          logDescription = `Movement rejected by ${updatedMovement.approvedBy?.username}`;
          break;
      }
    }

    await this.prismaService.movement_log.create({
      data: {
        MovementTitle: updatedMovement.MovementTitle || `Movement #${updatedMovement.id}`,
        movementType: updatedMovement.movementType,
        itemTypeName: updatedMovement.items[0].item.itemType.name,
        quantity: updatedMovement.quantity,
        fromRoom: updatedMovement.fromRoom?.name,
        toRoom: updatedMovement.toRoom?.name,
        requesterName: updatedMovement.requesterName,
        approvedBy: updatedMovement.approvedBy?.username,
        assignedTo: updatedMovement.assignedTo?.username,
        status: updatedMovement.status,
        itemAvailability: data.status === 'SELESAI' ? 'TERSEDIA' : 'TIDAK_TERSEDIA',
        description: logDescription
      }
    });

    return updatedMovement;
  }

  async delete(id: number) {
    const movement = await this.prismaService.movement.findUnique({
      where: { id },
      include: {
        items: {
          include: {
            item: {
              include: {
                itemType: true
              }
            }
          }
        }
      }
    });

    if (!movement) {
      throw new NotFoundException('Movement not found');
    }

    if (movement.status === 'SEDANG_DIPINDAHKAN') {
      throw new Error('Cannot delete movement that is in progress');
    }

    const deletedMovement = await this.prismaService.$transaction(async (prisma) => {
      await prisma.items.updateMany({
        where: {
          id: {
            in: movement.items.map(im => im.item.id)
          }
        },
        data: {
          availability: 'TERSEDIA' as ItemAvailability
        }
      });

      await prisma.itemMovement.deleteMany({
        where: { movementId: id }
      });

      return prisma.movement.delete({
        where: { id }
      });
    });

    await this.prismaService.movement_log.create({
      data: {
        MovementTitle: movement.MovementTitle || `Movement #${movement.id}`,
        movementType: movement.movementType,
        itemTypeName: movement.items[0].item.itemType.name,
        quantity: movement.quantity,
        requesterName: movement.requesterName,
        status: 'DITOLAK' as MovementStatus,
        itemAvailability: 'TERSEDIA' as ItemAvailability,
        description: 'Movement deleted'
      }
    });

    return deletedMovement;
  }

  async getAvailableOfficers() {
    try {
      const officers = await this.prismaService.users.findMany({
        where: {
          role: 1
        },
        select: {
          id: true,
          username: true,
        },
        orderBy: {
          username: 'asc'
        }
      });

      if (!officers.length) {
        throw new NotFoundException('No officers found');
      }

      return officers;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Failed to fetch officers');
    }
  }
} 