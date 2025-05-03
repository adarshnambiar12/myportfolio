"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import TypingEffect from "@/components/ui/TypingEffect";
import Image from "next/image";
import { FileDown } from "lucide-react";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 100 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Calculate normalized mouse position (-1 to 1)
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Smooth scroll handler function
  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, targetId: string) => {
    e.preventDefault();
    
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop,
        behavior: 'smooth'
      });
    }
  };

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  // Parallax effect for background elements
  const backgroundX = useTransform(springX, [-1, 1], [-10, 10]);
  const backgroundY = useTransform(springY, [-1, 1], [-10, 10]);
  const imageX = useTransform(springX, [-1, 1], [-5, 5]);
  const imageY = useTransform(springY, [-1, 1], [-5, 5]);

  return (
    <motion.div
      ref={containerRef}
      style={{ opacity, scale, y, position: "relative" }}
      className="min-h-screen flex flex-col justify-center items-center py-20 overflow-visible"
    >
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-visible">
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />

        {/* Animated Grid Pattern */}
        <motion.div
          className="absolute inset-0 opacity-5"
          style={{ x: backgroundX, y: backgroundY }}
        >
          <div className="absolute inset-0 grid grid-cols-[repeat(20,1fr)] grid-rows-[repeat(20,1fr)]">
            {Array.from({ length: 400 }).map((_, i) => (
              <div key={i} className="border-[0.5px] border-foreground/20"></div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Profile Image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 20,
          delay: 0.2,
        }}
        style={{ x: imageX, y: imageY }}
        className="relative mb-10"
      >
        <div className="w-48 h-48 md:w-64 md:h-64 relative z-10">
          <div className="absolute inset-0 rounded-full overflow-hidden border-4 border-border/80 shadow-[0_0_25px_rgba(0,0,0,0.2)]">
            <Image
              src="/images/profile.png"
              alt="Adarsh Nambiar"
              fill
              sizes="(max-width: 768px) 192px, 256px"
              priority
              className="object-cover rounded-full grayscale hover:grayscale-0 transition-all duration-1000"
            />
          </div>
        </div>

        {/* Circle decorations around profile */}
        <div className="absolute inset-0 rounded-full border-2 border-dashed border-border/30 animate-[spin_30s_linear_infinite] z-0" />
        <div className="absolute inset-[-10px] rounded-full border border-border/20 z-0" />
        <div className="absolute inset-[-20px] rounded-full border border-border/10 z-0" />
      </motion.div>

      {/* Name */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <motion.h1
          initial={{ y: 20, clipPath: "inset(0 0 100% 0)" }}
          animate={{ y: 0, clipPath: "inset(0 0 0% 0)" }}
          transition={{
            duration: 0.7,
            delay: 0.3,
            ease: [0.33, 1, 0.68, 1]  // cubic-bezier
          }}
          className="text-4xl md:text-6xl font-bold mb-4 tracking-tight"
        >
          Adarsh Nambiar
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="text-xl md:text-2xl text-muted-foreground mb-8 font-light inline-flex"
        >
          <TypingEffect
            phrases={["Web Developer", "Cloud & DevOps" ,"Computer Engineer", "Constant Learner", "Tech Enthusiast"]}
            typingSpeed={80}
            deleteSpeed={40}
            delayBetweenPhrases={1000}
            className="text-primary"
          />
        </motion.div>
      </motion.div>

      {/* Call to Action Buttons  */}
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: {
            opacity: 1,
            y: 0,
            transition: {
              staggerChildren: 0.1,
              delayChildren: 0.8,
            }
          }
        }}
        initial="hidden"
        animate="visible"
        className="flex flex-wrap justify-center gap-4 z-10"
      >
        <motion.a
          href="#contact"
          onClick={(e) => handleSmoothScroll(e, 'contact')}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 }
          }}
          whileHover={{
            scale: 1.05,
            transition: { duration: 0.2 }
          }}
          whileTap={{ scale: 0.98 }}
          className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium transition-all shadow-md hover:shadow-lg hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background cursor-pointer"
        >
          Get in Touch
        </motion.a>
        <motion.a
          href="#projects"
          onClick={(e) => handleSmoothScroll(e, 'projects')}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 }
          }}
          whileHover={{
            scale: 1.05,
            transition: { duration: 0.2 }
          }}
          whileTap={{ scale: 0.98 }}
          className="px-6 py-3 bg-background border border-border rounded-lg font-medium transition-all hover:bg-accent focus:outline-none focus:ring-2 focus:ring-accent/50 focus:ring-offset-2 focus:ring-offset-background cursor-pointer"
        >
          View Work
        </motion.a>
        <motion.a
          href="/Adarsh's Resume.pdf"
          download
          target="_blank"
          rel="noopener noreferrer"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 }
          }}
          whileHover={{
            scale: 1.05,
            transition: { duration: 0.2 }
          }}
          whileTap={{ scale: 0.98 }}
          className="px-6 py-3 bg-background border border-primary/30 rounded-lg font-medium transition-all hover:border-primary hover:bg-primary/5 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background flex items-center"
        >
          <FileDown className="w-5 h-5 mr-2 text-primary" />
          Download Resume
        </motion.a>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ duration: 0.5, delay: 1.4, ease: "easeInOut" }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: "loop"
          }}
          className="flex flex-col items-center gap-2"
        >
          <div className="w-6 h-10 border border-muted-foreground rounded-full flex justify-center">
            <motion.div
              animate={{
                y: [4, 12, 4],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop"
              }}
              className="w-1.5 h-1.5 bg-primary rounded-full mt-1"
            />
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}