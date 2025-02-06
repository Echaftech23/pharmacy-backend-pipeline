import {
  Controller,
  Post,
  Get,
  Param,
  Query,
  Body,
  HttpCode,
  HttpStatus,
  Delete,
  Patch,
} from '@nestjs/common';
import { PharmacyReviewService } from '../providers/pharmacy-review.service';
import { PharmacyReview } from '../schemas/pharmacy-review.schema';
import { CreatePharmacyReviewDto } from '../dtos/create-pharmacy-review.dto';
import { UpdatePharmacyReviewDto } from '../dtos/update-pharmacy-review.dto';

@Controller('pharmacy-review')
export class PharmacyReviewController {
  constructor(private readonly pharmacyReviewService: PharmacyReviewService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllReviews(
    @Query() filters: { isReported?: boolean },
  ): Promise<PharmacyReview[]> {
    console.log('filters', filters);
    return this.pharmacyReviewService.getAllReviews(filters);
  }

  @Get(':id/reviews')
  @HttpCode(HttpStatus.OK)
  async getPharmacyReviews(
    @Param('id') pharmacyId: string,
  ): Promise<PharmacyReview[]> {
    return this.pharmacyReviewService.getPharmacyReviews(pharmacyId);
  }

  @Post(':userId')
  @HttpCode(HttpStatus.CREATED)
  async createReview(
    @Param('userId') userId: string,
    @Body() createReviewDto: CreatePharmacyReviewDto,
  ): Promise<PharmacyReview> {
    console.log('userId', userId);
    return this.pharmacyReviewService.createReview(userId, createReviewDto);
  }

  @Patch(':reviewId')
  @HttpCode(HttpStatus.OK)
  async updateReview(
    @Param('reviewId') reviewId: string,
    @Body() updateReviewDto: UpdatePharmacyReviewDto,
  ): Promise<PharmacyReview> {
    console.log('patch', reviewId);
    return this.pharmacyReviewService.updateReview(reviewId, updateReviewDto);
  }

  @Delete(':reviewId')
  async deleteReview(@Param('reviewId') reviewId: string): Promise<void> {
    console.log('reviewId', reviewId);
    return this.pharmacyReviewService.deleteReview(reviewId);
  }

  @Post(':id/report')
  @HttpCode(HttpStatus.OK)
  async reportReview(
    @Param('id') id: string,
    @Body('reason') reason: string,
  ): Promise<PharmacyReview> {
    return this.pharmacyReviewService.reportReview(id, reason);
  }
}
