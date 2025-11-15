"use client";
import React from 'react'
import { Box, Container, Flex, Text, Button, TextField } from "@radix-ui/themes";
import { Search, ShoppingCart, User, Menu, X, Heart } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';


const Navbar = () => {
    const [MobileMenuOpen, setMobileMenuOpen] = React.useState(false);
    const [SearchOn, setSearchOn] = React.useState(false);


    // Close search with Escape key
    React.useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') setSearchOn(false);
        };
        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, []);


    const menuVariants = {
        closed: {
            opacity: 0,
            height: 0,
            transition: { duration: 0.3, ease: "easeInOut" }
        },
        open: {
            opacity: 1,
            height: "auto",
            transition: {
                duration: 0.3,
                ease: "easeInOut",
                staggerChildren: 0.07,
                delayChildren: 0.1
            }
        }
    };


    const itemVariants = {
        closed: { opacity: 0, x: -20 },
        open: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.3 }
        }
    };


    return (
        <div>
            <Box style={{ background: "var(--gray-a2)", borderRadius: "var(--radius-3)" }}>
                <Container size={{ initial: "2", md: "4" }}>
                    <Flex justify="between" align="center" height={{ initial: "50px", md: "60px" }} px="4">
                        {/* Logo */}
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                        >
                            <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                                <Text size={{ initial: "4", md: "7" }} weight="bold" style={{ cursor: 'pointer' }}>
                                    Meck Store
                                </Text>
                            </Link>
                        </motion.div>


                        {/* Desktop Menu */}
                        <Flex align="center" gap="6" display={{ initial: "none", md: "flex" }}>
                            {/* Search Field with Animation */}
                            <AnimatePresence>
                                {SearchOn && (
                                    <motion.div
                                        initial={{ width: 0, opacity: 0 }}
                                        animate={{ width: "280px", opacity: 1 }}
                                        exit={{ width: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: "easeOut" }}
                                        style={{ overflow: 'hidden' }}
                                    >
                                        <TextField.Root
                                            radius='large'
                                            size="2"
                                            variant='surface'
                                            placeholder="Search products..."
                                            autoFocus
                                        >
                                            <TextField.Slot>
                                                <Search size="15" />
                                            </TextField.Slot>
                                        </TextField.Root>
                                    </motion.div>
                                )}
                            </AnimatePresence>


                            {/* Search Toggle Button */}
                            <motion.div
                                whileHover={{ scale: 1.15, rotate: SearchOn ? 0 : 15 }}
                                whileTap={{ scale: 0.9 }}
                                transition={{ duration: 0.2 }}
                            >
                                {SearchOn ? (
                                    <X
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => setSearchOn(false)}
                                    />
                                ) : (
                                    <Search
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => setSearchOn(true)}
                                    />
                                )}
                            </motion.div>


                            {/* Account Link */}
                            <Link href="/account" style={{ textDecoration: 'none', color: 'inherit' }}>
                                <motion.div
                                    whileHover={{ y: -3 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <Text size="3" weight="medium" style={{ cursor: 'pointer' }}>
                                        Account
                                    </Text>
                                </motion.div>
                            </Link>


                            {/* Wishlist Link */}
                            <Link href="/wishlist" style={{ textDecoration: 'none', color: 'inherit' }}>
                                <motion.div
                                    whileHover={{ y: -3 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <Text size="3" weight="medium" style={{ cursor: 'pointer' }}>
                                        Wishlist
                                    </Text>
                                </motion.div>
                            </Link>


                            {/* Cart Icon */}
                            <Link href="/cart" style={{ textDecoration: 'none', color: 'inherit' }}>
                                <motion.div
                                    whileHover={{ scale: 1.15, y: -2 }}
                                    whileTap={{ scale: 0.9 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <ShoppingCart style={{ cursor: 'pointer' }} />
                                </motion.div>
                            </Link>


                            {/* User Icon */}
                            <Link href="/login" style={{ textDecoration: 'none', color: 'inherit' }}>
                                <motion.div
                                    whileHover={{ scale: 1.15 }}
                                    whileTap={{ scale: 0.9 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <User style={{ cursor: 'pointer' }} />
                                </motion.div>
                            </Link>
                        </Flex>


                        {/* Mobile Menu Button */}
                        <Box display={{ initial: "flex", md: "none" }}>
                            <motion.div
                                whileTap={{ scale: 0.9 }}
                                animate={{ rotate: MobileMenuOpen ? 180 : 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Button
                                    variant='ghost'
                                    onClick={() => setMobileMenuOpen(!MobileMenuOpen)}
                                >
                                    {MobileMenuOpen ? <X /> : <Menu />}
                                </Button>
                            </motion.div>
                        </Box>
                    </Flex>


                    {/* Mobile Dropdown Menu */}
                    <AnimatePresence>
                        {MobileMenuOpen && (
                            <motion.div
                                initial="closed"
                                animate="open"
                                exit="closed"
                                variants={menuVariants}
                                style={{ overflow: 'hidden' }}
                            >
                                <Box
                                    display={{ initial: "block", md: "none" }}
                                    py="4"
                                    px="4"
                                    style={{ borderTop: '1px solid var(--gray-a4)' }}
                                >
                                    <Flex direction="column" gap="4">
                                        {/* Mobile Search */}
                                        <motion.div variants={itemVariants}>
                                            {SearchOn ? (
                                                <Flex direction="column" gap="2">
                                                    <Flex justify="between" align="center">
                                                        <Text size="2" weight="bold">Search</Text>
                                                        <X
                                                            size={16}
                                                            style={{ cursor: 'pointer' }}
                                                            onClick={() => setSearchOn(false)}
                                                        />
                                                    </Flex>
                                                    <TextField.Root
                                                        radius='large'
                                                        size="2"
                                                        variant='surface'
                                                        placeholder="Search products..."
                                                        autoFocus
                                                    >
                                                        <TextField.Slot>
                                                            <Search size="15" />
                                                        </TextField.Slot>
                                                    </TextField.Root>
                                                </Flex>
                                            ) : (
                                                <motion.div whileTap={{ scale: 0.95 }}>
                                                    <Flex
                                                        align="center"
                                                        gap="2"
                                                        style={{ cursor: 'pointer' }}
                                                        onClick={() => setSearchOn(true)}
                                                    >
                                                        <Search size={18} />
                                                        <Text size="3" weight="medium">Search</Text>
                                                    </Flex>
                                                </motion.div>
                                            )}
                                        </motion.div>


                                        {/* Account */}
                                        <motion.div variants={itemVariants}>
                                            <Link href="/account" style={{ textDecoration: 'none', color: 'inherit' }}>
                                                <motion.div whileTap={{ scale: 0.95 }}>
                                                    <Flex align="center" gap="2">
                                                        <User size={18} />
                                                        <Text size="3" weight="medium">Account</Text>
                                                    </Flex>
                                                </motion.div>
                                            </Link>
                                        </motion.div>


                                        {/* Wishlist */}
                                        <motion.div variants={itemVariants}>
                                            <Link href="/wishlist" style={{ textDecoration: 'none', color: 'inherit' }}>
                                                <motion.div whileTap={{ scale: 0.95 }}>
                                                    <Flex align="center" gap="2">
                                                        <Heart size={18} />
                                                        <Text size="3" weight="medium">Wishlist</Text>
                                                    </Flex>
                                                </motion.div>
                                            </Link>
                                        </motion.div>


                                        {/* Cart */}
                                        <motion.div variants={itemVariants}>
                                            <Link href="/cart" style={{ textDecoration: 'none', color: 'inherit' }}>
                                                <motion.div whileTap={{ scale: 0.95 }}>
                                                    <Flex align="center" gap="2">
                                                        <ShoppingCart size={18} />
                                                        <Text size="3" weight="medium">Cart</Text>
                                                    </Flex>
                                                </motion.div>
                                            </Link>
                                        </motion.div>
                                    </Flex>
                                </Box>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </Container>
            </Box>
        </div>
    )
}


export default Navbar