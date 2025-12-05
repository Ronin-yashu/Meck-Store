"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { Flex } from '@radix-ui/themes';

const GlobalLoader = () => {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 15);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 9999,
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Flex direction="column" align="center" gap="6">
        {/* Logo */}
        <motion.h1
          style={{
            fontSize: '3rem',
            fontWeight: 'bold',
            color: 'white',
            margin: 0,
            letterSpacing: '2px'
          }}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          Meck Store
        </motion.h1>

        {/* Progress Bar */}
        <div
          style={{
            width: '300px',
            height: '6px',
            background: 'rgba(255,255,255,0.2)',
            borderRadius: '10px',
            overflow: 'hidden',
            position: 'relative'
          }}
        >
          <div
            style={{
              height: '100%',
              background: 'white',
              borderRadius: '10px',
              boxShadow: '0 0 10px rgba(255,255,255,0.5)',
              width: `${progress}%`,
              transition: 'width 0.1s ease-out'
            }}
          />
        </div>

        {/* Percentage */}
        <p
          style={{
            color: 'white',
            fontSize: '1.5rem',
            fontWeight: 'bold',
            margin: 0
          }}
        >
          {progress}%
        </p>

        {/* Loading Text */}
        <motion.p
          style={{
            color: 'white',
            fontSize: '1rem',
            margin: 0
          }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {progress < 30 && "Initializing..."}
          {progress >= 30 && progress < 60 && "Loading products..."}
          {progress >= 60 && progress < 90 && "Almost there..."}
          {progress >= 90 && "Ready!"}
        </motion.p>
      </Flex>
    </motion.div>
  );
};

export default GlobalLoader;
