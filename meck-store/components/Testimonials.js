"use client"
import React, { useState } from 'react';
import { Box, Container, Flex, Text, Card, Avatar } from '@radix-ui/themes';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Priya Sharma",
      role: "Fashion Enthusiast",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
      rating: 5,
      text: "Amazing shopping experience! The quality of products is outstanding and delivery was super fast. Highly recommend Meck Store to everyone.",
      date: "2 days ago"
    },
    {
      id: 2,
      name: "Rahul Kumar",
      role: "Tech Lover",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
      rating: 5,
      text: "Best online store for electronics! Got my new laptop at an amazing price. Customer service is top-notch and very helpful.",
      date: "1 week ago"
    },
    {
      id: 3,
      name: "Anjali Patel",
      role: "Home Maker",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
      rating: 4,
      text: "Love the variety of home and kitchen products. Everything arrived in perfect condition. Will definitely shop again!",
      date: "2 weeks ago"
    },
    {
      id: 4,
      name: "Vikram Singh",
      role: "Fitness Coach",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
      rating: 5,
      text: "Excellent collection of sports equipment. The quality is amazing and prices are very competitive. Great experience overall!",
      date: "3 weeks ago"
    },
    {
      id: 5,
      name: "Sneha Reddy",
      role: "Student",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
      rating: 5,
      text: "As a student, I appreciate the affordable prices and quality products. The return process was also very smooth. Highly satisfied!",
      date: "1 month ago"
    },
    {
      id: 6,
      name: "Arjun Mehta",
      role: "Business Owner",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150",
      rating: 4,
      text: "Professional service and authentic products. I've been shopping here for months now. Keep up the great work!",
      date: "1 month ago"
    }
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Get 3 testimonials to display (current, next, next+1)
  const getVisibleTestimonials = () => {
    const visible = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % testimonials.length;
      visible.push(testimonials[index]);
    }
    return visible;
  };

  return (
    <Box style={{ padding: '80px 0', background: 'white' }}>
      <Container size="4">
        {/* Section Header */}
        <Flex direction="column" align="center" gap="4" style={{ marginBottom: '56px' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Text size="8" weight="bold" style={{ textAlign: 'center' }}>
              What Our Customers Say
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
              Don't just take our word for it - hear from our satisfied customers
            </Text>
          </motion.div>
        </Flex>

        {/* Testimonials Carousel */}
        <Box style={{ position: 'relative' }}>
          {/* Navigation Buttons */}
          <Flex gap="4" justify="center" style={{ marginBottom: '32px' }}>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prevSlide}
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                border: '2px solid var(--gray-a5)',
                background: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }}
            >
              <ChevronLeft size={24} color="#667eea" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={nextSlide}
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                border: '2px solid var(--gray-a5)',
                background: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }}
            >
              <ChevronRight size={24} color="#667eea" />
            </motion.button>
          </Flex>

          {/* Testimonials Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '24px'
            }}
          >
            <AnimatePresence mode="wait">
              {getVisibleTestimonials().map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
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
                        background: 'var(--gray-a2)',
                        height: '100%',
                        position: 'relative',
                        overflow: 'hidden'
                      }}
                    >
                      {/* Quote Icon */}
                      <Box
                        style={{
                          position: 'absolute',
                          top: '16px',
                          right: '16px',
                          opacity: 0.1
                        }}
                      >
                        <Quote size={60} />
                      </Box>

                      <Flex direction="column" gap="4">
                        {/* Rating */}
                        <Flex gap="1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={18}
                              fill={i < testimonial.rating ? "#FFA500" : "none"}
                              color={i < testimonial.rating ? "#FFA500" : "#ccc"}
                            />
                          ))}
                        </Flex>

                        {/* Review Text */}
                        <Text size="3" style={{ lineHeight: '1.7', color: 'var(--gray-12)' }}>
                          "{testimonial.text}"
                        </Text>

                        {/* Divider */}
                        <Box style={{ height: '1px', background: 'var(--gray-a5)', margin: '8px 0' }} />

                        {/* Customer Info */}
                        <Flex gap="3" align="center">
                          <Avatar
                            src={testimonial.avatar}
                            fallback={testimonial.name[0]}
                            size="3"
                            radius="full"
                          />
                          <Flex direction="column" gap="1">
                            <Text size="3" weight="bold">
                              {testimonial.name}
                            </Text>
                            <Text size="2" color="gray">
                              {testimonial.role}
                            </Text>
                          </Flex>
                        </Flex>

                        {/* Date */}
                        <Text size="1" color="gray" style={{ marginTop: '8px' }}>
                          {testimonial.date}
                        </Text>
                      </Flex>
                    </Card>
                  </motion.div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Dots Indicator */}
          <Flex gap="2" justify="center" style={{ marginTop: '32px' }}>
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.2 }}
                onClick={() => setCurrentIndex(index)}
                style={{
                  width: currentIndex === index ? '32px' : '8px',
                  height: '8px',
                  borderRadius: '4px',
                  border: 'none',
                  background: currentIndex === index 
                    ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
                    : 'var(--gray-a5)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              />
            ))}
          </Flex>
        </Box>

        {/* Trust Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ marginTop: '56px' }}
        >
          <Flex
            gap="6"
            justify="center"
            align="center"
            wrap="wrap"
            style={{
              padding: '24px',
              borderRadius: '12px',
              background: 'var(--gray-a2)',
              border: '1px solid var(--gray-a5)'
            }}
          >
            <Flex align="center" gap="2">
              <Text size="6">⭐</Text>
              <Flex direction="column">
                <Text size="2" weight="bold">4.9/5.0</Text>
                <Text size="1" color="gray">Average Rating</Text>
              </Flex>
            </Flex>

            <Box style={{ width: '1px', height: '40px', background: 'var(--gray-a5)' }} />

            <Flex align="center" gap="2">
              <Text size="6">💬</Text>
              <Flex direction="column">
                <Text size="2" weight="bold">10,000+</Text>
                <Text size="1" color="gray">Happy Reviews</Text>
              </Flex>
            </Flex>

            <Box style={{ width: '1px', height: '40px', background: 'var(--gray-a5)' }} />

            <Flex align="center" gap="2">
              <Text size="6">🏆</Text>
              <Flex direction="column">
                <Text size="2" weight="bold">98%</Text>
                <Text size="1" color="gray">Satisfaction Rate</Text>
              </Flex>
            </Flex>
          </Flex>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Testimonials;
