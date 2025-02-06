// interfaces/pharmacy-review.interface.ts
import { PharmacyReview } from '../schemas/pharmacy-review.schema';
import { CreatePharmacyReviewDto } from '../dtos/create-pharmacy-review.dto';
import { UpdatePharmacyReviewDto } from '../dtos/update-pharmacy-review.dto';

export interface IPharmacyReview {
  getAllReviews(filters: { isReported?: boolean }): Promise<PharmacyReview[]>;
  getPharmacyReviews(pharmacyId: string): Promise<PharmacyReview[]>;
  createReview(
    userId: string,
    createReviewDto: CreatePharmacyReviewDto,
  ): Promise<PharmacyReview>;
  updateReview(
    reviewId: string,
    updateReviewDto: UpdatePharmacyReviewDto,
  ): Promise<PharmacyReview>;
  deleteReview(reviewId: string): Promise<void>;
  reportReview(reviewId: string, reason: string): Promise<PharmacyReview>;
}
