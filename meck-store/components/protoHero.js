"use client";
import React from 'react'
import { Box, Container, Flex, Text, Button, Heading } from "@radix-ui/themes";
import BlurText from '@/components/ui/shadcn-io/blur-text';
import ScrollVelocity from "@/components/ui/shadcn-io/scroll-velocity";
import { ShoppingBag, ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const Hero = () => {
    return (
        <Box 
            style={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                paddingTop: "80px", // Space for navbar
                position: "relative",
                overflow: "hidden"
            }}
        >
            <Container size="4">
                <Flex 
                    direction="column" 
                    align="center" 
                    justify="center" 
                    gap="8"
                    style={{ textAlign: "center" }}
                >
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <Flex
                            align="center"
                            gap="2"
                            style={{
                                background: "rgba(79, 70, 229, 0.1)",
                                padding: "10px 20px",
                                borderRadius: "30px",
                                border: "1px solid rgba(79, 70, 229, 0.3)",
                                backdropFilter: "blur(10px)"
                            }}
                        >
                            <Sparkles size={16} color="#4F46E5" />
                            <Text size="2" weight="bold" style={{ color: "#4F46E5" }}>
                                New Collection 2025
                            </Text>
                        </Flex>
                    </motion.div>

                    {/* Main Headline with Gradient */}
                    <Box style={{ maxWidth: "900px" }}>
                        <style jsx>{`
                            .gradient-text {
                                background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
                                -webkit-background-clip: text;
                                -webkit-text-fill-color: transparent;
                                background-clip: text;
                                font-size: 4rem;
                                line-height: 1.2;
                            }
                            @media (max-width: 768px) {
                                .gradient-text {
                                    font-size: 2.5rem;
                                }
                            }
                        `}</style>
                        <BlurText
                            text="Welcome to Meck Store"
                            delay={50}
                            animateBy="words"
                            direction="top"
                            className="gradient-text font-bold text-center"
                        />
                    </Box>

                    {/* Subheadline */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                    >
                        <Text 
                            size="5" 
                            style={{ 
                                color: "var(--gray-11)",
                                maxWidth: "600px",
                                lineHeight: "1.6"
                            }}
                        >
                            Discover amazing products at unbeatable prices.
                            <br />
                            <span style={{ 
                                background: "linear-gradient(90deg, #667eea, #764ba2)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                fontWeight: "600"
                            }}>
                                Your perfect shopping experience starts here.
                            </span>
                        </Text>
                    </motion.div>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1 }}
                    >
                        <Flex gap="4" wrap="wrap" justify="center">
                            <Link href="/shop">
                                <motion.div
                                    whileHover={{ scale: 1.05, y: -3 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Button
                                        size="4"
                                        style={{
                                            background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
                                            color: "white",
                                            fontSize: "16px",
                                            padding: "24px 40px",
                                            cursor: "pointer",
                                            boxShadow: "0 4px 20px rgba(102, 126, 234, 0.4)",
                                            border: "none"
                                        }}
                                    >
                                        <ShoppingBag size={20} />
                                        Shop Now
                                        <ArrowRight size={18} />
                                    </Button>
                                </motion.div>
                            </Link>

                            <Link href="/categories">
                                <motion.div
                                    whileHover={{ scale: 1.05, y: -3 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Button
                                        size="4"
                                        variant="outline"
                                        style={{
                                            fontSize: "16px",
                                            padding: "24px 40px",
                                            cursor: "pointer",
                                            borderColor: "#667eea",
                                            color: "#667eea"
                                        }}
                                    >
                                        Browse Categories
                                    </Button>
                                </motion.div>
                            </Link>
                        </Flex>
                    </motion.div>

                    {/* Trust Indicators */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.2 }}
                    >
                        <Flex
                            gap="8"
                            wrap="wrap"
                            justify="center"
                            style={{
                                marginTop: "20px",
                                background: "var(--gray-a2)",
                                borderRadius: "40px",
                                padding: "16px 40px",
                                border: "1px solid var(--gray-a5)"
                            }}
                        >
                            <Flex direction="column" align="center" gap="1">
                                <Text size="5" weight="bold">10K+</Text>
                                <Text size="2" color="gray">Happy Customers</Text>
                            </Flex>
                            <Box style={{ width: "1px", background: "var(--gray-a5)", height: "40px" }} />
                            <Flex direction="column" align="center" gap="1">
                                <Text size="5" weight="bold">5000+</Text>
                                <Text size="2" color="gray">Products</Text>
                            </Flex>
                            <Box style={{ width: "1px", background: "var(--gray-a5)", height: "40px" }} />
                            <Flex direction="column" align="center" gap="1">
                                <Text size="5" weight="bold">⭐ 4.9</Text>
                                <Text size="2" color="gray">Rating</Text>
                            </Flex>
                        </Flex>
                    </motion.div>

                    {/* Scroll Velocity with Gradient & Hidden Scrollbar */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.4 }}
                        style={{ 
                            width: "100%", 
                            marginTop: "40px",
                            overflow: "hidden" // Hide scrollbar
                        }}
                    >
                        <style jsx global>{`
                            /* Hide scrollbar for ScrollVelocity */
                            .scroll-velocity-container {
                                overflow: hidden !important;
                                -ms-overflow-style: none;
                                scrollbar-width: none;
                            }
                            .scroll-velocity-container::-webkit-scrollbar {
                                display: none;
                            }
                            
                            /* Gradient text for ScrollVelocity */
                            .scroll-velocity-text {
                                background: linear-gradient(90deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
                                -webkit-background-clip: text;
                                -webkit-text-fill-color: transparent;
                                background-clip: text;
                                font-weight: 600;
                                font-size: 1.5rem;
                            }
                        `}</style>
                        <div className="scroll-velocity-container">
                            <ScrollVelocity
                                texts={[
                                    'The Amazing World of Shopping ✨',
                                    'Check Out Our Latest Products 🛍️',
                                    'Unbeatable Prices Just for You 💎'
                                ]}
                                velocity={100}
                                className="scroll-velocity-text"
                            />
                        </div>
                    </motion.div>
                </Flex>
            </Container>
        </Box>
    )
}

export default Hero
