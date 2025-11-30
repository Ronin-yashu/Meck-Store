'use client';
import * as React from 'react';
import { motion } from 'framer-motion';

// Simple cn utility
function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

function ShimmeringText({
  text,
  duration = 1,
  transition,
  wave = false,
  className,
  ...props
}) {
  return (
    <motion.span
      className={cn('relative inline-block', className)}
      {...props}
    >
      {text?.split('')?.map((char, i) => (
        <motion.span
          key={i}
          className="inline-block whitespace-pre"
          initial={
            wave
              ? {
                  scale: 1,
                  rotateY: 0,
                }
              : {}
          }
          animate={
            wave
              ? {
                  x: [0, 5, 0],
                  y: [0, -5, 0],
                  scale: [1, 1.1, 1],
                  rotateY: [0, 15, 0],
                }
              : {}
          }
          transition={{
            duration,
            repeat: Infinity,
            repeatType: 'loop',
            repeatDelay: text.length * 0.05,
            delay: (i * duration) / text.length,
            ease: 'easeInOut',
            ...transition,
          }}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
}

export { ShimmeringText };
