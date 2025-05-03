"use client";

import { motion } from "framer-motion";
import { Calendar, Award, ExternalLink } from "lucide-react";
import SectionTitle from "@/components/ui/SectionTitle";
import AnimatedCard from "@/components/ui/AnimatedCard";

// Certificate data structure
interface Certificate {
  title: string;
  issuer: string;
  date: string;
  url?: string;
}

// Certificates data
const certificates: Certificate[] = [
  {
    title: "Postman API Fundamentals Student Expert",
    issuer: "Postman",
    date: "March 2024",
    url: "https://badgr.com/public/assertions/7i4wGzJCQmaPCDJMgpnvQw",
  },
  {
    title: "AWS Academy Cloud Architecting",
    issuer: "AWS",
    date: "November 2024",
    url: "https://www.credly.com/badges/7ecdb36f-476a-473f-b614-0bd000363082/public_url",
  },
  {
    title: "AWS Academy Cloud Foundations",
    issuer: "AWS",
    date: "March 2024",
    url: "https://www.credly.com/badges/28e3a00a-2e14-415d-a109-10bce2b5f88c",
  },
  {
    title: "Web Development Fundamentals",
    issuer: "IBM",
    date: "September 2024",
    url: "https://www.credly.com/badges/06611bf4-5b31-4013-9a71-a85ad7074e49/public_url",
  },
  {
    title: "Google Cloud Computing Foundations",
    issuer: "Google Cloud",
    date: "October 2023",
    url: "https://www.cloudskillsboost.google/public_profiles/ad48251d-f1b3-4755-ad10-04d2e629c4cf",
  }
];

export default function Certificates() {
  return (
    <section id="certificates" className="py-16 sm:py-20 container mx-auto px-4 sm:px-6">
      <SectionTitle title="Certificates" />
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 max-w-5xl mx-auto">
        {certificates.map((cert, index) => (
          <AnimatedCard
            key={cert.title}
            delay={index * 0.1}
            className="h-full relative group overflow-hidden"
          >
            <motion.div 
              className="p-6 sm:p-7 flex flex-col h-full border border-border/50 rounded-lg group-hover:border-primary/30 transition-colors duration-300"
              whileHover={{ y: -3 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex-grow">
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <motion.div
                      whileHover={{ rotate: 15 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <Award className="w-6 h-6 text-primary" />
                    </motion.div>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground bg-accent/40 px-3 py-1 rounded-full">
                    <Calendar className="w-3.5 h-3.5 mr-1.5" />
                    <span>{cert.date}</span>
                  </div>
                </div>
                
                <h3 className="text-lg sm:text-xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">
                  {cert.title}
                </h3>
                <p className="text-foreground/70 font-medium mb-6">{cert.issuer}</p>
              </div>
              
              {cert.url && (
                <motion.a
                  href={cert.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-4 py-2 border border-primary/20 rounded-md bg-background hover:bg-primary hover:text-primary-foreground transition-all duration-300 text-sm font-medium gap-1.5 shadow-sm group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  View Certificate
                  <motion.span
                    initial={{ x: 0 }}
                    animate={{ x: 0 }}
                    whileHover={{ x: 2 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </motion.span>
                </motion.a>
              )}
              
              {/* Decorative corner accent */}
              <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden opacity-10 pointer-events-none">
                <div className="absolute transform rotate-45 bg-primary w-8 h-8 top-[-4px] right-[-4px]"></div>
              </div>
            </motion.div>
          </AnimatedCard>
        ))}
      </div>
    </section>
  );
}