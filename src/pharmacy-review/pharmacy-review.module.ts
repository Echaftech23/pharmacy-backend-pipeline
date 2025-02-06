import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PharmacyReviewService } from './providers/pharmacy-review.service';
import { PharmacyReviewController } from './controllers/pharmacy-review.controller';
import { PharmacyReviewRepository } from './repositories/pharmacy-review.repository';
import {
  PharmacyReview,
  PharmacyReviewSchema,
} from './schemas/pharmacy-review.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PharmacyReview.name, schema: PharmacyReviewSchema },
    ]),
  ],
  controllers: [PharmacyReviewController],
  providers: [
    PharmacyReviewService,
    {
      provide: 'IPharmacyReviewRepository',
      useClass: PharmacyReviewRepository,
    },
    {
      provide: 'IPharmacyReview',
      useClass: PharmacyReviewService,
    },
  ],
  exports: [PharmacyReviewService],
})
export class PharmacyReviewModule {}
