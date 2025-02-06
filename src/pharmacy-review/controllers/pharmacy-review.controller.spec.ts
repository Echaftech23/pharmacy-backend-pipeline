import { Test, TestingModule } from '@nestjs/testing';
import { PharmacyReviewController } from './pharmacy-review.controller';
import { PharmacyReviewService } from './pharmacy-review.service';

describe('PharmacyReviewController', () => {
  let controller: PharmacyReviewController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PharmacyReviewController],
      providers: [PharmacyReviewService],
    }).compile();

    controller = module.get<PharmacyReviewController>(PharmacyReviewController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
