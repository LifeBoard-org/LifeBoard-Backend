import mongoose, { Schema, Document, Model } from 'mongoose';
import bcrypt from 'bcryptjs';
import { IUser } from './user.types';

// Extend Mongoose Document
export interface IUserDocument extends IUser, Document {
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema: Schema<IUserDocument> = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    //   trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    //   trim: true
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user'
    }
  },
  {
    timestamps: true
  }
);

const User: Model<IUserDocument> = mongoose.model<IUserDocument>(
  'User',
  userSchema
);


export default User;