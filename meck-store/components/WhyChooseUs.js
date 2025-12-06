"use client"
import React from 'react';
import { Box, Container, Flex, Text, Card } from '@radix-ui/themes';
import { Truck, Headphones, Shield, CreditCard, Package, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

const WhyChooseUs = () => {
  const features = [
    {
      icon: <Truck size={40} />,
      title: "Free Shipping",
      description: "Free delivery on orders above ₹999",
      color: "#667eea"
    },
    {
      icon: <Headphones size={40} />,
      title: "24/7 Support",
      description: "Dedicated customer support anytime",
      color: "#764ba2"
    },
    {
      icon: <Shield size={40} />,
      title: "Secure Payment",
      description: "100% secure payment processing",
      color: "#f093fb"
    },
    {
      icon: <CreditCard size={40} />,
      title: "Easy Payment",
      description: "Multiple payment options available",
      color: "#4facfe"
    },
    {
      icon: <Package size={40} />,
      title: "Quality Products",
      description: "Authentic products guaranteed",
      color: "#43e97b"
    },
    {
      icon: <RefreshCw size={40} />,
      title: "Easy Returns",
      description: "7-day hassle-free return policy",
      color: "#fa709a"
    }
  ];

  return (
    <Box style={{ padding: '80px 0', background: 'var(--gray-a2)' }}>
      <Container size="4">
        {/* Section Header */}
        <Flex direction="column" align="center" gap="4" style={{ marginBottom: '56px' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Text size="8" weight="bold" style={{ textAlign: 'center' }}>
              Why Choose Us
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
              We provide the best shopping experience with premium services
            </Text>
          </motion.div>
        </Flex>

        {/* Features Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px'
          }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
              >
                <Card
                  style={{
                    padding: '32px',
                    borderRadius: '16px',
                    border: '1px solid var(--gray-a5)',
                    background: 'white',
                    height: '100%',
                    cursor: 'pointer'
                  }}
                >
                  <Flex direction="column" gap="4" align="center" style={{ textAlign: 'center' }}>
                    {/* Icon Container */}
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                      style={{
                        width: '80px',
                        height: '80px',
                        borderRadius: '50%',
                        background: `linear-gradient(135deg, ${feature.color}20 0%, ${feature.color}40 100%)`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: feature.color
                      }}
                    >
                      {feature.icon}
                    </motion.div>

                    {/* Title */}
                    <Text size="5" weight="bold">
                      {feature.title}
                    </Text>

                    {/* Description */}
                    <Text size="3" color="gray" style={{ lineHeight: '1.6' }}>
                      {feature.description}
                    </Text>
                  </Flex>
                </Card>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ marginTop: '64px' }}
        >
          <Flex
            gap="8"
            wrap="wrap"
            justify="center"
            style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: '20px',
              padding: '40px',
              color: 'white'
            }}
          >
            <Flex direction="column" align="center" gap="2" style={{ minWidth: '150px' }}>
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, type: "spring" }}
              >
                <Text size="8" weight="bold">10K+</Text>
              </motion.div>
              <Text size="3">Happy Customers</Text>
            </Flex>

            <Box style={{ width: '1px', background: 'rgba(255,255,255,0.3)', height: '60px' }} className="hidden sm:block" />

            <Flex direction="column" align="center" gap="2" style={{ minWidth: '150px' }}>
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, type: "spring" }}
              >
                <Text size="8" weight="bold">5000+</Text>
              </motion.div>
              <Text size="3">Products</Text>
            </Flex>

            <Box style={{ width: '1px', background: 'rgba(255,255,255,0.3)', height: '60px' }} className="hidden sm:block" />

            <Flex direction="column" align="center" gap="2" style={{ minWidth: '150px' }}>
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, type: "spring" }}
              >
                <Text size="8" weight="bold">⭐ 4.9</Text>
              </motion.div>
              <Text size="3">Average Rating</Text>
            </Flex>

            <Box style={{ width: '1px', background: 'rgba(255,255,255,0.3)', height: '60px' }} className="hidden sm:block" />

            <Flex direction="column" align="center" gap="2" style={{ minWidth: '150px' }}>
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, type: "spring" }}
              >
                <Text size="8" weight="bold">50+</Text>
              </motion.div>
              <Text size="3">Countries</Text>
            </Flex>
          </Flex>
        </motion.div>
      </Container>
    </Box>
  );
};

export default WhyChooseUs;
