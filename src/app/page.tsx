"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Certificates from "@/components/sections/Certificates";
import Volunteering from "@/components/sections/Volunteering";
import Languages from "@/components/sections/Languages";
import Contact from "@/components/sections/Contact";
import Image from "next/image";
import { useTheme } from "next-themes";

export default function Home() {
  const { theme } = useTheme();
  const [scrollY, setScrollY] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!mounted) return null;

  return (
    <main className="flex min-h-screen flex-col items-center relative overflow-hidden">

      <div className="fixed top-5 left-5 z-50">
        <a href="https://adarshnambiar.me">
          <Image
            src="/images/logo.svg"
            alt="Logo"
            width={50}
            height={50}
            className={`sm:w-12 sm:h-12 w-10 h-10 rounded-full border-2 border-border  transition-transform duration-300 ease-in-out hover:scale-105 ${theme !== "light" ? "invert" : ""}`}
          />
        </a>
      </div>

      <div className="fixed top-6 right-6 z-50">
        <ThemeToggle />
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Certificates />
        <Volunteering />
        <Languages />
        <Contact />
      </div>

      <motion.div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: "radial-gradient(circle at center, rgba(100, 100, 100, 0.03) 0%, rgba(0, 0, 0, 0) 70%)",
          transform: `translateY(${scrollY * 0.1}px)`,
        }}
      />

      <footer className="w-full py-6 mt-20 border-t border-border">
        <div className="container text-center text-muted-foreground">
          <p>© {new Date().getFullYear()} Adarsh Nambiar. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}