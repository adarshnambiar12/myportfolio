"use client";

import { motion } from "framer-motion";
import SectionTitle from "@/components/ui/SectionTitle";
import AnimatedCard from "@/components/ui/AnimatedCard";
import Image from "next/image";
import { useTheme } from "next-themes";

// Language data structure
interface Language {
  name: string;
  proficiency: "Native" | "Fluent" | "Bilingual" | "Conversational";
  level: number; // 0-100
  image: string;
}

// Language data
const languages: Language[] = [
  { name: "English", proficiency: "Fluent", level: 90, image: "english.png" },
  { name: "Hindi", proficiency: "Bilingual", level: 95, image: "hindi.png" },
  { name: "Malayalam", proficiency: "Native", level: 95, image: "malayalam.png" },
];

export default function Languages() {
  const { theme } = useTheme();
  return (
    <section id="languages" className="py-10 sm:py-20 container mx-auto px-2 sm:px-6">
      <SectionTitle title="Languages" />
      
      <div className="grid grid-cols-3 gap-2 sm:gap-6 max-w-4xl mx-auto">
        {languages.map((language, index) => (
          <AnimatedCard
            key={language.name}
            delay={index * 0.1}
            className="p-2 sm:p-6 border border-border/50 shadow-sm hover:shadow-md transition-all duration-300"
          >
            <div className="flex flex-col items-center text-center">
              <motion.div 
                className="w-10 h-10 sm:w-16 sm:h-16 rounded-full bg-accent flex items-center justify-center mb-2 sm:mb-4 border border-border/30 shadow-inner"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                <Image
                  src={`/images/languages/${language.image}`}
                  alt={language.name}
                  width={64}
                  height={64}
                  className={`w-7 h-7 sm:w-12 sm:h-12 rounded-full ${theme !== "light" ? "invert" : ""}`}
                  priority
                />
              </motion.div>
              <h3 className="text-sm sm:text-xl font-bold mb-0.5 sm:mb-1">{language.name}</h3>
              <p className="text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-4 px-2 sm:px-3 py-0.5 sm:py-1 bg-accent/50 rounded-full">{language.proficiency}</p>
              
              <div className="w-full h-1.5 sm:h-2.5 bg-accent/50 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${language.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-primary/80 to-primary rounded-full"
                />
              </div>
              <span className="mt-1 sm:mt-2 text-xs sm:text-sm text-muted-foreground self-end">{language.level}%</span>
            </div>
          </AnimatedCard>
        ))}
      </div>
    </section>
  );
}