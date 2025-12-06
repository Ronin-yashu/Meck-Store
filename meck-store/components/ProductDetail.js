"use client"
import React, { useState } from 'react';
import { Box, Container, Flex, Text, Button, Badge } from '@radix-ui/themes';
import { 
  ShoppingCart, 
  Heart, 
  Share2, 
  Truck, 
  Shield, 
  RefreshCw,
  Star,
  Minus,
  Plus,
  Check
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import ProductCard from './ProductCard';

const ProductDetail = ({ product, relatedProducts }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const discount = product.comparePrice 
    ? Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)
    : 0;

  const incrementQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <Box style={{ paddingTop: '100px', paddingBottom: '80px' }}>
      <Container size="4">
        {/* Breadcrumb */}
        <Flex gap="2" align="center" style={{ marginBottom: '32px', color: 'var(--gray-11)' }}>
          <Link href="/">
            <Text size="2" style={{ cursor: 'pointer' }}>Home</Text>
          </Link>
          <Text size="2">/</Text>
          <Link href="/shop">
            <Text size="2" style={{ cursor: 'pointer' }}>Shop</Text>
          </Link>
          <Text size="2">/</Text>
          <Link href={`/shop?category=${product.category.toLowerCase()}`}>
            <Text size="2" style={{ cursor: 'pointer' }}>{product.category}</Text>
          </Link>
          <Text size="2">/</Text>
          <Text size="2" weight="bold">{product.name}</Text>
        </Flex>

        {/* Product Main Section */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
            gap: '48px',
            marginBottom: '80px'
          }}
        >
          {/* Image Gallery */}
          <Box>
            {/* Main Image */}
            <motion.div
              key={selectedImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              style={{
                position: 'relative',
                width: '100%',
                height: '500px',
                borderRadius: '16px',
                overflow: 'hidden',
                border: '1px solid var(--gray-a5)',
                background: 'var(--gray-a2)',
                marginBottom: '16px'
              }}
            >
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                fill
                style={{ objectFit: 'cover' }}
                priority
              />

              {/* Discount Badge */}
              {discount > 0 && (
                <Box
                  style={{
                    position: 'absolute',
                    top: '16px',
                    left: '16px',
                    background: '#ef4444',
                    color: 'white',
                    padding: '8px 16px',
                    borderRadius: '20px',
                    fontSize: '14px',
                    fontWeight: 'bold'
                  }}
                >
                  {discount}% OFF
                </Box>
              )}
            </motion.div>

            {/* Thumbnail Images */}
            <Flex gap="3" wrap="wrap">
              {product.images.map((image, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setSelectedImage(index)}
                  style={{
                    position: 'relative',
                    width: '80px',
                    height: '80px',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    border: selectedImage === index 
                      ? '3px solid #667eea' 
                      : '1px solid var(--gray-a5)',
                    cursor: 'pointer',
                    background: 'var(--gray-a2)'
                  }}
                >
                  <Image
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </motion.div>
              ))}
            </Flex>
          </Box>

          {/* Product Info */}
          <Flex direction="column" gap="4">
            {/* Brand */}
            <Badge size="2" color="blue" style={{ width: 'fit-content' }}>
              {product.brand}
            </Badge>

            {/* Product Name */}
            <Text size="8" weight="bold" style={{ lineHeight: '1.2' }}>
              {product.name}
            </Text>

            {/* Rating */}
            <Flex align="center" gap="3">
              <Flex align="center" gap="1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    fill={i < Math.floor(product.rating) ? "#FFA500" : "none"}
                    color={i < Math.floor(product.rating) ? "#FFA500" : "#ccc"}
                  />
                ))}
              </Flex>
              <Text size="3" weight="bold">{product.rating}</Text>
              <Text size="2" color="gray">({product.reviewCount} reviews)</Text>
            </Flex>

            {/* Price */}
            <Flex align="center" gap="3" style={{ marginTop: '8px' }}>
              <Text size="8" weight="bold" style={{ color: '#667eea' }}>
                ₹{(product.price / 100).toLocaleString('en-IN')}
              </Text>
              {product.comparePrice && (
                <>
                  <Text
                    size="5"
                    color="gray"
                    style={{ textDecoration: 'line-through' }}
                  >
                    ₹{(product.comparePrice / 100).toLocaleString('en-IN')}
                  </Text>
                  <Text size="4" weight="bold" style={{ color: '#22c55e' }}>
                    Save ₹{((product.comparePrice - product.price) / 100).toLocaleString('en-IN')}
                  </Text>
                </>
              )}
            </Flex>

            {/* Stock Status */}
            <Flex align="center" gap="2">
              {product.stock > 0 ? (
                <>
                  <Check size={18} color="#22c55e" />
                  <Text size="3" style={{ color: '#22c55e' }}>
                    In Stock ({product.stock} available)
                  </Text>
                </>
              ) : (
                <Text size="3" style={{ color: '#ef4444' }}>
                  Out of Stock
                </Text>
              )}
            </Flex>

            {/* Short Description */}
            <Text size="3" color="gray" style={{ lineHeight: '1.7' }}>
              {product.shortDescription}
            </Text>

            {/* Divider */}
            <Box style={{ height: '1px', background: 'var(--gray-a5)', margin: '8px 0' }} />

            {/* Quantity Selector */}
            <Flex direction="column" gap="2">
              <Text size="3" weight="bold">Quantity</Text>
              <Flex align="center" gap="3">
                <Flex
                  align="center"
                  gap="3"
                  style={{
                    border: '1px solid var(--gray-a5)',
                    borderRadius: '8px',
                    padding: '8px'
                  }}
                >
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={decrementQuantity}
                    disabled={quantity <= 1}
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '4px',
                      border: 'none',
                      background: quantity <= 1 ? 'var(--gray-a3)' : 'var(--gray-a5)',
                      cursor: quantity <= 1 ? 'not-allowed' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Minus size={16} />
                  </motion.button>

                  <Text size="4" weight="bold" style={{ minWidth: '30px', textAlign: 'center' }}>
                    {quantity}
                  </Text>

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={incrementQuantity}
                    disabled={quantity >= product.stock}
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '4px',
                      border: 'none',
                      background: quantity >= product.stock ? 'var(--gray-a3)' : 'var(--gray-a5)',
                      cursor: quantity >= product.stock ? 'not-allowed' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Plus size={16} />
                  </motion.button>
                </Flex>
              </Flex>
            </Flex>

            {/* Action Buttons */}
            <Flex gap="3" style={{ marginTop: '16px' }}>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} style={{ flex: 1 }}>
                <Button
                  size="4"
                  disabled={product.stock === 0}
                  style={{
                    width: '100%',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    fontSize: '16px',
                    padding: '20px',
                    cursor: product.stock === 0 ? 'not-allowed' : 'pointer',
                    border: 'none',
                    opacity: product.stock === 0 ? 0.5 : 1
                  }}
                >
                  <ShoppingCart size={20} />
                  Add to Cart
                </Button>
              </motion.div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '8px',
                  border: '2px solid #667eea',
                  background: 'white',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Heart size={24} color="#667eea" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '8px',
                  border: '2px solid var(--gray-a5)',
                  background: 'white',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Share2 size={24} />
              </motion.button>
            </Flex>

            {/* Features */}
            <Flex direction="column" gap="3" style={{ marginTop: '24px' }}>
              <Flex align="center" gap="3">
                <Truck size={20} color="#667eea" />
                <Text size="3">Free delivery on orders above ₹999</Text>
              </Flex>
              <Flex align="center" gap="3">
                <Shield size={20} color="#667eea" />
                <Text size="3">100% Authentic Products</Text>
              </Flex>
              <Flex align="center" gap="3">
                <RefreshCw size={20} color="#667eea" />
                <Text size="3">7-day Easy Returns</Text>
              </Flex>
            </Flex>
          </Flex>
        </div>

        {/* Product Details Tabs */}
        <Box style={{ marginBottom: '80px' }}>
          <Box
            style={{
              background: 'var(--gray-a2)',
              borderRadius: '16px',
              padding: '32px',
              border: '1px solid var(--gray-a5)'
            }}
          >
            {/* Description */}
            <Flex direction="column" gap="3" style={{ marginBottom: '32px' }}>
              <Text size="6" weight="bold">Product Description</Text>
              <Text size="3" color="gray" style={{ lineHeight: '1.8' }}>
                {product.description}
              </Text>
            </Flex>

            {/* Specifications */}
            {Object.keys(product.specifications).length > 0 && (
              <Flex direction="column" gap="3">
                <Text size="6" weight="bold">Specifications</Text>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <Flex key={key} justify="between" style={{ padding: '12px', background: 'white', borderRadius: '8px' }}>
                      <Text size="3" weight="bold" style={{ textTransform: 'capitalize' }}>{key}:</Text>
                      <Text size="3" color="gray">{value}</Text>
                    </Flex>
                  ))}
                </div>
              </Flex>
            )}
          </Box>
        </Box>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <Box>
            <Text size="7" weight="bold" style={{ marginBottom: '32px', display: 'block' }}>
              Related Products
            </Text>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '24px'
              }}
            >
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct._id} product={relatedProduct} />
              ))}
            </div>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default ProductDetail;
