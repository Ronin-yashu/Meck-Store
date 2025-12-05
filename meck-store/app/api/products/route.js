import { NextResponse } from 'next/server';
import connectMongoDB from '@/lib/mongodb';
import Product from '@/models/Product';

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
      .limit(limit);

    // Convert to plain objects
    const plainProducts = products.map(product => {
      const obj = product.toObject();
      return {
        ...obj,
        _id: obj._id.toString(),
        specifications: obj.specifications ? Object.fromEntries(obj.specifications) : {}
      };
    });

    return NextResponse.json({
      success: true,
      count: plainProducts.length,
      products: plainProducts
    });

  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
