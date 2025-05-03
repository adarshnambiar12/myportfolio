"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ParallaxWrapperProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
  direction?: "up" | "down" | "left" | "right";
}

export default function ParallaxWrapper({
  children,
  className = "",
  direction = "up",
}: ParallaxWrapperProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const directionMap = {
    up: { y: useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]) },
    down: { y: useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]) },
    left: { x: useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]) },
    right: { x: useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]) },
  };

  const transformValues = directionMap[direction];

  return (
    <div ref={ref} className={`overflow-visible ${className}`}>
      <motion.div
        style={{
          ...transformValues,
          transition: "transform 0.1s linear",
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}