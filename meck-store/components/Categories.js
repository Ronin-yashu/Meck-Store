"use client"
import React, { useEffect, useState } from 'react';
import { Box, Container, Flex, Text } from '@radix-ui/themes';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories?limit=8');
      const data = await response.json();
      
      if (data.success) {
        setCategories(data.categories);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box style={{ padding: '80px 0' }}>
        <Container size="4">
          <Text size="5">Loading categories...</Text>
        </Container>
      </Box>
    );
  }

  return (
    <Box style={{ padding: '80px 0' }}>
      <Container size="4">
        {/* Section Header */}
        <Flex direction="column" align="center" gap="4" style={{ marginBottom: '48px' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Text size="8" weight="bold" style={{ textAlign: 'center' }}>
              Shop by Category
            </Text>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <Text size="4" color="gray" style={{ textAlign: 'center', maxWidth: '600px' }}>
              Browse through our diverse collection of products
            </Text>
          </motion.div>
        </Flex>

        {/* Categories Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: '24px'
          }}
        >
          {categories.map((category, index) => (
            <motion.div
              key={category._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={`/shop?category=${category.slug}`}>
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    position: 'relative',
                    height: '280px',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    border: '1px solid var(--gray-a5)',
                    background: 'var(--gray-a2)'
                  }}
                >
                  {/* Category Image */}
                  <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      style={{ objectFit: 'cover' }}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    
                    {/* Gradient Overlay */}
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.7) 100%)'
                      }}
                    />
                  </div>

                  {/* Category Info */}
                  <Flex
                    direction="column"
                    gap="2"
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      padding: '20px',
                      color: 'white'
                    }}
                  >
                    {/* Icon */}
                    <Text size="6" style={{ fontSize: '2rem' }}>
                      {category.icon}
                    </Text>

                    {/* Name */}
                    <Text size="5" weight="bold" style={{ color: 'white' }}>
                      {category.name}
                    </Text>

                    {/* Product Count */}
                    <Flex align="center" gap="2" style={{ color: 'rgba(255,255,255,0.8)' }}>
                      <Text size="2">
                        {category.productCount} Products
                      </Text>
                      <ArrowRight size={16} />
                    </Flex>
                  </Flex>

                  {/* Hover Effect */}
                  <motion.div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'rgba(102, 126, 234, 0.2)',
                      opacity: 0
                    }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </Container>
    </Box>
  );
};

export default Categories;
