"use client"
import React from 'react'
import { Box, Container, Flex, Text, Button, TextField } from "@radix-ui/themes";
import BlurText from '@/components/ui/shadcn-io/blur-text';
import { Search, ShoppingCart, User, Menu, X, Heart, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollVelocity from "@/components/ui/shadcn-io/scroll-velocity";
import { ShimmeringText } from "@/components/ui/shadcn-io/shimmering-text";

const Hero = () => {

    return (
        <Box className='relative min-h-screen overflow-hidden'>
            <Box className='absolute left-0 w-full h-screen z-0 opacity-40'>
                <ScrollVelocity
                    texts={['The Amazing World of Shopping', 'Check Out Our Latest Products', 'Unbeatable Prices Just for You', 'Shop Now and Save Big', 'Discover Exclusive Deals Today']}
                    velocity={100}
                    className="text-foreground scroll-velocity-text select-none"
                />
            </Box>
            <Container size="4" className="relative z-10 flex justify-center items-center h-[80vh]">
                <Flex direction="column" align="center" justify="center" gap="7" width="full">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                        <Flex align="center" gap="2" style={{
                            background: "rgba(79, 70, 229, 0.1)",
                            padding: "10px 20px",
                            borderRadius: "30px",
                            border: "1px solid rgba(79, 70, 229, 0.3)",
                            backdropFilter: "blur(10px)"
                        }}>
                            <Sparkles size={16} color="#4F46E5" />
                            <Text size="2" weight="bold">
                                New Arrival Collection!
                            </Text>
                        </Flex>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4, duration: 0.5 }}>
                        <Box className='z-20' style={{
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                            color: '#667eea'
                        }}>
                            <ShimmeringText
                                text="Welcome to Meck Store"
                                duration={2}
                                wave={true}
                                className="text-5xl md:text-7xl font-extrabold"
                            // shimmeringColor="hsl(var(--primary))"
                            />
                        </Box>
                    </motion.div>

                </Flex>
            </Container>
        </Box>
    )
}

export default Hero