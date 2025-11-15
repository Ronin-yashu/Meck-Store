"use client";
import React from 'react';
import { Box, Container, Flex, Text, Heading, Button } from "@radix-ui/themes";
import { ArrowRight, ShoppingBag, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

// Floating cube generator
const FLYING_CUBES = Array.from({ length: 30 }).map((_, i) => ({
    left: `${Math.random() * 90}%`,
    size: `${24 + Math.random() * 36}px`,
    duration: 15 + Math.random() * 12,
    delay: -(Math.random() * 10),
    rotate: Math.random() * 360
}));

const LensflareHeroSection = () => {
    return (
        <Box
            style={{
                background:
                    "radial-gradient(ellipse at 50% 50%, #323145 0%, #0a0a0a 100%)",
                minHeight: "100vh",
                position: "relative",
                overflow: "hidden"
            }}
        >
            {/* Floating cubes */}
            <div
                style={{
                    pointerEvents: "none",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    zIndex: 1,
                    width: "100%",
                    height: "100%"
                }}
            >
                {FLYING_CUBES.map((cube, i) => (
                    <motion.div
                        key={i}
                        style={{
                            position: "absolute",
                            left: cube.left,
                            width: cube.size,
                            height: cube.size,
                            transform: `rotateZ(${cube.rotate}deg)`,
                            opacity: 0.25 + Math.random() * 0.5,
                            background:
                                "linear-gradient(135deg, #fff 60%, #53a2fa 100%)",
                            boxShadow:
                                "0 0 32px 8px #fff9, 0 0 2px #41c9ff6f",
                            borderRadius: 6
                        }}
                        initial={{ top: "110%" }}
                        animate={{ top: "-10%" }}
                        transition={{
                            repeat: Infinity,
                            repeatType: "loop",
                            duration: cube.duration,
                            delay: cube.delay,
                            ease: "linear"
                        }}
                    />
                ))}
            </div>

            {/* Simulated lens flares */}
            <Box
                style={{
                    position: "absolute",
                    top: "25%",
                    left: "5%",
                    width: 300,
                    height: 300,
                    pointerEvents: "none",
                    zIndex: 2,
                    background:
                        "radial-gradient(circle, #ffd70088 0%, #00ecffaa 60%, transparent 95%)",
                    filter: "blur(30px)",
                    opacity: 0.35
                }}
            />
            <Box
                style={{
                    position: "absolute",
                    bottom: "10%",
                    right: "10%",
                    width: 180,
                    height: 180,
                    pointerEvents: "none",
                    zIndex: 2,
                    background:
                        "radial-gradient(circle, #ffaaff66 10%, #5161ff99 60%, transparent 90%)",
                    filter: "blur(28px)",
                    opacity: 0.38
                }}
            />

            {/* Main Content */}
            <Container
                size="4"
                style={{
                    position: "relative",
                    zIndex: 10,
                    height: "100vh",
                    display: "flex",
                    alignItems: "center"
                }}
            >
                <Flex
                    justify="center"
                    align="center"
                    direction="column"
                    gap="7"
                    style={{
                        width: "100%",
                        minHeight: "100vh",
                        textAlign: "center"
                    }}
                >
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                    >
                        <Flex
                            align="center"
                            gap="2"
                            style={{
                                margin: "0 auto",
                                background: "rgba(255, 255, 255, 0.12)",
                                padding: "8px 18px",
                                borderRadius: "20px",
                                color: "white",
                                boxShadow: "0 4px 24px rgba(0,0,0,0.14)",
                                fontWeight: "bold",
                                letterSpacing: 1
                            }}
                        >
                            <Sparkles size={16} />
                            New Lensflare Drop
                        </Flex>
                    </motion.div>
                    {/* Heading */}
                    <motion.div
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.25, duration: 0.8 }}
                    >
                        <Heading
                            size="9"
                            weight="bold"
                            style={{
                                color: "white",
                                textShadow:
                                    "0 8px 60px #404099,0 1px 0 #fff5"
                            }}
                        >
                            Welcome to Meck Store
                        </Heading>
                    </motion.div>
                    {/* Subheadline */}
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                    >
                        <Text
                            size="5"
                            weight="medium"
                            style={{
                                color: "rgba(220,220,255,0.87)",
                                maxWidth: 560,
                                display: "inline-block"
                            }}
                        >
                            3D shopping meets stunning visuals.<br />
                            <span style={{ color: "#7ecfff" }}>
                                Fast. Beautiful. Futuristic.
                            </span>
                        </Text>
                    </motion.div>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7, duration: 0.7 }}
                    >
                        <Flex align="center" justify="center" gap="4" mt="2" wrap="wrap">
                            <Link href="/shop">
                                <motion.div whileHover={{ scale: 1.06, y: -2 }} whileTap={{ scale: 0.96 }}>
                                    <Button
                                        size="4"
                                        variant="solid"
                                        style={{
                                            background: "linear-gradient(90deg,#43c6ac 10%,#191654 90%)",
                                            color: "white",
                                            fontWeight: 600,
                                            padding: "16px 36px",
                                            boxShadow: "0 2px 24px #46f8fa30"
                                        }}
                                    >
                                        <ShoppingBag size={20} />
                                        Shop Now
                                        <ArrowRight size={18} />
                                    </Button>
                                </motion.div>
                            </Link>
                            <Link href="/categories">
                                <motion.div whileHover={{ scale: 1.06, y: -2 }} whileTap={{ scale: 0.96 }}>
                                    <Button
                                        size="4"
                                        variant="outline"
                                        style={{
                                            borderColor: "white",
                                            color: "white",
                                            fontWeight: 500,
                                            padding: "16px 36px",
                                            background: "rgba(44,99,255,0.09)"
                                        }}
                                    >
                                        Browse Categories
                                    </Button>
                                </motion.div>
                            </Link>
                        </Flex>
                    </motion.div>
                    {/* Trust indicators */}
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9, duration: 0.6 }}
                    >
                        <Flex
                            align="center"
                            justify="center"
                            gap="7"
                            style={{
                                marginTop: "20px",
                                background: "rgba(0,0,36,0.07)",
                                borderRadius: "36px",
                                padding: "14px 36px",
                                boxShadow: "0 1.5px 12px #448ad422"
                            }}
                            wrap="wrap"
                        >
                            <Flex align="center" gap="2">
                                <Text size="4" weight="bold" style={{ color: "white" }}>
                                    10K+
                                </Text>
                                <Text size="2" style={{ color: "#bae0ff" }}>
                                    Happy Customers
                                </Text>
                            </Flex>
                            <Flex align="center" gap="2">
                                <Text size="4" weight="bold" style={{ color: "white" }}>
                                    5000+
                                </Text>
                                <Text size="2" style={{ color: "#bae0ff" }}>
                                    Products
                                </Text>
                            </Flex>
                            <Flex align="center" gap="2">
                                <Text
                                    size="4"
                                    weight="bold"
                                    style={{ color: "white" }}
                                >
                                    ⭐ 4.9
                                </Text>
                                <Text size="2" style={{ color: "#bae0ff" }}>
                                    Rating
                                </Text>
                            </Flex>
                        </Flex>
                    </motion.div>
                </Flex>
            </Container>
        </Box>
    );
};

export default LensflareHeroSection;
