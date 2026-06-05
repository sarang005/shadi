import mongoose from 'mongoose';
import { ROLES, ALL_ROLES } from '../constants/roles.js';
import { hashPassword } from '../helpers/passwordHelper.js';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: 100,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: 8,
      select: false,
    },
    role: {
      type: String,
      enum: ALL_ROLES,
      default: ROLES.USER,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    avatar: {
      type: String,
      default: null,
    },
    membership: {
      type: String,
      default: 'Free',
    },
    profileId: {
      type: String,
      unique: true,
      sparse: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    lastLogin: {
      type: Date,
      default: null,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(_doc, ret) {
        delete ret.password;
        return ret;
      },
    },
  }
);

userSchema.index({ role: 1 });
userSchema.index({ isActive: 1 });
userSchema.index({ createdAt: -1 });

userSchema.pre('save', async function hashOnSave(next) {
  if (!this.isModified('password')) return next();
  this.password = await hashPassword(this.password);
  return next();
});

userSchema.pre('save', function generateProfileId(next) {
  if (!this.profileId && this.role === ROLES.USER) {
    this.profileId = `SHG${Date.now().toString().slice(-7)}`;
  }
  next();
});

const User = mongoose.model('User', userSchema);

export default User;
