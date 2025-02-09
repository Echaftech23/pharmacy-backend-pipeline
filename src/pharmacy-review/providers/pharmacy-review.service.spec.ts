import { Test, TestingModule } from '@nestjs/testing';
import { PharmacyReviewService } from './pharmacy-review.service';
import { IPharmacyReviewRepository } from '../interfaces/pharmacy-review.repository.interface';
import { NotFoundException } from '@nestjs/common';
import { PharmacyReview } from '../schemas/pharmacy-review.schema';
import { CreatePharmacyReviewDto } from '../dtos/create-pharmacy-review.dto';
import { UpdatePharmacyReviewDto } from '../dtos/update-pharmacy-review.dto';
import { Types } from 'mongoose';

describe('PharmacyReviewService', () => {
  let service: PharmacyReviewService;
  let repository: IPharmacyReviewRepository;

  const mockRepository = {
    findAll: jest.fn(),
    findByPharmacy: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    updateReportStatus: jest.fn(),
  };

  const mockReview: PharmacyReview = {
    pharmacyId: new Types.ObjectId(),
    userId: new Types.ObjectId(),
    rating: 5,
    comment: 'Great service!',
    isReported: false,
    reportReason: null,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PharmacyReviewService,
        { provide: 'IPharmacyReviewRepository', useValue: mockRepository },
      ],
    }).compile();

    service = module.get<PharmacyReviewService>(PharmacyReviewService);
    repository = module.get<IPharmacyReviewRepository>(
      'IPharmacyReviewRepository',
    );
  });

  it('should get all reviews', async () => {
    mockRepository.findAll.mockResolvedValue([mockReview]);
    const filters = { isReported: false };
    const result = await service.getAllReviews(filters);
    expect(result).toEqual([mockReview]);
    expect(repository.findAll).toHaveBeenCalledWith(filters);
  });

  it('should get pharmacy reviews', async () => {
    mockRepository.findByPharmacy.mockResolvedValue([mockReview]);
    const pharmacyId = 'somePharmacyId';
    const result = await service.getPharmacyReviews(pharmacyId);
    expect(result).toEqual([mockReview]);
    expect(repository.findByPharmacy).toHaveBeenCalledWith(pharmacyId);
  });

  it('should create a review', async () => {
    mockRepository.create.mockResolvedValue(mockReview);
    const userId = 'someUserId';
    const createReviewDto: CreatePharmacyReviewDto = {
      pharmacyId: 'somePharmacyId',
      rating: 5,
      comment: 'Great service!',
    };
    const result = await service.createReview(userId, createReviewDto);
    expect(result).toEqual(mockReview);
    expect(repository.create).toHaveBeenCalledWith({
      ...createReviewDto,
      userId,
    });
  });

  it('should update a review', async () => {
    mockRepository.update.mockResolvedValue(mockReview);
    const reviewId = 'someReviewId';
    const updateReviewDto: UpdatePharmacyReviewDto = {
      rating: 4,
      comment: 'Good service!',
    };
    const result = await service.updateReview(reviewId, updateReviewDto);
    expect(result).toEqual(mockReview);
    expect(repository.update).toHaveBeenCalledWith(reviewId, updateReviewDto);
  });

  it('should throw NotFoundException if review to update is not found', async () => {
    mockRepository.update.mockResolvedValue(null);
    const reviewId = 'someReviewId';
    const updateReviewDto: UpdatePharmacyReviewDto = {
      rating: 4,
      comment: 'Good service!',
    };
    await expect(
      service.updateReview(reviewId, updateReviewDto),
    ).rejects.toThrow(NotFoundException);
  });

  it('should delete a review', async () => {
    mockRepository.delete.mockResolvedValue(true);
    const reviewId = 'someReviewId';
    await service.deleteReview(reviewId);
    expect(repository.delete).toHaveBeenCalledWith(reviewId);
  });

  it('should throw NotFoundException if review to delete is not found', async () => {
    mockRepository.delete.mockResolvedValue(false);
    const reviewId = 'someReviewId';
    await expect(service.deleteReview(reviewId)).rejects.toThrow(
      NotFoundException,
    );
  });

  it('should report a review', async () => {
    mockRepository.updateReportStatus.mockResolvedValue(mockReview);
    const reviewId = 'someReviewId';
    const reason = 'Inappropriate content';
    const result = await service.reportReview(reviewId, reason);
    expect(result).toEqual(mockReview);
    expect(repository.updateReportStatus).toHaveBeenCalledWith(
      reviewId,
      reason,
    );
  });

  it('should throw NotFoundException if review to report is not found', async () => {
    mockRepository.updateReportStatus.mockResolvedValue(null);
    const reviewId = 'someReviewId';
    const reason = 'Inappropriate content';
    await expect(service.reportReview(reviewId, reason)).rejects.toThrow(
      NotFoundException,
    );
  });
});
