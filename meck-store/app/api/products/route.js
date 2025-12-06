import { NextResponse } from 'next/server';
import connectMongoDB from '@/lib/mongodb';
import Product from '@/models/Product';

export const revalidate = 60;

export async function GET(request) {
  try {
    await connectMongoDB();

    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit')) || 8;
    const featured = searchParams.get('featured') === 'true';

    let query = { status: 'active' };
    if (featured) {
      query.tags = 'featured';
    }

    const products = await Product.find(query)
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean();

    const plainProducts = products.map(product => ({
      ...product,
      _id: product._id.toString(),
      specifications: product.specifications || {} // Changed this line
    }));

    return NextResponse.json(
      {
        success: true,
        count: plainProducts.length,
        products: plainProducts
      },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120'
        }
      }
    );

  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
