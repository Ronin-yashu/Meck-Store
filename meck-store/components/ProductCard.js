import React from 'react'
import { Box, Card, Flex, Text } from '@radix-ui/themes';
import { ShoppingCart, Heart, Star } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

const ProductCard = ({ product }) => {
  const discount = product.comparePrice ? Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100): 0;
  return (
    <div>
      <Link href={`/product/${product.slug}`}>
        <motion.div whileHover={{ y: -8 }} transition={{ duration: 0.3 }}>
          <Card className='h-full p-4 rounded-2xl cursor-pointer relative overflow-hidden' size="3">
            {discount > 0 && (
              <Box className='absolute z-20 top-3 left-3 font-bold text-white rounded-2xl p-1.5' style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}>
                {discount}% OFF
              </Box>
            )}
            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={(e) => {e.preventDefault();}} className='absolute z-20 top-3 right-3'>
              <Heart size={18} color="#667eea" />
            </motion.button>
            <Box className='w-full h-60 overflow-hidden relative rounded-2xl'>
              <Image
                src={product.images[0] || '/placeholder-product.jpg'}
                alt={product.name}
                fill
                style={{ objectFit: 'cover' }}
              />
            </Box>
            <Flex direction="column" gap="2">
              <Text size="2" weight="regular" color='gray'>{product.brand}</Text>
              <Text size="4" weight="bold" color='gray'>{product.name}</Text>

              <Flex justify="start" align="center" gap="2">
                <Flex align="center">
                  <Star size="14" fill="#FFA500" color="#FFA500"/>
                  <Text size="2" weight="bold">{product.rating}</Text>
                </Flex>
                <Text size="2" color="gray">{product.reviewCount}</Text>
              </Flex>

              <Flex align="center" gap="2">
                <Text size="5" weight="bold" >₹{(product.price / 100).toLocaleString('en-IN')}</Text>
                {product.comparePrice && (<Text size="3" color='gray' className='line-through'>₹{(product.comparePrice / 100).toLocaleString('en-IN')}</Text>)}
              </Flex>
              
              {product.stock > 0 ? (<Text size="2" color='green'>In Stock</Text>):(<Text size="2" color='red'>Out of Stock</Text>)}

              <motion.button className='flex justify-center items-center gap-2  mt-1.5' whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={(e) => {e.preventDefault();}}>
                <ShoppingCart size={18} />
                Add to Cart
              </motion.button>
            </Flex>
          </Card>
        </motion.div>
      </Link>
    </div>
  )
}

export default ProductCard