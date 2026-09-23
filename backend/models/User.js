const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'User name is required'],
      trim: true,
      maxlength: [80, 'Name cannot exceed 80 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email address is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
    },
    passwordHash: {
      type: String,
      required: [true, 'Password hash is required'],
    },
    tier: {
      type: String,
      enum: ['Pro Tier', 'Standard', 'Guest Sandbox'],
      default: 'Pro Tier',
    },
    role: {
      type: String,
      default: 'Quantitative Fund Manager',
    },
    initialCapital: {
      type: Number,
      default: 3500000,
    },
    handle: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Method to verify candidate password
UserSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.passwordHash);
};

// Static helper to hash passwords
UserSchema.statics.hashPassword = async function (plainPassword) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(plainPassword, salt);
};

module.exports = mongoose.model('User', UserSchema);
