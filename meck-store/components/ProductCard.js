"use client"
import React from 'react';
import { Box, Card, Flex, Text } from '@radix-ui/themes';
import { ShoppingCart, Heart, Star } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

const ProductCard = ({ product }) => {
  const discount = product.comparePrice 
    ? Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)
    : 0;

  return (
    <Link href={`/product/${product.slug}`}>
      <motion.div
        whileHover={{ y: -8 }}
        transition={{ duration: 0.3 }}
      >
        <Card 
          style={{
            padding: '16px',
            borderRadius: '16px',
            border: '1px solid var(--gray-a5)',
            cursor: 'pointer',
            height: '100%',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* Discount Badge */}
          {discount > 0 && (
            <Box
              style={{
                position: 'absolute',
                top: '12px',
                left: '12px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                padding: '4px 10px',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: 'bold',
                zIndex: 2
              }}
            >
              {discount}% OFF
            </Box>
          )}

          {/* Wishlist Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            style={{
              position: 'absolute',
              top: '12px',
              right: '12px',
              background: 'white',
              border: '1px solid var(--gray-a5)',
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              zIndex: 2
            }}
            onClick={(e) => {
              e.preventDefault();
              // Add to wishlist logic
            }}
          >
            <Heart size={18} color="#667eea" />
          </motion.button>

          {/* Product Image */}
          <Box
            style={{
              position: 'relative',
              width: '100%',
              height: '240px',
              marginBottom: '16px',
              borderRadius: '12px',
              overflow: 'hidden',
              background: 'var(--gray-a2)'
            }}
          >
            <Image
              src={product.images[0] || '/placeholder-product.jpg'}
              alt={product.name}
              fill
              style={{ objectFit: 'cover' }}
            />
          </Box>

          {/* Product Info */}
          <Flex direction="column" gap="2">
            {/* Brand */}
            <Text size="2" color="gray" weight="medium">
              {product.brand}
            </Text>

            {/* Product Name */}
            <Text
              size="4"
              weight="bold"
              style={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                lineHeight: '1.4',
                minHeight: '2.8em'
              }}
            >
              {product.name}
            </Text>

            {/* Rating */}
            <Flex align="center" gap="2">
              <Flex align="center" gap="1">
                <Star size={14} fill="#FFA500" color="#FFA500" />
                <Text size="2" weight="bold">
                  {product.rating}
                </Text>
              </Flex>
              <Text size="2" color="gray">
                ({product.reviewCount})
              </Text>
            </Flex>

            {/* Price */}
            <Flex align="center" gap="2" style={{ marginTop: '8px' }}>
              <Text size="5" weight="bold">
                ₹{(product.price / 100).toLocaleString('en-IN')}
              </Text>
              {product.comparePrice && (
                <Text
                  size="3"
                  color="gray"
                  style={{ textDecoration: 'line-through' }}
                >
                  ₹{(product.comparePrice / 100).toLocaleString('en-IN')}
                </Text>
              )}
            </Flex>

            {/* Stock Status */}
            {product.stock > 0 ? (
              <Text size="2" style={{ color: 'green' }}>
                In Stock
              </Text>
            ) : (
              <Text size="2" style={{ color: 'red' }}>
                Out of Stock
              </Text>
            )}

            {/* Add to Cart Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={(e) => {
                e.preventDefault();
                // Add to cart logic
              }}
              style={{
                marginTop: '12px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                padding: '12px',
                fontSize: '14px',
                fontWeight: 'bold',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              <ShoppingCart size={18} />
              Add to Cart
            </motion.button>
          </Flex>
        </Card>
      </motion.div>
    </Link>
  );
};

export default ProductCard;
