import connectMongoDB from '../lib/mongodb.js';
import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema({
  name: String,
  slug: String,
  description: String,
  image: String,
  icon: String,
  productCount: Number,
  status: String
}, { timestamps: true });

const Category = mongoose.models.Category || mongoose.model('Category', CategorySchema);

const categories = [
  {
    name: "Electronics",
    slug: "electronics",
    description: "Latest gadgets and electronic devices",
    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800",
    icon: "🔌",
    productCount: 150,
    status: "active"
  },
  {
    name: "Fashion",
    slug: "fashion",
    description: "Trendy clothes and accessories",
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=800",
    icon: "👗",
    productCount: 320,
    status: "active"
  },
  {
    name: "Home & Kitchen",
    slug: "home-kitchen",
    description: "Everything for your home",
    image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800",
    icon: "🏠",
    productCount: 200,
    status: "active"
  },
  {
    name: "Sports & Fitness",
    slug: "sports-fitness",
    description: "Stay fit and healthy",
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800",
    icon: "⚽",
    productCount: 180,
    status: "active"
  },
  {
    name: "Books & Media",
    slug: "books-media",
    description: "Books, movies, and music",
    image: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=800",
    icon: "📚",
    productCount: 250,
    status: "active"
  },
  {
    name: "Beauty & Personal Care",
    slug: "beauty-personal-care",
    description: "Skincare and cosmetics",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800",
    icon: "💄",
    productCount: 140,
    status: "active"
  },
  {
    name: "Toys & Games",
    slug: "toys-games",
    description: "Fun for all ages",
    image: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=800",
    icon: "🎮",
    productCount: 95,
    status: "active"
  },
  {
    name: "Automotive",
    slug: "automotive",
    description: "Car accessories and parts",
    image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800",
    icon: "🚗",
    productCount: 110,
    status: "active"
  }
];

async function seedCategories() {
  try {
    await connectMongoDB();
    
    await Category.deleteMany({});
    console.log('🗑️  Cleared existing categories');
    
    await Category.insertMany(categories);
    console.log('✅ Successfully seeded 8 categories');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding categories:', error);
    process.exit(1);
  }
}

seedCategories();
