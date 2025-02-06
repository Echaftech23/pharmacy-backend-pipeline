// providers/pharmacy-review.service.ts
import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { PharmacyReview } from '../schemas/pharmacy-review.schema';
import { IPharmacyReview } from '../interfaces/pharmacy-review.interface';
import { IPharmacyReviewRepository } from '../interfaces/pharmacy-review.repository.interface';
import { CreatePharmacyReviewDto } from '../dtos/create-pharmacy-review.dto';
import { UpdatePharmacyReviewDto } from '../dtos/update-pharmacy-review.dto';

@Injectable()
export class PharmacyReviewService implements IPharmacyReview {
  constructor(
    @Inject('IPharmacyReviewRepository')
    private readonly reviewRepository: IPharmacyReviewRepository,
  ) {}

  async getAllReviews(filters: {
    isReported?: boolean;
  }): Promise<PharmacyReview[]> {
    return this.reviewRepository.findAll(filters);
  }

  async getPharmacyReviews(pharmacyId: string): Promise<PharmacyReview[]> {
    return this.reviewRepository.findByPharmacy(pharmacyId);
  }

  async createReview(
    userId: string,
    createReviewDto: CreatePharmacyReviewDto,
  ): Promise<PharmacyReview> {
    return this.reviewRepository.create({ ...createReviewDto, userId });
  }

  async updateReview(
    reviewId: string,
    updateReviewDto: UpdatePharmacyReviewDto,
  ): Promise<PharmacyReview> {
    const updatedReview = await this.reviewRepository.update(
      reviewId,
      updateReviewDto,
    );
    if (!updatedReview) {
      throw new NotFoundException(`Review #${reviewId} not found`);
    }
    return updatedReview;
  }

  async deleteReview(reviewId: string): Promise<void> {
    const deleted = await this.reviewRepository.delete(reviewId);
    if (!deleted) {
      throw new NotFoundException(`Review #${reviewId} not found`);
    }
  }

  async reportReview(
    reviewId: string,
    reason: string,
  ): Promise<PharmacyReview> {
    const review = await this.reviewRepository.updateReportStatus(
      reviewId,
      reason,
    );
    if (!review) {
      throw new NotFoundException(`Review #${reviewId} not found`);
    }
    return review;
  }
}
