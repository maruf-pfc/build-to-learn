"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface AnimatedCardProps {
  title: string;
  description: string;
  link: string;
}

export function AnimatedCard({ title, description, link }: AnimatedCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 transition-colors duration-200"
    >
      <Link href={link} className="block">
        <h3 className="text-xl font-bold mb-2 text-green-600 dark:text-green-600">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-white">{description}</p>
      </Link>
    </motion.div>
  );
}
