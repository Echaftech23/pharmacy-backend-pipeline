import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type PharmacyReviewDocument = PharmacyReview & Document;

@Schema({ timestamps: true })
export class PharmacyReview {
  @Prop({ type: Types.ObjectId, required: true, ref: 'Pharmacy' })
  pharmacyId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, required: true, ref: 'User' })
  userId: Types.ObjectId;

  @Prop({ required: true, min: 1, max: 5 })
  rating: number;

  @Prop({ required: true })
  comment: string;

  @Prop({ default: false })
  isReported: boolean;

  @Prop({ type: String, default: null })
  reportReason: string;
}

export const PharmacyReviewSchema =
  SchemaFactory.createForClass(PharmacyReview);
