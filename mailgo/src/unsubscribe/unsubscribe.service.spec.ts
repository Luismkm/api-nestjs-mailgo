import { Test, TestingModule } from '@nestjs/testing';
import { UnsubscribeService } from './unsubscribe.service';

describe('UnsubscribeService', () => {
  let service: UnsubscribeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UnsubscribeService],
    }).compile();

    service = module.get<UnsubscribeService>(UnsubscribeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
