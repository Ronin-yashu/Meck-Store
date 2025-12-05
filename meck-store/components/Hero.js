"use client"
import React from 'react'
import { Box, Container, Flex, Text, Button } from "@radix-ui/themes";
import { Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import ScrollVelocity from "@/components/ui/shadcn-io/scroll-velocity";
import { ShimmeringText } from "@/components/ui/shadcn-io/shimmering-text";
import Link from 'next/link';
import { ShoppingBag, ArrowRight } from 'lucide-react';

const Hero = () => {
    return (
        <Box className="relative min-h-screen overflow-hidden">
            {/* Background scrolling text */}
            <Box className="absolute inset-0 z-0 opacity-20 pointer-events-none flex items-center">
                <ScrollVelocity
                    texts={[
                        'The Amazing World of Shopping',
                        'Check Out Our Latest Products',
                        'Unbeatable Prices Just for You',
                        'Shop Now and Save Big',
                        'Discover Exclusive Deals Today',
                    ]}
                    velocity={100}
                    className="text-foreground scroll-velocity-text select-none"
                />
            </Box>

            {/* Foreground content */}
            <Container
                size="4"
                className="relative z-10 flex justify-center items-center h-[80vh]"
            >
                <Flex direction="column" align="center" justify="center" gap="7" width="full">
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
                                backdropFilter: "blur(10px)",
                            }}
                        >
                            <Sparkles size={16} color="#4F46E5" />
                            <Text size="2" weight="bold">
                                New Arrival Collection!
                            </Text>
                        </Flex>
                    </motion.div>

                    {/* Headline */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                    >
                        <ShimmeringText
                            text="Welcome to Meck Store"
                            duration={2}
                            wave={true}
                            className="font-extrabold text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-5xl text-center"
                            style={{
                                color: "black", // or "var(--foreground)"
                            }}
                        />
                    </motion.div>

                    <motion.div className='text-center'
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}>

                        <Text size="5"
                            style={{
                                color: "var(--gray-11)",
                                maxWidth: "600px",
                                lineHeight: "1.6"
                            }}>
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

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}>
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

                    <motion.div className='md:block hidden'
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

                </Flex>
            </Container>
        </Box>
    )
}

export default Hero
