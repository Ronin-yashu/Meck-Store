"use client"
import React from 'react';
import { Box, Container, Flex, Text } from '@radix-ui/themes';
import { motion } from 'framer-motion';
import Image from 'next/image';

const Brands = () => {
  const brands = [
    {
      name: "Apple",
      logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
    },
    {
      name: "Samsung",
      logo: "https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg",
    },
    {
      name: "Sony",
      logo: "https://upload.wikimedia.org/wikipedia/commons/c/ca/Sony_logo.svg",
    },
    {
      name: "LG",
      logo: "https://upload.wikimedia.org/wikipedia/commons/b/bf/LG_logo_%282015%29.svg",
    },
    {
      name: "Dell",
      logo: "https://upload.wikimedia.org/wikipedia/commons/4/48/Dell_Logo.svg",
    },
    {
      name: "HP",
      logo: "https://upload.wikimedia.org/wikipedia/commons/a/ad/HP_logo_2012.svg",
    },
    {
      name: "Nike",
      logo: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg",
    },
    {
      name: "Adidas",
      logo: "https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg",
    },
    {
      name: "Canon",
      logo: "https://upload.wikimedia.org/wikipedia/commons/4/4d/Canon_wordmark.svg",
    },
    {
      name: "Nikon",
      logo: "https://upload.wikimedia.org/wikipedia/commons/8/8a/Nikon_Logo.svg",
    },
    {
      name: "Asus",
      logo: "https://upload.wikimedia.org/wikipedia/commons/2/2e/ASUS_Logo.svg",
    },
    {
      name: "Lenovo",
      logo: "https://upload.wikimedia.org/wikipedia/commons/a/a0/Lenovo_logo_2015.svg",
    },
    {
      name: "Microsoft",
      logo: "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg",
    },
    {
      name: "Intel",
      logo: "https://upload.wikimedia.org/wikipedia/commons/7/7d/Intel_logo_%282006-2020%29.svg",
    },
    {
      name: "AMD",
      logo: "https://upload.wikimedia.org/wikipedia/commons/7/7c/AMD_Logo.svg",
    },
    {
      name: "Nvidia",
      logo: "https://upload.wikimedia.org/wikipedia/commons/a/a4/NVIDIA_logo.svg",
    },
    {
      name: "Logitech",
      logo: "https://upload.wikimedia.org/wikipedia/commons/1/1e/Logitech_logo.svg",
    },
    {
      name: "Panasonic",
      logo: "https://upload.wikimedia.org/wikipedia/commons/5/55/Panasonic_logo_%28Blue%29.svg",
    },
    {
      name: "Philips",
      logo: "https://upload.wikimedia.org/wikipedia/commons/5/52/Philips_logo_new.svg",
    },
    {
      name: "Xiaomi",
      logo: "https://upload.wikimedia.org/wikipedia/commons/a/ae/Xiaomi_logo_%282021-%29.svg",
    },
    {
      name: "OnePlus",
      logo: "https://upload.wikimedia.org/wikipedia/commons/4/42/OnePlus_logo.svg",
    },
    {
      name: "Realme",
      logo: "https://upload.wikimedia.org/wikipedia/commons/9/91/Realme_logo.svg",
    },
    {
      name: "Oppo",
      logo: "https://upload.wikimedia.org/wikipedia/commons/8/89/OPPO_LOGO_2019.svg",
    },
    {
      name: "Vivo",
      logo: "https://upload.wikimedia.org/wikipedia/commons/4/48/Vivo_logo_2019.svg",
    },
    {
      name: "Motorola",
      logo: "https://upload.wikimedia.org/wikipedia/commons/9/98/Motorola_logo.svg",
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
              Trusted Brands We Work With
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
              We partner with world's leading brands to bring you authentic products
            </Text>
          </motion.div>
        </Flex>

        {/* Brands Grid - 5x5 */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: '24px'
          }}
          className="brands-grid"
        >
          {brands.map((brand, index) => (
            <motion.div
              key={brand.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.03 }}
            >
              <motion.div
                whileHover={{ scale: 1.1, y: -5 }}
                transition={{ duration: 0.3 }}
                style={{
                  background: 'white',
                  padding: '24px',
                  borderRadius: '16px',
                  border: '1px solid var(--gray-a5)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '100px',
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
                }}
              >
                <div
                  style={{
                    position: 'relative',
                    width: '100px',
                    height: '50px',
                    filter: 'grayscale(100%)',
                    opacity: 0.7,
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.filter = 'grayscale(0%)';
                    e.currentTarget.style.opacity = '1';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.filter = 'grayscale(100%)';
                    e.currentTarget.style.opacity = '0.7';
                  }}
                >
                  <Image
                    src={brand.logo}
                    alt={brand.name}
                    fill
                    style={{ objectFit: 'contain' }}
                  />
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Trust Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ marginTop: '56px' }}
        >
          <Flex
            gap="8"
            wrap="wrap"
            justify="center"
            align="center"
            style={{
              padding: '32px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: '16px',
              color: 'white'
            }}
          >
            <Flex direction="column" align="center" gap="1">
              <Text size="7" weight="bold">100%</Text>
              <Text size="2">Authentic Products</Text>
            </Flex>

            <Box style={{ width: '1px', height: '40px', background: 'rgba(255,255,255,0.3)' }} className="hidden sm:block" />

            <Flex direction="column" align="center" gap="1">
              <Text size="7" weight="bold">50+</Text>
              <Text size="2">Global Brands</Text>
            </Flex>

            <Box style={{ width: '1px', height: '40px', background: 'rgba(255,255,255,0.3)' }} className="hidden sm:block" />

            <Flex direction="column" align="center" gap="1">
              <Text size="7" weight="bold">1M+</Text>
              <Text size="2">Products Sold</Text>
            </Flex>
          </Flex>
        </motion.div>
      </Container>

      {/* Responsive CSS */}
      <style jsx>{`
        @media (max-width: 1024px) {
          .brands-grid {
            grid-template-columns: repeat(4, 1fr) !important;
          }
        }
        @media (max-width: 768px) {
          .brands-grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
        @media (max-width: 480px) {
          .brands-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </Box>
  );
};

export default Brands;
