"use client";

import { motion } from "framer-motion";
import { CalendarRange, Users, BadgeCheck, Heart } from "lucide-react";
import SectionTitle from "@/components/ui/SectionTitle";
import ParallaxWrapper from "@/components/ui/ParallaxWrapper";
import Image from "next/image";

// Volunteering data structure
interface VolunteerRole {
  title: string;
  organization: string;
  period: string;
  description?: string;
}

// Volunteering data
const volunteerRoles: VolunteerRole[] = [
  {
    title: "Student Volunteer",
    organization: "National Service Scheme",
    period: "Jun 2023 - May 2024",
  },
  {
    title: "Documentation Head",
    organization: "National Service Scheme",
    period: "May 2024 - Feb 2025",
  },
];

export default function Volunteering() {
  return (
    <section id="volunteering" className="py-16 sm:py-20 container mx-auto px-4 sm:px-6 relative">
      <SectionTitle title="Volunteering" />
      
      <div className="max-w-5xl mx-auto mt-8 sm:mt-12">
        <ParallaxWrapper 
          direction="up"
          className="relative"
          speed={0.15}
        >
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="bg-card/30 border border-border/40 rounded-xl p-6 sm:p-8 shadow-md backdrop-blur-sm overflow-hidden relative"
          >
            {/* Organization logo and info */}
            <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-start mb-8">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-xl bg-accent/30 border border-border flex items-center justify-center p-2 shadow-sm">
                <motion.div
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                >
                  <Image
                    src="/images/nsslogo.png"
                    alt="National Service Scheme logo"
                    width={80}
                    height={80}
                    className="w-full h-full object-contain opacity-90"
                  />
                </motion.div>
              </div>
              
              <div>
                <h3 className="text-xl sm:text-2xl font-bold">National Service Scheme</h3>
                <p className="text-primary font-medium mt-1 mb-3">Social Services</p>
                
                <motion.p 
                  className="text-muted-foreground text-sm sm:text-base max-w-2xl"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  Passionate NSS volunteer dedicated to community development, fostering national responsibility, and eager for more opportunities to create a better tomorrow.
                </motion.p>
              </div>
            </div>
            
            {/* Timeline of roles */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-8 mb-6">
              {volunteerRoles.map((role, index) => (
                <motion.div 
                  key={role.title}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-background/50 border border-border/30 rounded-lg p-5 shadow-sm hover:shadow-md transition-all duration-300 group"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                      {index === 0 ? (
                        <Users className="w-5 h-5 text-primary" />
                      ) : (
                        <BadgeCheck className="w-5 h-5 text-primary" />
                      )}
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-semibold group-hover:text-primary transition-colors duration-300">{role.title}</h4>
                      <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                        <CalendarRange className="w-3.5 h-3.5" />
                        <span>{role.period}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-6 pt-6 border-t border-border/30 text-center"
            >
              <div className="inline-flex items-center text-sm font-medium text-primary bg-primary/5 border border-primary/20 px-4 py-2 rounded-full">
                <Heart className="w-4 h-4 mr-2" />
                <span>Making a difference through service</span>
              </div>
            </motion.div>
            
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-40 h-40 border border-primary/5 rounded-full -z-10 opacity-20 translate-x-12 -translate-y-12"></div>
            <div className="absolute bottom-0 left-0 w-28 h-28 border border-border/30 rounded-full -z-10 opacity-20 -translate-x-10 translate-y-10"></div>
          </motion.div>
        </ParallaxWrapper>
      </div>
    </section>
  );
}