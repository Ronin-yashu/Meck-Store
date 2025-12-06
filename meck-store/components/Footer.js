"use client"
import React from 'react';
import { Box, Container, Flex, Text, TextField, Button } from '@radix-ui/themes';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube, 
  Mail, 
  Phone, 
  MapPin,
  Send,
  Heart
} from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <Box style={{ background: '#1a1a2e', color: 'white' }}>
      {/* Main Footer */}
      <Box style={{ padding: '64px 0 32px' }}>
        <Container size="4">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '48px'
            }}
          >
            {/* Company Info */}
            <Flex direction="column" gap="4">
              <Text size="7" weight="bold" style={{ color: 'white' }}>
                Meck Store
              </Text>
              <Text size="3" style={{ color: 'rgba(255,255,255,0.7)', lineHeight: '1.7' }}>
                Your one-stop destination for quality products at unbeatable prices. 
                We bring you the best from top brands worldwide.
              </Text>
              
              {/* Social Media */}
              <Flex gap="3" style={{ marginTop: '16px' }}>
                <motion.a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.9 }}
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    border: '1px solid rgba(255,255,255,0.2)'
                  }}
                >
                  <Facebook size={20} />
                </motion.a>

                <motion.a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.9 }}
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    border: '1px solid rgba(255,255,255,0.2)'
                  }}
                >
                  <Twitter size={20} />
                </motion.a>

                <motion.a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.9 }}
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    border: '1px solid rgba(255,255,255,0.2)'
                  }}
                >
                  <Instagram size={20} />
                </motion.a>

                <motion.a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.9 }}
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    border: '1px solid rgba(255,255,255,0.2)'
                  }}
                >
                  <Youtube size={20} />
                </motion.a>
              </Flex>
            </Flex>

            {/* Quick Links */}
            <Flex direction="column" gap="4">
              <Text size="5" weight="bold" style={{ color: 'white' }}>
                Quick Links
              </Text>
              <Flex direction="column" gap="3">
                {['About Us', 'Contact Us', 'Shop', 'Track Order', 'Careers', 'Blog'].map((link) => (
                  <Link key={link} href={`/${link.toLowerCase().replace(/\s+/g, '-')}`}>
                    <motion.div
                      whileHover={{ x: 5 }}
                      style={{ cursor: 'pointer' }}
                    >
                      <Text size="3" style={{ color: 'rgba(255,255,255,0.7)' }}>
                        {link}
                      </Text>
                    </motion.div>
                  </Link>
                ))}
              </Flex>
            </Flex>

            {/* Customer Service */}
            <Flex direction="column" gap="4">
              <Text size="5" weight="bold" style={{ color: 'white' }}>
                Customer Service
              </Text>
              <Flex direction="column" gap="3">
                {['Help Center', 'Returns', 'Shipping Info', 'Payment Methods', 'Terms & Conditions', 'Privacy Policy'].map((link) => (
                  <Link key={link} href={`/${link.toLowerCase().replace(/\s+/g, '-')}`}>
                    <motion.div
                      whileHover={{ x: 5 }}
                      style={{ cursor: 'pointer' }}
                    >
                      <Text size="3" style={{ color: 'rgba(255,255,255,0.7)' }}>
                        {link}
                      </Text>
                    </motion.div>
                  </Link>
                ))}
              </Flex>
            </Flex>

            {/* Contact Info */}
            <Flex direction="column" gap="4">
              <Text size="5" weight="bold" style={{ color: 'white' }}>
                Contact Us
              </Text>
              <Flex direction="column" gap="3">
                <Flex align="start" gap="3">
                  <MapPin size={20} style={{ marginTop: '2px', flexShrink: 0 }} />
                  <Text size="3" style={{ color: 'rgba(255,255,255,0.7)', lineHeight: '1.6' }}>
                    123 Shopping Street, Mumbai, Maharashtra 400001, India
                  </Text>
                </Flex>

                <Flex align="center" gap="3">
                  <Phone size={20} style={{ flexShrink: 0 }} />
                  <Text size="3" style={{ color: 'rgba(255,255,255,0.7)' }}>
                    +91 98765 43210
                  </Text>
                </Flex>

                <Flex align="center" gap="3">
                  <Mail size={20} style={{ flexShrink: 0 }} />
                  <Text size="3" style={{ color: 'rgba(255,255,255,0.7)' }}>
                    support@meckstore.com
                  </Text>
                </Flex>
              </Flex>

              {/* Mini Newsletter */}
              <Box style={{ marginTop: '16px' }}>
                <Text size="3" weight="bold" style={{ marginBottom: '12px', display: 'block' }}>
                  Subscribe to Newsletter
                </Text>
                <Flex gap="2">
                  <TextField.Root
                    size="2"
                    placeholder="Your email"
                    type="email"
                    style={{
                      flex: 1,
                      background: 'rgba(255,255,255,0.1)',
                      border: '1px solid rgba(255,255,255,0.2)',
                      color: 'white'
                    }}
                  />
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      size="2"
                      style={{
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        border: 'none',
                        cursor: 'pointer'
                      }}
                    >
                      <Send size={16} />
                    </Button>
                  </motion.div>
                </Flex>
              </Box>
            </Flex>
          </div>
        </Container>
      </Box>

      {/* Payment Methods */}
      <Box style={{ borderTop: '1px solid rgba(255,255,255,0.1)', padding: '24px 0' }}>
        <Container size="4">
          <Flex direction="column" align="center" gap="4">
            <Text size="3" weight="bold">We Accept</Text>
            <Flex gap="4" wrap="wrap" justify="center">
              {['💳 Visa', '💳 Mastercard', '💰 PayPal', '📱 UPI', '💵 COD', '💻 Net Banking'].map((method) => (
                <motion.div
                  key={method}
                  whileHover={{ scale: 1.1 }}
                  style={{
                    padding: '8px 16px',
                    background: 'rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                    border: '1px solid rgba(255,255,255,0.2)',
                    cursor: 'pointer'
                  }}
                >
                  <Text size="2">{method}</Text>
                </motion.div>
              ))}
            </Flex>
          </Flex>
        </Container>
      </Box>

      {/* Bottom Bar */}
      <Box style={{ borderTop: '1px solid rgba(255,255,255,0.1)', padding: '24px 0' }}>
        <Container size="4">
          <Flex 
            direction={{ initial: 'column', sm: 'row' }} 
            justify="between" 
            align="center" 
            gap="4"
          >
            <Text size="2" style={{ color: 'rgba(255,255,255,0.6)', textAlign: 'center' }}>
              © 2025 Meck Store. All rights reserved.
            </Text>
            
            <Flex align="center" gap="2">
              <Text size="2" style={{ color: 'rgba(255,255,255,0.6)' }}>
                Made with
              </Text>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <Heart size={16} fill="#ef4444" color="#ef4444" />
              </motion.div>
              <Text size="2" style={{ color: 'rgba(255,255,255,0.6)' }}>
                in India
              </Text>
            </Flex>
          </Flex>
        </Container>
      </Box>
    </Box>
  );
};

export default Footer;
