import { NextResponse } from 'next/server';
import connectMongoDB from '@/lib/mongodb';
import mongoose from 'mongoose';
import { cache } from '@/lib/redis';

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

// Enable ISR revalidation
export const revalidate = 600; // Revalidate every 10 minutes

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit')) || 8;
    
    const cacheKey = `categories:${limit}`;
    
    // Try cache first
    const cachedCategories = await cache.get(cacheKey);
    if (cachedCategories) {
      console.log('✅ Cache HIT:', cacheKey);
      return NextResponse.json({
        success: true,
        count: cachedCategories.length,
        categories: cachedCategories,
        cached: true
      }, {
        headers: {
          'Cache-Control': 'public, s-maxage=600, stale-while-revalidate=1200',
          'X-Cache': 'HIT'
        }
      });
    }

    console.log('❌ Cache MISS:', cacheKey);
    
    await connectMongoDB();

    const categories = await Category.find({ status: 'active' })
      .sort({ productCount: -1 })
      .limit(limit)
      .select('-__v')
      .lean();

    const plainCategories = categories.map(cat => ({
      ...cat,
      _id: cat._id.toString()
    }));

    // Cache for 2 hours
    await cache.set(cacheKey, plainCategories, 7200);

    return NextResponse.json({
      success: true,
      count: plainCategories.length,
      categories: plainCategories,
      cached: false
    }, {
      headers: {
        'Cache-Control': 'public, s-maxage=600, stale-while-revalidate=1200',
        'X-Cache': 'MISS'
      }
    });

  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}