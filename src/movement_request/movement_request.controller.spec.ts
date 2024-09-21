import { Test, TestingModule } from '@nestjs/testing';
import { MovementRequestController } from './movement_request.controller';

describe('MovementRequestController', () => {
  let controller: MovementRequestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MovementRequestController],
    }).compile();

    controller = module.get<MovementRequestController>(MovementRequestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
