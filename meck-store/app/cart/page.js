"use client";

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Container, Flex, Text, Button, Card } from '@radix-ui/themes';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  selectCartItems,
  selectCartSubtotal,
  selectCartTax,
  selectCartShipping,
  selectCartTotal,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  clearCart
} from '@/store/slices/cartSlice';

export default function CartPage() {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const subtotal = useSelector(selectCartSubtotal);
  const tax = useSelector(selectCartTax);
  const shipping = useSelector(selectCartShipping);
  const total = useSelector(selectCartTotal);

  if (cartItems.length === 0) {
    return (
      <Box style={{ paddingTop: '100px', paddingBottom: '80px', minHeight: '80vh' }}>
        <Container size="3">
          <Flex direction="column" align="center" justify="center" gap="6" style={{ minHeight: '60vh' }}>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", duration: 0.5 }}
            >
              <ShoppingBag size={80} color="#667eea" strokeWidth={1.5} />
            </motion.div>
            
            <Flex direction="column" align="center" gap="2">
              <Text size="7" weight="bold">Your Cart is Empty</Text>
              <Text size="3" color="gray">Add some products to get started!</Text>
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
                  Continue Shopping
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
          <Text size="8" weight="bold">Shopping Cart</Text>
          <Button
            variant="ghost"
            color="red"
            onClick={() => {
              if (confirm('Clear all items from cart?')) {
                dispatch(clearCart());
              }
            }}
            style={{ cursor: 'pointer' }}
          >
            <Trash2 size={18} />
            Clear Cart
          </Button>
        </Flex>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px' }} className="cart-grid">
          {/* Cart Items */}
          <Box>
            <AnimatePresence>
              {cartItems.map((item, index) => (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.05 }}
                  style={{ marginBottom: '16px' }}
                >
                  <Card>
                    <Flex gap="4" align="start">
                      {/* Product Image */}
                      <Link href={`/product/${item.slug}`}>
                        <Box
                          style={{
                            position: 'relative',
                            width: '120px',
                            height: '120px',
                            borderRadius: '12px',
                            overflow: 'hidden',
                            cursor: 'pointer',
                            flexShrink: 0
                          }}
                        >
                          <Image
                            src={item.images?.[0] || '/placeholder.jpg'}
                            alt={item.name}
                            fill
                            style={{ objectFit: 'cover' }}
                          />
                        </Box>
                      </Link>

                      {/* Product Details */}
                      <Flex direction="column" gap="2" style={{ flex: 1 }}>
                        <Link href={`/product/${item.slug}`}>
                          <Text size="4" weight="bold" style={{ cursor: 'pointer' }}>
                            {item.name}
                          </Text>
                        </Link>
                        
                        <Text size="2" color="gray">{item.brand}</Text>
                        
                        <Flex align="center" gap="2" style={{ marginTop: '8px' }}>
                          <Text size="5" weight="bold" style={{ color: '#667eea' }}>
                            ₹{((item.price * item.quantity) / 100).toLocaleString('en-IN')}
                          </Text>
                          <Text size="2" color="gray">
                            (₹{(item.price / 100).toLocaleString('en-IN')} each)
                          </Text>
                        </Flex>

                        {/* Quantity Controls */}
                        <Flex align="center" gap="3" style={{ marginTop: '12px' }}>
                          <Flex
                            align="center"
                            gap="3"
                            style={{
                              border: '1px solid var(--gray-a5)',
                              borderRadius: '8px',
                              padding: '4px'
                            }}
                          >
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => dispatch(decrementQuantity(item._id))}
                              style={{
                                width: '32px',
                                height: '32px',
                                borderRadius: '4px',
                                border: 'none',
                                background: 'var(--gray-a3)',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                              }}
                            >
                              <Minus size={16} />
                            </motion.button>

                            <Text size="3" weight="bold" style={{ minWidth: '30px', textAlign: 'center' }}>
                              {item.quantity}
                            </Text>

                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => dispatch(incrementQuantity(item._id))}
                              style={{
                                width: '32px',
                                height: '32px',
                                borderRadius: '4px',
                                border: 'none',
                                background: 'var(--gray-a3)',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                              }}
                            >
                              <Plus size={16} />
                            </motion.button>
                          </Flex>

                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => dispatch(removeFromCart(item._id))}
                            style={{
                              padding: '8px 16px',
                              borderRadius: '8px',
                              border: '1px solid #ef4444',
                              background: 'white',
                              color: '#ef4444',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '8px'
                            }}
                          >
                            <Trash2 size={16} />
                            Remove
                          </motion.button>
                        </Flex>
                      </Flex>
                    </Flex>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </Box>

          {/* Order Summary */}
          <Box className="order-summary">
            <Card>
              <Flex direction="column" gap="4">
                <Text size="5" weight="bold">Order Summary</Text>

                <Flex direction="column" gap="3">
                  <Flex justify="between">
                    <Text size="3" color="gray">Subtotal</Text>
                    <Text size="3" weight="bold">
                      ₹{(subtotal / 100).toLocaleString('en-IN')}
                    </Text>
                  </Flex>

                  <Flex justify="between">
                    <Text size="3" color="gray">Tax (18%)</Text>
                    <Text size="3" weight="bold">
                      ₹{(tax / 100).toLocaleString('en-IN')}
                    </Text>
                  </Flex>

                  <Flex justify="between">
                    <Text size="3" color="gray">Shipping</Text>
                    <Text size="3" weight="bold" style={{ color: shipping === 0 ? '#22c55e' : 'inherit' }}>
                      {shipping === 0 ? 'FREE' : `₹${(shipping / 100).toLocaleString('en-IN')}`}
                    </Text>
                  </Flex>

                  {shipping !== 0 && (
                    <Text size="2" style={{ color: '#667eea' }}>
                      Add ₹{((99900 - subtotal) / 100).toLocaleString('en-IN')} more for free shipping
                    </Text>
                  )}

                  <Box style={{ height: '1px', background: 'var(--gray-a5)', margin: '8px 0' }} />

                  <Flex justify="between">
                    <Text size="4" weight="bold">Total</Text>
                    <Text size="6" weight="bold" style={{ color: '#667eea' }}>
                      ₹{(total / 100).toLocaleString('en-IN')}
                    </Text>
                  </Flex>
                </Flex>

                <Link href="/checkout">
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      size="4"
                      style={{
                        width: '100%',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: 'white',
                        border: 'none',
                        cursor: 'pointer',
                        marginTop: '16px'
                      }}
                    >
                      Proceed to Checkout
                      <ArrowRight size={20} />
                    </Button>
                  </motion.div>
                </Link>

                <Link href="/shop">
                  <Button
                    variant="outline"
                    size="3"
                    style={{ width: '100%', cursor: 'pointer' }}
                  >
                    Continue Shopping
                  </Button>
                </Link>
              </Flex>
            </Card>
          </Box>
        </div>
      </Container>

      <style jsx global>{`
        @media (min-width: 1024px) {
          .cart-grid {
            grid-template-columns: 1fr 400px !important;
          }
          .order-summary {
            position: sticky;
            top: 100px;
          }
        }
      `}</style>
    </Box>
  );
}