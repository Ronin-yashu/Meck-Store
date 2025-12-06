import { NextResponse } from 'next/server';
import connectMongoDB from '@/lib/mongodb';
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

export async function GET(request) {
  try {
    await connectMongoDB();

    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit')) || 8;

    const categories = await Category.find({ status: 'active' })
      .sort({ productCount: -1 })
      .limit(limit)
      .lean();

    const plainCategories = categories.map(cat => ({
      ...cat,
      _id: cat._id.toString()
    }));

    return NextResponse.json({
      success: true,
      count: plainCategories.length,
      categories: plainCategories
    }, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600'
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
