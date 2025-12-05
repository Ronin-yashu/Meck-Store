"use client"
import React, { useEffect, useState } from 'react';
import { Box, Container, Flex, Text, Button } from '@radix-ui/themes';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import ProductCard from './ProductCard';

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products?limit=8');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      console.log('Fetched products:', data); // Debug log
      
      if (data.success) {
        setProducts(data.products);
      } else {
        setError(data.error || 'Failed to fetch products');
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box style={{ padding: '80px 0', background: 'var(--gray-a2)' }}>
        <Container size="4">
          <Flex justify="center" align="center" style={{ minHeight: '400px' }}>
            <Text size="5">Loading products...</Text>
          </Flex>
        </Container>
      </Box>
    );
  }

  if (error) {
    return (
      <Box style={{ padding: '80px 0', background: 'var(--gray-a2)' }}>
        <Container size="4">
          <Flex direction="column" align="center" gap="4" style={{ minHeight: '400px' }}>
            <Text size="5" color="red">Error loading products</Text>
            <Text size="3" color="gray">{error}</Text>
            <Button onClick={fetchProducts}>Retry</Button>
          </Flex>
        </Container>
      </Box>
    );
  }

  if (products.length === 0) {
    return (
      <Box style={{ padding: '80px 0', background: 'var(--gray-a2)' }}>
        <Container size="4">
          <Flex justify="center" align="center" style={{ minHeight: '400px' }}>
            <Text size="5">No featured products found</Text>
          </Flex>
        </Container>
      </Box>
    );
  }

  return (
    <Box style={{ padding: '80px 0', background: 'var(--gray-a2)' }}>
      <Container size="4">
        {/* Section Header */}
        <Flex direction="column" align="center" gap="4" style={{ marginBottom: '48px' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Text
              size="8"
              weight="bold"
              style={{ textAlign: 'center' }}
            >
              Featured Products
            </Text>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <Text
              size="4"
              color="gray"
              style={{ textAlign: 'center', maxWidth: '600px' }}
            >
              Discover our handpicked selection of premium products
            </Text>
          </motion.div>
        </Flex>

        {/* Products Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '24px',
            marginBottom: '48px'
          }}
        >
          {products.map((product, index) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <Flex justify="center">
          <Link href="/shop">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="4"
                style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  fontSize: '16px',
                  padding: '24px 40px',
                  cursor: 'pointer',
                  border: 'none'
                }}
              >
                View All Products
                <ArrowRight size={20} />
              </Button>
            </motion.div>
          </Link>
        </Flex>
      </Container>
    </Box>
  );
};

export default FeaturedProducts;
