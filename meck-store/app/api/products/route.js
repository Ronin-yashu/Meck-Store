import { NextResponse } from 'next/server';
import connectMongoDB from '@/lib/mongodb';
import Product from '@/models/Product';
import { cache } from '@/lib/redis';

// Enable ISR revalidation
export const revalidate = 300; // Revalidate every 5 minutes

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit')) || 20;
    const featured = searchParams.get('featured') === 'true';
    const category = searchParams.get('category');
    
    // Create cache key based on query params
    const cacheKey = `products:${limit}:${featured}:${category || 'all'}`;
    
    // Try to get from cache first
    const cachedProducts = await cache.get(cacheKey);
    if (cachedProducts) {
      console.log('✅ Cache HIT:', cacheKey);
      return NextResponse.json(
        {
          success: true,
          count: cachedProducts.length,
          products: cachedProducts,
          cached: true
        },
        {
          headers: {
            'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
            'X-Cache': 'HIT'
          }
        }
      );
    }
    
    console.log('❌ Cache MISS:', cacheKey);
    
    // If not in cache, fetch from database
    await connectMongoDB();

    let query = { status: 'active' };
    
    if (featured) {
      query.tags = 'featured';
    }
    
    if (category) {
      query.category = category;
    }

    const products = await Product.find(query)
      .sort({ createdAt: -1 })
      .limit(limit)
      .select('-__v') // Exclude version key
      .lean(); // Convert to plain JS objects for better performance

    const plainProducts = products.map(product => ({
      ...product,
      _id: product._id.toString(),
      specifications: product.specifications || {}
    }));

    // Store in cache for 1 hour (3600 seconds)
    await cache.set(cacheKey, plainProducts, 3600);

    return NextResponse.json(
      {
        success: true,
        count: plainProducts.length,
        products: plainProducts,
        cached: false
      },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
          'X-Cache': 'MISS'
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

// Invalidate cache when products are updated
export async function POST(request) {
  try {
    // This would be called by your admin panel when products are updated
    await cache.delPattern('products:*');
    
    return NextResponse.json({
      success: true,
      message: 'Product cache cleared'
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}