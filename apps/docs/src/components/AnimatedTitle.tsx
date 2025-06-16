"use client";

import { motion } from "framer-motion";

interface AnimatedTitleProps {
  children: React.ReactNode;
}

export function AnimatedTitle({ children }: AnimatedTitleProps) {
  return (
    <motion.h1
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-4xl md:text-5xl font-bold text-center mb-8  bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 text-transparent bg-clip-text"
    >
      {children}
    </motion.h1>
  );
}
