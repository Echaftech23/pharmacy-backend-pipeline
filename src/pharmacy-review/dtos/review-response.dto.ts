export class ReviewResponseDto {
  id: string;
  pharmacyId: string;
  userId: string;
  rating: number;
  comment: string;
  isApproved: boolean;
  isReported: boolean;
  reportReason?: string;
  createdAt: Date;
  updatedAt: Date;
}
