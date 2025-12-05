import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  description: {
    type: String,
    required: true
  },
  shortDescription: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  comparePrice: {
    type: Number,
    default: null
  },
  images: [{
    type: String
  }],
  category: {
    type: String,
    required: true
  },
  subcategory: {
    type: String
  },
  brand: {
    type: String,
    required: true
  },
  stock: {
    type: Number,
    required: true,
    default: 0
  },
  sku: {
    type: String,
    required: true,
    unique: true
  },
  specifications: {
    type: Map,
    of: String
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  reviewCount: {
    type: Number,
    default: 0
  },
  tags: [{
    type: String
  }],
  status: {
    type: String,
    enum: ['active', 'out-of-stock', 'discontinued'],
    default: 'active'
  }
}, {
  timestamps: true
});

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);
