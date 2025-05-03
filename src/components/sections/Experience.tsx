"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import SectionTitle from "@/components/ui/SectionTitle";
import ParallaxWrapper from "@/components/ui/ParallaxWrapper";

// Experience data structure
interface Experience {
  company: string;
  position: string;
  duration: string;
  description: string[];
}

// Experiences Data
const experiences: Experience[] = [
  {
    company: "Teraforge Digital Lab LLP",
    position: "Full Stack Developer Intern",
    duration: "April 2025 - Present",
    description: [
      "Built a car listing web application using React, integrating an AI-powered chatbot with contextual awareness and smart features.",
      "Implemented Firebase for real-time database management and secure user authentication.",
      "Worked on tools like WordPress and Hostinger to accelerate client website deployment and delivery.",
      "Collaborated across teams to deliver scalable, user-friendly web solutions aligned with client needs."
    ],
  },
  {
    company: "VIT Mumbai",
    position: "Systems Setup Intern",
    duration: "Jun 2024 - Jun 2024",
    description: [
      "Gained hands-on experience in various aspects of Systems infrastructure and administration.",
      "Worked on setting up PCs, installing OS from Windows Deployment Center (WDC), and configuring systems to join a domain with security settings",
      "Learnt tasks like configuring network setups and crimping RJ45 cables to ensure reliable connectivity"
    ],
  },
];

export default function Experience() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  return (
    <section id="experience" className="py-16 sm:py-20 container mx-auto px-4 sm:px-6">
      <SectionTitle title="Experience" />

      <div className="relative mt-8 sm:mt-12 max-w-5xl mx-auto">
        {/* Vertical timeline line */}
        <div className="absolute left-5 sm:left-7 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-border/30 via-border to-border/30 -ml-px md:ml-[-1px]" />

        {experiences.map((exp, index) => (
          <div
            key={exp.company}
            className={`relative mb-12 sm:mb-16 md:mb-24 
              ${isMobile ? "pl-12 sm:pl-16" : index % 2 === 0 ? "md:pr-16 md:text-right" : "md:pl-16"} 
              md:w-1/2 ${index % 2 === 0 ? "md:ml-0" : "md:ml-auto"}`}
          >
            <ParallaxWrapper
              direction={isMobile ? "right" : index % 2 === 0 ? "left" : "right"}
              className="relative"
              speed={0.2}
            >
              {/* Timeline dot with pulsing effect */}
              <motion.div
                className={`absolute top-6 sm:top-8 w-4 sm:w-5 h-4 sm:h-5 rounded-full bg-primary/80 border-[3px] border-background 
                  ${isMobile ? "left-[-22px] sm:left-[-28px]" : index % 2 === 0 ? "md:right-[-38px]" : "md:left-[-38px]"}`}
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  className="absolute inset-0 rounded-full bg-primary/30"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [1, 0, 1]
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "easeInOut"
                  }}
                />
              </motion.div>

              {/* Date indicator for mobile
              {isMobile && (
                <div className="absolute left-[-42px] sm:left-[-54px] top-5 sm:top-7 flex items-center justify-center h-10 w-10 sm:h-12 sm:w-12 rounded-full border-2 border-border bg-background shadow-sm z-10">
                  <div className="text-[10px] sm:text-xs text-center font-medium leading-tight">
                    {exp.duration.split(" - ")[0].split(" ")[0]}
                    <br />
                    {exp.duration.split(" - ")[0].split(" ")[1].substring(0, 4)}
                  </div>
                </div>
              )} */}

              <motion.div
                initial={{ opacity: 0, y: 30, x: isMobile ? 0 : index % 2 === 0 ? 30 : -30 }}
                whileInView={{ opacity: 1, y: 0, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                whileHover={{
                  y: -5,
                  boxShadow: "0 15px 30px rgba(0, 0, 0, 0.1)",
                  transition: { duration: 0.3 }
                }}
                className="bg-card border border-border/60 rounded-xl p-5 sm:p-6 md:p-8 shadow-md relative overflow-hidden group"
              >
                {/* Subtle gradient highlight */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <span className="inline-block px-3 py-1 text-xs sm:text-sm font-medium text-primary bg-primary/10 rounded-full mb-3">
                  {exp.duration}
                </span>

                <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-1 group-hover:text-primary transition-colors duration-300">{exp.position}</h3>
                <h4 className="text-base sm:text-lg font-medium text-foreground/80 mb-3 sm:mb-5">{exp.company}</h4>

                <motion.ul
                  className={`space-y-2 sm:space-y-3 relative ${(!isMobile && index % 2 === 0) ? "md:text-right" : ""}`}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  variants={{
                    visible: { transition: { staggerChildren: 0.1 } },
                    hidden: {}
                  }}
                >
                  {exp.description.map((item, i) => (
                    <motion.li
                      key={i}
                      className="text-sm sm:text-base text-muted-foreground"
                      variants={{
                        visible: { opacity: 1, x: 0 },
                        hidden: { opacity: 0, x: isMobile ? -10 : (index % 2 === 0 ? 20 : -20) }
                      }}
                      transition={{ duration: 0.4 }}
                    >
                      {item}
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.div>
            </ParallaxWrapper>
          </div>
        ))}
      </div>
    </section>
  );
}