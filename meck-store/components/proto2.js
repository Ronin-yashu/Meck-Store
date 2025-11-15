"use client";
import React from 'react';
import { Box, Container, Flex, Text, Button } from "@radix-ui/themes";
import { ShimmeringText } from "@/components/ui/shadcn-io/shimmering-text";
import ScrollVelocity from "@/components/ui/shadcn-io/scroll-velocity";
import { ShoppingBag, ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const Hero = () => {
    return (
        <Box 
            style={{ 
                position: 'relative',
                minHeight: '100vh',
                overflow: 'hidden',
                paddingTop: '80px' // Space for navbar
            }}
        >
            {/* Background Scroll Velocity - Fixed */}
            <Box 
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100vh',
                    zIndex: 0,
                    pointerEvents: 'none',
                    opacity: 0.1 // Subtle background effect
                }}
            >
                <style jsx global>{`
                    .scroll-velocity-text {
                        background: linear-gradient(90deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: transparent;
                        background-clip: text;
                        font-weight: 700;
                        font-size: 3rem;
                    }
                    /* Hide scrollbar */
                    .scroll-velocity-container {
                        overflow: hidden !important;
                    }
                    .scroll-velocity-container::-webkit-scrollbar {
                        display: none;
                    }
                `}</style>
                <div className="scroll-velocity-container">
                    <ScrollVelocity
                        texts={[
                            'The Amazing World of Shopping ✨',
                            'Check Out Our Latest Products 🛍️',
                            'Unbeatable Prices Just for You 💎'
                        ]}
                        velocity={50}
                        className="scroll-velocity-text select-none"
                    />
                </div>
            </Box>

            {/* Main Content */}
            <Container 
                size="4"
                style={{
                    position: 'relative',
                    zIndex: 10,
                    display: 'flex',
                    alignItems: 'center',
                    minHeight: 'calc(100vh - 80px)'
                }}
            >
                <Flex 
                    direction="column" 
                    align="center" 
                    justify="center" 
                    gap="7"
                    style={{ width: '100%', textAlign: 'center' }}
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
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                        style={{
                            maxWidth: '900px'
                        }}
                    >
                        <style jsx>{`
                            .gradient-shimmer {
                                background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
                                -webkit-background-clip: text;
                                -webkit-text-fill-color: transparent;
                                background-clip: text;
                            }
                        `}</style>
                        <div className="gradient-shimmer">
                            <ShimmeringText
                                text="Welcome to Meck Store"
                                duration={2}
                                wave={true}
                                className="text-5xl md:text-7xl font-extrabold"
                            />
                        </div>
                    </motion.div>

                    {/* Subheadline */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                    >
                        <Text 
                            size="5" 
                            style={{ 
                                color: "var(--gray-11)",
                                maxWidth: "600px",
                                lineHeight: "1.6"
                            }}
                        >
                            Discover amazing products with stunning visuals and unbeatable prices.
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
                        transition={{ delay: 0.8 }}
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
                                            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
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
                        transition={{ delay: 1 }}
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

                    {/* Scroll Indicator */}
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                        style={{ marginTop: '40px' }}
                    >
                        <Text size="2" color="gray">
                            Scroll to explore ↓
                        </Text>
                    </motion.div>
                </Flex>
            </Container>
        </Box>
    );
};

export default Hero;
