import mongoose from 'mongoose';
import User from '../models/user.schema.js';

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    default: 0,
  },
  status: {
    type: String,
    enum: ['available', 'sold_out'],
    default: 'available',
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  seller: {
    email: String,  // Store the seller's email
    phone: String,  // Store the seller's phone number
  },
  interested: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      name: String,
      email: String,
      phone: String,
    },
  ],
  imageUrl: {
    type: String,
  },
}, { timestamps: true });

export default mongoose.model('Product', productSchema);
