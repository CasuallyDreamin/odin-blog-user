"use client";

import { motion } from "framer-motion";

export default function AnimatedText({ text, className = "" }) {
  const words = text.split(" ");

  return (
    <div className={`inline-block overflow-hidden ${className}`}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: i * 0.08,
            duration: 0.5,
            ease: "easeOut",
          }}
          className="inline-block mr-1"
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
}
