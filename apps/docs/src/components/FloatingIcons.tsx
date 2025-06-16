"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaReact,
  FaNodeJs,
  FaPython,
  FaJava,
  FaDatabase,
  FaCloud,
} from "react-icons/fa";
import { SiTensorflow, SiKubernetes } from "react-icons/si";

const icons = [
  FaReact,
  FaNodeJs,
  FaPython,
  FaJava,
  FaDatabase,
  FaCloud,
  SiTensorflow,
  SiKubernetes,
];

export function FloatingIcons() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {icons.map((Icon, index) => (
        <motion.div
          key={index}
          initial={{
            x: `${Math.random() * 100}%`,
            y: `${Math.random() * 100}%`,
          }}
          animate={{
            x: `${Math.random() * 100}%`,
            y: `${Math.random() * 100}%`,
          }}
          transition={{
            duration: Math.random() * 10 + 20,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="absolute text-gray-200 dark:text-gray-800 opacity-10"
        >
          <Icon size={Math.random() * 40 + 20} />
        </motion.div>
      ))}
    </div>
  );
}
