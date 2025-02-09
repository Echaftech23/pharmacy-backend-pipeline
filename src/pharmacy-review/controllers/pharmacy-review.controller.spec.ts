import { Test, TestingModule } from '@nestjs/testing';
import { PharmacyReviewController } from './pharmacy-review.controller';
import { PharmacyReviewService } from '../providers/pharmacy-review.service';
import { PharmacyReview } from '../schemas/pharmacy-review.schema';
import { Types } from 'mongoose';
import { CreatePharmacyReviewDto } from '../dtos/create-pharmacy-review.dto';
import { UpdatePharmacyReviewDto } from '../dtos/update-pharmacy-review.dto';

describe('PharmacyReviewController', () => {
  let controller: PharmacyReviewController;
  let service: PharmacyReviewService;

  const mockReview: PharmacyReview = {
    pharmacyId: new Types.ObjectId(),
    userId: new Types.ObjectId(),
    rating: 4,
    comment: 'Test review',
    isReported: false,
    reportReason: null,
  };

  const mockService = {
    getAllReviews: jest.fn().mockResolvedValue([mockReview]),
    getPharmacyReviews: jest.fn().mockResolvedValue([mockReview]),
    createReview: jest.fn().mockResolvedValue(mockReview),
    updateReview: jest.fn().mockResolvedValue(mockReview),
    deleteReview: jest.fn().mockResolvedValue(undefined),
    reportReview: jest.fn().mockResolvedValue(mockReview),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PharmacyReviewController],
      providers: [
        {
          provide: PharmacyReviewService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<PharmacyReviewController>(PharmacyReviewController);
    service = module.get<PharmacyReviewService>(PharmacyReviewService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAllReviews', () => {
    it('should return all reviews', async () => {
      const filters = { isReported: false };
      const result = await controller.getAllReviews(filters);
      expect(service.getAllReviews).toHaveBeenCalledWith(filters);
      expect(result).toEqual([mockReview]);
    });
  });

  describe('getPharmacyReviews', () => {
    it('should return pharmacy reviews', async () => {
      const pharmacyId = new Types.ObjectId().toString();
      const result = await controller.getPharmacyReviews(pharmacyId);
      expect(service.getPharmacyReviews).toHaveBeenCalledWith(pharmacyId);
      expect(result).toEqual([mockReview]);
    });
  });

  describe('createReview', () => {
    it('should create a review', async () => {
      const userId = new Types.ObjectId().toString();
      const createReviewDto: CreatePharmacyReviewDto = {
        pharmacyId: new Types.ObjectId().toString(),
        rating: 4,
        comment: 'Test review',
      };

      const result = await controller.createReview(userId, createReviewDto);
      expect(service.createReview).toHaveBeenCalledWith(
        userId,
        createReviewDto,
      );
      expect(result).toEqual(mockReview);
    });
  });

  describe('updateReview', () => {
    it('should update a review', async () => {
      const reviewId = new Types.ObjectId().toString();
      const updateReviewDto: UpdatePharmacyReviewDto = {
        rating: 5,
        comment: 'Updated review',
      };

      const result = await controller.updateReview(reviewId, updateReviewDto);
      expect(service.updateReview).toHaveBeenCalledWith(
        reviewId,
        updateReviewDto,
      );
      expect(result).toEqual(mockReview);
    });
  });

  describe('deleteReview', () => {
    it('should delete a review', async () => {
      const reviewId = new Types.ObjectId().toString();
      const result = await controller.deleteReview(reviewId);
      expect(service.deleteReview).toHaveBeenCalledWith(reviewId);
      expect(result).toBeUndefined();
    });
  });

  describe('reportReview', () => {
    it('should report a review', async () => {
      const reviewId = new Types.ObjectId().toString();
      const reason = 'Inappropriate content';
      const reportedReview = {
        ...mockReview,
        isReported: true,
        reportReason: reason,
      };
      mockService.reportReview.mockResolvedValueOnce(reportedReview);

      const result = await controller.reportReview(reviewId, reason);
      expect(service.reportReview).toHaveBeenCalledWith(reviewId, reason);
      expect(result).toEqual(reportedReview);
    });
  });
});
