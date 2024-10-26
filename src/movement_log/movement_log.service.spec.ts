import { Test, TestingModule } from '@nestjs/testing';
import { MovementLogService } from './movement_log.service';

describe('MovementLogService', () => {
  let service: MovementLogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MovementLogService],
    }).compile();

    service = module.get<MovementLogService>(MovementLogService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
