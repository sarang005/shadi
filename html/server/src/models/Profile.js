import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    gender: { type: String, enum: ['male', 'female', 'other'] },
    dateOfBirth: Date,
    religion: String,
    caste: String,
    motherTongue: String,
    city: String,
    state: String,
    country: { type: String, default: 'India' },
    education: String,
    occupation: String,
    about: { type: String, maxlength: 2000 },
    height: String,
    maritalStatus: String,
    isVerified: { type: Boolean, default: false },
    isPublished: { type: Boolean, default: false },
    preferences: {
      ageMin: Number,
      ageMax: Number,
      religions: [String],
      locations: [String],
    },
  },
  { timestamps: true }
);

profileSchema.index({ city: 1, religion: 1 });

const Profile = mongoose.model('Profile', profileSchema);

export default Profile;
