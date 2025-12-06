"use client"
import React, { useState } from 'react';
import { Box, Container, Flex, Text } from '@radix-ui/themes';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What are the delivery charges?",
      answer: "We offer FREE delivery on all orders above ₹999. For orders below ₹999, a flat delivery charge of ₹49 applies. Express delivery is available at ₹99 for same-day or next-day delivery in select cities."
    },
    {
      question: "How long does delivery take?",
      answer: "Standard delivery takes 3-7 business days depending on your location. Metro cities typically receive orders within 2-3 days. You can track your order in real-time through your account dashboard."
    },
    {
      question: "What is your return policy?",
      answer: "We offer a hassle-free 7-day return policy. Products must be unused, in original packaging with all tags intact. Simply initiate a return request from your account, and we'll arrange a free pickup. Refunds are processed within 5-7 business days."
    },
    {
      question: "Do you offer cash on delivery (COD)?",
      answer: "Yes! Cash on Delivery is available for orders up to ₹50,000. A nominal COD charge of ₹49 applies. Please note that COD might not be available in certain remote areas."
    },
    {
      question: "How do I track my order?",
      answer: "Once your order is shipped, you'll receive a tracking number via email and SMS. You can track your order in the 'My Orders' section of your account or use the tracking link provided in the shipping confirmation."
    },
    {
      question: "Are the products genuine and authentic?",
      answer: "Absolutely! We source all products directly from authorized distributors and brand partners. Every product comes with manufacturer warranty and authenticity guarantee. We have a strict zero-tolerance policy for counterfeit products."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major payment methods including Credit/Debit Cards, Net Banking, UPI (Google Pay, PhonePe, Paytm), Wallets, and Cash on Delivery. All transactions are secured with 256-bit SSL encryption."
    },
    {
      question: "Can I cancel or modify my order?",
      answer: "You can cancel or modify your order within 1 hour of placing it. After that, if the order hasn't been shipped, you can request cancellation by contacting our support team. Once shipped, you can use our return policy after delivery."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <Box style={{ padding: '80px 0', background: 'white' }}>
      <Container size="3">
        {/* Section Header */}
        <Flex direction="column" align="center" gap="4" style={{ marginBottom: '56px' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Flex align="center" gap="3">
              <HelpCircle size={40} color="#667eea" />
              <Text size="8" weight="bold">
                Frequently Asked Questions
              </Text>
            </Flex>
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
              Got questions? We've got answers! Find everything you need to know about shopping with us.
            </Text>
          </motion.div>
        </Flex>

        {/* FAQ List */}
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              style={{ marginBottom: '16px' }}
            >
              <div
                style={{
                  background: openIndex === index ? 'var(--gray-a2)' : 'white',
                  border: '1px solid var(--gray-a5)',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease'
                }}
              >
                {/* Question */}
                <button
                  onClick={() => toggleFAQ(index)}
                  style={{
                    width: '100%',
                    padding: '20px 24px',
                    border: 'none',
                    background: 'transparent',
                    cursor: 'pointer',
                    textAlign: 'left',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '16px'
                  }}
                >
                  <Text size="4" weight="bold" style={{ flex: 1 }}>
                    {faq.question}
                  </Text>
                  
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: openIndex === index 
                        ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
                        : 'var(--gray-a3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}
                  >
                    <ChevronDown 
                      size={20} 
                      color={openIndex === index ? 'white' : 'var(--gray-11)'} 
                    />
                  </motion.div>
                </button>

                {/* Answer */}
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div
                        style={{
                          padding: '0 24px 24px 24px',
                          borderTop: '1px solid var(--gray-a5)'
                        }}
                      >
                        <Text 
                          size="3" 
                          color="gray" 
                          style={{ 
                            lineHeight: '1.7',
                            display: 'block',
                            paddingTop: '16px'
                          }}
                        >
                          {faq.answer}
                        </Text>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Still Have Questions? */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ marginTop: '56px' }}
        >
          <Flex
            direction="column"
            align="center"
            gap="4"
            style={{
              padding: '40px',
              background: 'var(--gray-a2)',
              borderRadius: '16px',
              border: '1px solid var(--gray-a5)'
            }}
          >
            <Text size="5" weight="bold">
              Still have questions?
            </Text>
            <Text size="3" color="gray" style={{ textAlign: 'center', maxWidth: '500px' }}>
              Can't find the answer you're looking for? Our customer support team is here to help you 24/7.
            </Text>
            <Flex gap="3" wrap="wrap" justify="center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  padding: '12px 24px',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}
              >
                Contact Support
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  padding: '12px 24px',
                  background: 'white',
                  color: '#667eea',
                  border: '2px solid #667eea',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}
              >
                Live Chat
              </motion.button>
            </Flex>
          </Flex>
        </motion.div>
      </Container>
    </Box>
  );
};

export default FAQ;
