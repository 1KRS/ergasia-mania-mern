import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide your name'],
    minLength: 2,
    maxLength: 20,
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, 'Please provide your last name'],
    minLength: 2,
    maxLength: 30,
    trim: true,
    default: 'Lastname',
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: 'Please provide a valid email',
    },
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minLength: 6,
    select: false,
  },
  location: {
    type: String,
    minLength: 4,
    maxLength: 20,
    trim: true,
    default: 'My city',
  },
  isMember: {
    type: Boolean,
    default: false,
  },
});

UserSchema.pre('save', async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.createJWT = function () {
  return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
};

export default mongoose.model('User', UserSchema);
