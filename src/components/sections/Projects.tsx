"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import SectionTitle from "@/components/ui/SectionTitle";
import AnimatedCard from "@/components/ui/AnimatedCard";
import Image from "next/image";

// Project data structure
interface Project {
  title: string;
  description: string;
  technologies: string[];
  demoUrl?: string;
  sourceUrl?: string;
  image: string;
}

// Projects data
const projects: Project[] = [
  {
    title: "VotePlay Voting Simulator",
    description: "An interactive simulator that allows users to experience the electoral process in India.",
    technologies: ["React.js", "Tailwind CSS", "MongoDB", "Node.js", "Express.js", "Cashfree",],
    demoUrl: "https://voteplay.tech",
    sourceUrl: "https://github.com/adarshnambiar12",
    image: "/images/projects/voteplay.png",
  },
  {
    title: "NSS Website",
    description: "The NSS website serves as a central hub for updates and activities, promoting social and civic responsibility among students.",
    technologies: ["React", "Tailwind CSS", "Cloudinary", "Netlify"],
    demoUrl: "https://nssvit.netlify.app",
    sourceUrl: "https://github.com/adarshnambiar12",
    image: "/images/projects/nssvit.png",
  },
  {
    title: "My Portfolio Website",
    description: "A personal portfolio website using advanced animations and effects.",
    technologies: ["Next.js", "Framer Motion", "Tailwind CSS", "TypeScript", "Firebase"],
    demoUrl: "https://adarshnambiar.me",
    sourceUrl: "https://github.com/adarshnambiar12/myportfolio",
    image: "/images/projects/portfolio.png",
  },
  {
    title: "Expense Tracker",
    description: "A simple expense tracker app to manage your finances.",
    technologies: ["React", "Tailwind CSS", "Local Storage"],
    demoUrl: "https://myexpensetracker12.netlify.app/",
    sourceUrl: "https://github.com/adarshnambiar12/react-basic-projects/tree/main/12.%20Expense%20Tracker/expense-tracker",
    image: "/images/projects/expensetracker.png",
  },
  {
    title: "Memory Game",
    description: "A fun memory game to test your memory skills.",
    technologies: ["HTML", "CSS", "JavaScript"],
    demoUrl: "https://memorygameplay.netlify.app/",
    sourceUrl: "https://github.com/adarshnambiar12",
    image: "/images/projects/memorygame.png",
  },
];

export default function Projects() {
  const [activeProject, setActiveProject] = useState<number | null>(null);

  const toggleProject = (index: number) => {
    setActiveProject(activeProject === index ? null : index);
  };

  return (
    <section id="projects" className="py-20 container mx-auto px-4 sm:px-6">
      <SectionTitle title="Projects" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {projects.map((project, index) => (
          <div 
            key={project.title} 
            className="relative h-full group"
            onClick={() => toggleProject(index)}
          >
            <AnimatedCard
              delay={index * 0.1}
              className="h-full flex flex-col relative border border-border/30 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 bg-card"
              direction={index % 2 === 0 ? "up" : "down"}
            >
              <div className="h-52 relative overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  width={500}
                  height={300}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  priority
                />

                {/* Stylized pattern overlay */}
                <div className="absolute inset-0 bg-opacity-10 bg-grid-pattern"></div>
              </div>
              
              <div className="p-6 flex flex-col flex-grow">
                {project.demoUrl ? (
                  <a 
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <motion.h3 
                      className="text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-300 flex items-center cursor-pointer"
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      {project.title}
                    </motion.h3>
                  </a>
                ) : (
                  <motion.h3 
                    className="text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-300 flex items-center"
                  >
                    {project.title}
                  </motion.h3>
                )}
                
                <p className="text-muted-foreground mb-5 flex-grow">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span 
                      key={tech}
                      className="px-3 py-1 text-xs font-medium rounded-full bg-accent/60 text-foreground border border-primary/10 hover:bg-accent transition-colors duration-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Subtle gradient highlight on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-b from-transparent to-primary/5 pointer-events-none transition-opacity duration-300"></div>
            </AnimatedCard>
            
            {/* Action buttons overlay */}
            {(project.demoUrl || project.sourceUrl) && (
              <div 
                className={`absolute inset-0 bg-black/70 flex items-center justify-center gap-5 transition-all duration-300 z-10 rounded-xl ${
                  activeProject === index ? 'opacity-100' : 'opacity-0 md:group-hover:opacity-100'
                }`}
              >
                <div className={`flex items-center justify-center gap-5 transition-transform duration-300 transform ${
                  activeProject === index ? 'translate-y-0' : 'translate-y-4 md:group-hover:translate-y-0'
                }`}>
                  {project.demoUrl && (
                    <a 
                      href={project.demoUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground shadow-lg hover:scale-110 active:scale-95 transition-transform"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ArrowUpRight size={20} />
                    </a>
                  )}
                  {project.sourceUrl && (
                    <a 
                      href={project.sourceUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-full bg-background flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-transform"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Github size={20} />
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}