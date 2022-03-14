import { Test, TestingModule } from '@nestjs/testing';
import { ClientTokenService } from './client-token.service';

describe('ClientTokenService', () => {
  let service: ClientTokenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClientTokenService],
    }).compile();

    service = module.get<ClientTokenService>(ClientTokenService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
