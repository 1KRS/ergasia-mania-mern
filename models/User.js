import mongoose from 'mongoose';
import validator from 'validator';

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
      message: 'Please provide a valid email'
    }
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minLength: 6,
  },
  location: { type: String, maxLength: 20, trim: true, default: 'My city' },
});

export default mongoose.model('User', UserSchema);
