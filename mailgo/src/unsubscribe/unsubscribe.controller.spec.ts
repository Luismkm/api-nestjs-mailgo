import { Test, TestingModule } from '@nestjs/testing';
import { UnsubscribeController } from './unsubscribe.controller';
import { UnsubscribeService } from './unsubscribe.service';

describe('UnsubscribeController', () => {
  let controller: UnsubscribeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UnsubscribeController],
      providers: [UnsubscribeService],
    }).compile();

    controller = module.get<UnsubscribeController>(UnsubscribeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
