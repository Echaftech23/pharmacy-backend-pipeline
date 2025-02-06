import { Test, TestingModule } from '@nestjs/testing';
import { PharmacyReviewService } from './pharmacy-review.service';

describe('PharmacyReviewService', () => {
  let service: PharmacyReviewService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PharmacyReviewService],
    }).compile();

    service = module.get<PharmacyReviewService>(PharmacyReviewService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
