"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ParallaxWrapper from "@/components/ui/ParallaxWrapper";
import SectionTitle from "@/components/ui/SectionTitle";
import Image from "next/image";

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const translateX = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  return (
    <section id="about" className="py-20 relative container mx-auto px-4 sm:px-6" ref={containerRef}>
      <SectionTitle title="About Me" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <ParallaxWrapper direction="left" className="h-full">
          <motion.div
            className="relative flex items-center justify-center"
            style={{ x: translateX }}
          >
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-64 h-64 border border-primary/20 rounded-lg -z-10 translate-x-4 translate-y-4" />
            <div className="absolute bottom-0 right-0 w-32 h-32 border border-primary/10 rounded-lg -z-10 -translate-x-6 -translate-y-6" />

            {/* Image container*/}
            <div className="w-full aspect-square rounded-lg bg-card border border-border shadow-lg overflow-hidden relative">
              <div className="absolute inset-0">
                <Image
                  src="/images/about.png"
                  alt="Profile Image"
                  fill
                  className="object-cover rounded-lg"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </motion.div>
        </ParallaxWrapper>

        <ParallaxWrapper direction="right">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="space-y-6 bg-card/50 backdrop-blur-sm p-6 md:p-8 rounded-lg border border-border/50 shadow-sm"
          >
            <p className="text-lg leading-relaxed">
              I&apos;m a web developer and computer engineer who enjoys building clean, user-friendly web applications. With experience across both frontend and backend, I focus on creating responsive, accessible, and high-performing digital experiences.
            </p>
            <p className="text-lg leading-relaxed">
              My approach combines technical excellence with creative problem-solving, allowing me to deliver solutions that meets technical requirements. I&apos;m also passionate about cloud technologies and DevOps.
            </p>
            <p className="text-lg text-muted-foreground">
              Outside of coding, I love travelling, diving into new tech and learning something new every day.
            </p>
          </motion.div>
        </ParallaxWrapper>
      </div>
    </section>
  );
}