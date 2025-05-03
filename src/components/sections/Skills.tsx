"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import SectionTitle from "@/components/ui/SectionTitle";
import AnimatedCard from "@/components/ui/AnimatedCard";
import Image from "next/image";
import { useTheme } from "next-themes";

// Skill types and data structure
interface Skill {
  name: string;
  level: number;
  icon: string;
  category: "frontend" | "backend" | "tools" | "other";
}

// Skills data
const skills: Skill[] = [
  { name: "HTML5", level: 95, icon: "html.png", category: "frontend" },
  { name: "CSS3", level: 85, icon: "css.png", category: "frontend" },
  { name: "JavaScript", level: 90, icon: "javascript.png", category: "frontend" },
  { name: "React", level: 90, icon: "react.png", category: "frontend" },
  { name: "Next.js", level: 80, icon: "nextjs.png", category: "frontend" },
  { name: "TypeScript", level: 80, icon: "typescript.png", category: "frontend" },
  { name: "Tailwind CSS", level: 85, icon: "tailwindcss.png", category: "frontend" },
  { name: "Bootstrap", level: 70, icon: "bootstrap.png", category: "frontend" },
  
  { name: "Node.js", level: 85, icon: "nodejs.png", category: "backend" },
  { name: "Express.js", level: 75, icon: "expressjs.png", category: "backend" },
  { name: "MongoDB", level: 85, icon: "mongodb.png", category: "backend" },
  { name: "Python", level: 60, icon: "python.png", category: "backend" },
  
  { name: "Git", level: 75, icon: "git.png", category: "tools" },
  { name: "GitHub", level: 85, icon: "github.png", category: "tools" },
  { name: "AWS", level: 80, icon: "aws.png", category: "tools" },
  { name: "Azure", level: 75, icon: "azure.png", category: "tools" },
  { name: "Firebase", level: 80, icon: "firebase.png", category: "tools" },
  { name: "Appwrite", level: 75, icon: "appwrite.png", category: "tools" },

  { name: "Cloudinary", level: 85, icon: "cloudinary.png", category: "other" },
  { name: "Figma", level: 70, icon: "figma.png", category: "other" },
  { name: "Canva", level: 85, icon: "canva.png", category: "other" },
];

// Filter types
type FilterType = "all" | "frontend" | "backend" | "tools" | "other";

export default function Skills() {
  const { theme } = useTheme();
  const [filter, setFilter] = useState<FilterType>("all");

  // Filter skills based on category
  const filteredSkills = filter === "all" 
    ? skills 
    : skills.filter(skill => skill.category === filter);

  return (
    <section id="skills" className="py-20 container mx-auto px-4 sm:px-6">
      <SectionTitle title="Skills" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex justify-center flex-wrap gap-3 mb-12"
      >
        {(["all", "frontend", "backend", "tools", "other"] as const).map((category) => (
          <button
            key={category}
            onClick={() => setFilter(category)}
            className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
              filter === category
                ? "bg-primary text-primary-foreground shadow-md"
                : "bg-card border border-border hover:bg-accent/80 hover:border-primary/30"
            }`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </motion.div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
        {filteredSkills.map((skill, index) => (
          <AnimatedCard 
            key={skill.name} 
            delay={index * 0.05} 
            className="p-4 sm:p-5 h-full"
          >
            <div className="flex flex-col items-center text-center h-full justify-between">
              <div className="w-14 h-14 sm:w-16 sm:h-16 mb-4 flex items-center justify-center bg-accent/50 rounded-xl shadow-sm border border-border/50">
                <Image
                  src={`/images/skills/${skill.icon}`}
                  alt={skill.name}
                  width={40}
                  height={40}
                  className={`w-8 h-8 sm:w-9 sm:h-9 object-contain ${theme !== "light" ? "invert" : ""}`}
                />
              </div>
              <h3 className="text-base sm:text-lg font-semibold mb-3">{skill.name}</h3>
              <div className="w-full bg-accent/50 rounded-full h-2 mb-2 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                  className="h-2 rounded-full bg-gradient-to-r from-primary/80 to-primary"
                />
              </div>
              <span className="text-sm text-muted-foreground font-medium">{skill.level}%</span>
            </div>
          </AnimatedCard>
        ))}
      </div>
    </section>
  );
}