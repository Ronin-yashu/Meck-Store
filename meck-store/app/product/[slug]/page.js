import { Suspense } from 'react';
import ProductDetail from '@/components/ProductDetail';
import { notFound } from 'next/navigation';
import connectMongoDB from '@/lib/mongodb';
import Product from '@/models/Product';

// Generate metadata for SEO
export async function generateMetadata({ params }) {
  try {
    const { slug } = await params;
    
    await connectMongoDB();
    const product = await Product.findOne({ slug }).lean();
    
    if (!product) {
      return {
        title: 'Product Not Found - Meck Store',
      };
    }

    return {
      title: `${product.name} - Meck Store`,
      description: product.shortDescription,
    };
  } catch (error) {
    return {
      title: 'Product - Meck Store',
    };
  }
}

// Fetch product data
async function getProduct(slug) {
  try {
    await connectMongoDB();
    const product = await Product.findOne({ slug, status: 'active' }).lean();
    
    if (!product) {
      return null;
    }

    return {
      ...product,
      _id: product._id.toString(),
      specifications: product.specifications || {}
    };
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

// Fetch related products
async function getRelatedProducts(category, currentProductId, limit = 4) {
  try {
    await connectMongoDB();
    const products = await Product.find({
      category,
      status: 'active',
      _id: { $ne: currentProductId }
    })
    .limit(limit)
    .lean();

    return products.map(product => ({
      ...product,
      _id: product._id.toString(),
      specifications: product.specifications || {}
    }));
  } catch (error) {
    console.error('Error fetching related products:', error);
    return [];
  }
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  
  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = await getRelatedProducts(product.category, product._id);

  return (
    <Suspense fallback={<div style={{ minHeight: '80vh' }}>Loading...</div>}>
      <ProductDetail product={product} relatedProducts={relatedProducts} />
    </Suspense>
  );
}
