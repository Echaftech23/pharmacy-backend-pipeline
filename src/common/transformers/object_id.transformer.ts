import mongoose from 'mongoose';

export class ObjectIdTransformer {
  static toObjectId(id: string): mongoose.Types.ObjectId {
    return new mongoose.Types.ObjectId(id);
  }
}
