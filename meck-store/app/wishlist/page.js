"use client";

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Container, Flex, Text, Button } from '@radix-ui/themes';
import { Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  selectWishlistItems,
  removeFromWishlist,
  clearWishlist
} from '@/store/slices/wishlistSlice';
import { addToCart } from '@/store/slices/cartSlice';
import ProductCard from '@/components/ProductCard';
import { toast } from 'react-toastify';

export default function WishlistPage() {
  const dispatch = useDispatch();
  const wishlistItems = useSelector(selectWishlistItems);

  const handleMoveToCart = (product) => {
    dispatch(addToCart(product));
    dispatch(removeFromWishlist(product._id));
    toast.success(`${product.name} moved to cart!`);
  };

  const handleClearWishlist = () => {
    if (confirm('Clear all items from wishlist?')) {
      dispatch(clearWishlist());
      toast.success('Wishlist cleared!');
    }
  };

  if (wishlistItems.length === 0) {
    return (
      <Box style={{ paddingTop: '100px', paddingBottom: '80px', minHeight: '80vh' }}>
        <Container size="3">
          <Flex direction="column" align="center" justify="center" gap="6" style={{ minHeight: '60vh' }}>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", duration: 0.5 }}
            >
              <Heart size={80} color="#667eea" strokeWidth={1.5} />
            </motion.div>
            
            <Flex direction="column" align="center" gap="2">
              <Text size="7" weight="bold">Your Wishlist is Empty</Text>
              <Text size="3" color="gray">Save your favorite products here!</Text>
            </Flex>

            <Link href="/shop">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="4"
                  style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <ShoppingBag size={20} />
                  Browse Products
                  <ArrowRight size={20} />
                </Button>
              </motion.div>
            </Link>
          </Flex>
        </Container>
      </Box>
    );
  }

  return (
    <Box style={{ paddingTop: '100px', paddingBottom: '80px' }}>
      <Container size="4">
        {/* Header */}
        <Flex justify="between" align="center" style={{ marginBottom: '32px' }}>
          <Flex direction="column" gap="2">
            <Text size="8" weight="bold">My Wishlist</Text>
            <Text size="3" color="gray">{wishlistItems.length} items</Text>
          </Flex>
          
          <Button
            variant="ghost"
            color="red"
            onClick={handleClearWishlist}
            style={{ cursor: 'pointer' }}
          >
            <Trash2 size={18} />
            Clear All
          </Button>
        </Flex>

        {/* Wishlist Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '24px'
          }}
        >
          <AnimatePresence>
            {wishlistItems.map((product, index) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.05 }}
                layout
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Bulk Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          style={{ marginTop: '48px' }}
        >
          <Flex
            justify="center"
            gap="4"
            wrap="wrap"
            style={{
              padding: '24px',
              background: 'var(--gray-a2)',
              borderRadius: '16px',
              border: '1px solid var(--gray-a5)'
            }}
          >
            <Button
              size="3"
              variant="outline"
              onClick={() => {
                wishlistItems.forEach(product => {
                  dispatch(addToCart(product));
                });
                dispatch(clearWishlist());
                toast.success('All items moved to cart!');
              }}
              style={{ cursor: 'pointer' }}
            >
              <ShoppingBag size={18} />
              Move All to Cart
            </Button>

            <Link href="/shop">
              <Button
                size="3"
                style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                Continue Shopping
                <ArrowRight size={18} />
              </Button>
            </Link>
          </Flex>
        </motion.div>
      </Container>
    </Box>
  );
}