import { NextResponse } from 'next/server';
import connectMongoDB from '@/lib/mongodb';
import Product from '@/models/Product';

export async function GET(request) {
  try {
    await connectMongoDB();

    const { searchParams } = new URL(request.url);
    
    // Get query parameters
    const category = searchParams.get('category');
    const brand = searchParams.get('brand');
    const minPrice = parseInt(searchParams.get('minPrice')) || 0;
    const maxPrice = parseInt(searchParams.get('maxPrice')) || 1000000;
    const sort = searchParams.get('sort') || 'newest';
    const search = searchParams.get('search') || '';
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 12;

    // Build query
    let query = { status: 'active' };

    if (category) {
      query.category = category;
    }

    if (brand) {
      query.brand = brand;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { brand: { $regex: search, $options: 'i' } }
      ];
    }

    query.price = { $gte: minPrice, $lte: maxPrice };

    // Determine sort order
    let sortOption = {};
    switch (sort) {
      case 'price-low':
        sortOption = { price: 1 };
        break;
      case 'price-high':
        sortOption = { price: -1 };
        break;
      case 'rating':
        sortOption = { rating: -1 };
        break;
      case 'name':
        sortOption = { name: 1 };
        break;
      case 'newest':
      default:
        sortOption = { createdAt: -1 };
        break;
    }

    // Get total count for pagination
    const totalProducts = await Product.countDocuments(query);

    // Fetch products
    const products = await Product.find(query)
      .sort(sortOption)
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    const plainProducts = products.map(product => ({
      ...product,
      _id: product._id.toString(),
      specifications: product.specifications || {}
    }));

    // Get unique categories and brands for filters
    const categories = await Product.distinct('category', { status: 'active' });
    const brands = await Product.distinct('brand', { status: 'active' });

    return NextResponse.json({
      success: true,
      products: plainProducts,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalProducts / limit),
        totalProducts,
        limit
      },
      filters: {
        categories: categories.sort(),
        brands: brands.sort()
      }
    });

  } catch (error) {
    console.error('Error fetching shop products:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
