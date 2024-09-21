import { Test, TestingModule } from '@nestjs/testing';
import { MovementRequestService } from './movement_request.service';

describe('MovementRequestService', () => {
  let service: MovementRequestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MovementRequestService],
    }).compile();

    service = module.get<MovementRequestService>(MovementRequestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
