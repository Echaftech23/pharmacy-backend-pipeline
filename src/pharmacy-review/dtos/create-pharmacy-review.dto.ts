// dto/create-pharmacy-review.dto.ts
export class CreatePharmacyReviewDto {
  pharmacyId: string;
  rating?: number;
  comment: string;
}
