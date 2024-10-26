import { Test, TestingModule } from '@nestjs/testing';
import { MovementLogController } from './movement_log.controller';

describe('MovementLogController', () => {
  let controller: MovementLogController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MovementLogController],
    }).compile();

    controller = module.get<MovementLogController>(MovementLogController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
