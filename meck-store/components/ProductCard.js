"use client";

import React from 'react';
import { Box, Card, Flex, Text, Badge } from '@radix-ui/themes';
import { ShoppingCart, Heart, Star, Check } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, selectIsInCart } from '@/store/slices/cartSlice';
import { toggleWishlist, selectIsInWishlist } from '@/store/slices/wishlistSlice';
import { toast } from 'react-toastify';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const isInCart = useSelector(selectIsInCart(product._id));
  const isInWishlist = useSelector(selectIsInWishlist(product._id));
  
  const discount = product.comparePrice 
    ? Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)
    : 0;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (product.stock === 0) {
      toast.error('Product is out of stock');
      return;
    }
    
    dispatch(addToCart(product));
    toast.success(`${product.name} added to cart!`, {
      position: "bottom-right",
      autoClose: 2000,
    });
  };

  const handleToggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    dispatch(toggleWishlist(product));
    
    if (isInWishlist) {
      toast.info(`${product.name} removed from wishlist`, {
        position: "bottom-right",
        autoClose: 2000,
      });
    } else {
      toast.success(`${product.name} added to wishlist!`, {
        position: "bottom-right",
        autoClose: 2000,
      });
    }
  };

  return (
    <Link href={`/product/${product.slug}`}>
      <motion.div 
        whileHover={{ y: -8 }} 
        transition={{ duration: 0.3 }}
        style={{ height: '100%' }}
      >
        <Card className='h-full p-4 rounded-2xl cursor-pointer relative overflow-hidden' size="3">
          {/* Discount Badge */}
          {discount > 0 && (
            <Box 
              className='absolute z-20 top-3 left-3 font-bold text-white rounded-2xl p-1.5' 
              style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
            >
              <Text size="2" weight="bold">{discount}% OFF</Text>
            </Box>
          )}

          {/* Wishlist Button */}
          <motion.button 
            whileHover={{ scale: 1.1 }} 
            whileTap={{ scale: 0.9 }} 
            onClick={handleToggleWishlist}
            className='absolute z-20 top-3 right-3'
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              border: 'none',
              background: 'white',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <Heart 
              size={18} 
              color="#667eea" 
              fill={isInWishlist ? "#667eea" : "none"}
            />
          </motion.button>

          {/* Product Image */}
          <Box className='w-full h-60 overflow-hidden relative rounded-2xl'>
            <Image
              src={product.images[0] || '/placeholder-product.jpg'}
              alt={product.name}
              fill
              style={{ objectFit: 'cover' }}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </Box>

          <Flex direction="column" gap="2" style={{ marginTop: '16px' }}>
            {/* Brand */}
            <Text size="2" weight="regular" color='gray'>{product.brand}</Text>
            
            {/* Product Name */}
            <Text size="4" weight="bold" color='gray' style={{ 
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              minHeight: '48px'
            }}>
              {product.name}
            </Text>

            {/* Rating */}
            <Flex justify="start" align="center" gap="2">
              <Flex align="center" gap="1">
                <Star size="14" fill="#FFA500" color="#FFA500"/>
                <Text size="2" weight="bold">{product.rating}</Text>
              </Flex>
              <Text size="2" color="gray">({product.reviewCount})</Text>
            </Flex>

            {/* Price */}
            <Flex align="center" gap="2" wrap="wrap">
              <Text size="5" weight="bold">₹{(product.price / 100).toLocaleString('en-IN')}</Text>
              {product.comparePrice && (
                <Text size="3" color='gray' className='line-through'>
                  ₹{(product.comparePrice / 100).toLocaleString('en-IN')}
                </Text>
              )}
            </Flex>
            
            {/* Stock Status */}
            {product.stock > 0 ? (
              <Flex align="center" gap="1">
                <Check size={14} color="#22c55e" />
                <Text size="2" style={{ color: '#22c55e' }}>In Stock</Text>
              </Flex>
            ) : (
              <Text size="2" style={{ color: '#ef4444' }}>Out of Stock</Text>
            )}

            {/* Add to Cart Button */}
            <motion.button 
              className='flex justify-center items-center gap-2 mt-2' 
              whileHover={{ scale: 1.02 }} 
              whileTap={{ scale: 0.98 }} 
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              style={{
                padding: '12px',
                borderRadius: '8px',
                border: 'none',
                background: isInCart 
                  ? '#22c55e' 
                  : product.stock === 0 
                  ? '#d1d5db'
                  : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                fontWeight: 'bold',
                cursor: product.stock === 0 ? 'not-allowed' : 'pointer',
                opacity: product.stock === 0 ? 0.6 : 1,
                width: '100%'
              }}
            >
              {isInCart ? (
                <>
                  <Check size={18} />
                  In Cart
                </>
              ) : (
                <>
                  <ShoppingCart size={18} />
                  {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                </>
              )}
            </motion.button>
          </Flex>
        </Card>
      </motion.div>
    </Link>
  );
};

export default ProductCard;