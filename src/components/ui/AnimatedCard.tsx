import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  duration?: number;
}

export default function AnimatedCard({
  children,
  className,
  delay = 0,
  direction = "up",
  duration = 0.5,
}: AnimatedCardProps) {
  const directionMap = {
    up: { y: 50, x: 0 },
    down: { y: -50, x: 0 },
    left: { x: 50, y: 0 },
    right: { x: -50, y: 0 },
  };

  const initialPosition = directionMap[direction];

  return (
    <motion.div
      initial={{ opacity: 0, ...initialPosition }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration, delay }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className={cn(
        "bg-card border border-border rounded-lg shadow-md overflow-hidden",
        className
      )}
    >
      {children}
    </motion.div>
  );
}