import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { PharmacyReview } from '../schemas/pharmacy-review.schema';
import { IPharmacyReviewRepository } from '../interfaces/pharmacy-review.repository.interface';
import { CreatePharmacyReviewDto } from '../dtos/create-pharmacy-review.dto';
import { UpdatePharmacyReviewDto } from '../dtos/update-pharmacy-review.dto';

@Injectable()
export class PharmacyReviewRepository implements IPharmacyReviewRepository {
  constructor(
    @InjectModel(PharmacyReview.name)
    private readonly reviewModel: Model<PharmacyReview>,
  ) {}

  async findAll(
    filters: { isReported?: boolean } = {},
  ): Promise<PharmacyReview[]> {
    return this.reviewModel
      .find(filters)
      .populate('userId', 'username email')
      .populate('pharmacyId', 'name address')
      .sort({ createdAt: -1 })
      .exec();
  }

  async findById(id: string): Promise<PharmacyReview | null> {
    return this.reviewModel
      .findById(id)
      .populate('userId', 'username email')
      .populate('pharmacyId', 'name address')
      .exec();
  }

  async findByPharmacy(
    pharmacyId: string,
    approved = true,
  ): Promise<PharmacyReview[]> {
    return this.reviewModel
      .find({
        pharmacyId: new Types.ObjectId(pharmacyId),
        isApproved: approved,
      })
      .populate('userId', 'username')
      .sort({ createdAt: -1 })
      .exec();
  }

  async create(
    reviewData: CreatePharmacyReviewDto & { userId: string },
  ): Promise<PharmacyReview> {
    const review = new this.reviewModel({
      ...reviewData,
      userId: new Types.ObjectId(reviewData.userId),
      pharmacyId: new Types.ObjectId(reviewData.pharmacyId),
    });
    return review.save();
  }

  async update(
    id: string,
    updateData: UpdatePharmacyReviewDto,
  ): Promise<PharmacyReview | null> {
    return this.reviewModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .populate('userId', 'username email')
      .populate('pharmacyId', 'name address')
      .exec();
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.reviewModel
      .deleteOne({ _id: new Types.ObjectId(id) })
      .exec();
    return result.deletedCount > 0;
  }

  async updateReportStatus(
    id: string,
    reason: string,
  ): Promise<PharmacyReview | null> {
    return this.reviewModel
      .findByIdAndUpdate(
        id,
        {
          isReported: true,
          reportReason: reason,
        },
        { new: true },
      )
      .exec();
  }
}
