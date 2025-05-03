"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter, Instagram, Check, Loader2 } from "lucide-react";
import SectionTitle from "@/components/ui/SectionTitle";
import { db } from "@/firebase/firebaseConfig";
import { addDoc, collection } from "firebase/firestore";
import Image from "next/image";
import { useTheme } from "next-themes";

export default function Contact() {
  const { theme } = useTheme();
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  
  // Add button state to track submission status
  const [buttonState, setButtonState] = useState<"idle" | "sending" | "sent">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (buttonState === "sent") {
      timer = setTimeout(() => {
        setButtonState("idle");
      }, 3000);
    }
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [buttonState]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setButtonState("sending");
    
    try {
      const docRef = await addDoc(collection(db, "contacts"), {
        name: formState.name,
        email: formState.email,
        subject: formState.subject,
        message: formState.message,
        createdAt: new Date(),
      });
      console.log("Message Sent Successfully with ID: ", docRef.id);
      
      setTimeout(() => {
        setButtonState("sent");
      }, 500);
      
    } catch (error) {
      console.error("Error sending message : ", error);
      setButtonState("idle");
    }
    finally {
      setFormState({ name: "", email: "", subject: "", message: "" });
    }
  };

  const socialIcons = {
    github: { element: <Github className="w-5 h-5" />, href: "https://github.com/adarshnambiar12" },
    linkedin: { element: <Linkedin className="w-5 h-5" />, href: "https://www.linkedin.com/in/adarshnambiar12/" },
    twitter: { element: <Twitter className="w-5 h-5" />, href: "https://x.com/adarshnambiarr" },
    instagram: { element: <Instagram className="w-5 h-5" />, href: "https://www.instagram.com/adarshnambiar12/" },
  };

  // Button content based on state
  const buttonContent = {
    idle: (
      <>
        <Send className="w-5 h-5 mr-2" />
        <span>Send Message</span>
      </>
    ),
    sending: (
      <>
        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
        <span>Message Sending</span>
      </>
    ),
    sent: (
      <>
        <Check className="w-5 h-5 mr-2" />
        <span>Message Sent</span>
      </>
    ),
  };

  return (
    <section id="contact" className="py-16 sm:py-20 container mx-auto px-4 sm:px-6 relative">
      <SectionTitle title="Get In Touch" />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-card/30 p-6 sm:p-8 rounded-xl border border-border/40 relative backdrop-blur-sm"
        >
          {/* show logo here */}
          <motion.a
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="block w-20 h-20 my-6"
            href="https://adarshnambiar.me"
          >
            <Image
              src="/images/logo.svg"
              alt="Logo"
              width={128}
              height={128}
              className={`w-full h-full object-cover ${theme !== "light" ? "invert" : ""}`}
              priority
            />
          </motion.a>

          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-2xl font-bold mb-8"
          >
            Contact Information
          </motion.h3>
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              visible: { 
                opacity: 1,
                transition: { staggerChildren: 0.1 }
              }
            }}
            className="space-y-6 sm:space-y-8"
          >
            {[
              { icon: <Mail className="w-5 h-5 text-primary" />, title: "Email", content: "adarshnambiar4912@gmail.com", href: "mailto:adarshnambiar4912@gmail.com" },
              { icon: <Phone className="w-5 h-5 text-primary" />, title: "Phone", content: "+91 70392 96077", href: "tel:+917039296077" },
              { icon: <MapPin className="w-5 h-5 text-primary" />, title: "Location", content: "Mumbai, Maharashtra, India" }
            ].map((item) => (
              <motion.div 
                key={item.title}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                }}
                className="flex items-start group"
              >
                <motion.div 
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mr-3 sm:mr-5 shrink-0"
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                >
                  {item.icon}
                </motion.div>
                <div className="min-w-0 flex-1">
                  <h4 className="text-base sm:text-lg font-medium mb-0.5 sm:mb-1">{item.title}</h4>
                  {item.href ? (
                    <a 
                      href={item.href} 
                      className="text-sm sm:text-base text-muted-foreground hover:text-primary transition-colors duration-300 group-hover:underline break-words"
                    >
                      {item.content}
                    </a>
                  ) : (
                    <p className="text-sm sm:text-base text-muted-foreground break-words">
                      {item.content}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-12"
          >
            <h4 className="text-lg font-medium mb-4">Follow Me</h4>
            <div className="flex gap-4">
              {Object.entries(socialIcons).map(([social, icon]) => (
                <motion.a
                  key={social}
                  href={icon.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 shadow-sm"
                  whileHover={{ y: -3, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {icon.element}
                </motion.a>
              ))}
            </div>
          </motion.div>
          
          {/* Decorative element */}
          <div className="absolute top-0 right-0 w-32 h-32 rounded-full border border-primary/10 -z-10 opacity-20 translate-x-8 -translate-y-8"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full border border-border -z-10 opacity-20 -translate-x-6 translate-y-6"></div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="p-6 sm:p-8 rounded-xl border border-border/40 bg-card/30 backdrop-blur-sm relative"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2 text-foreground/80">
                  Your Name
                </label>
                <motion.div whileHover={{ scale: 1.01 }} transition={{ duration: 0.2 }}>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    required
                    autoComplete="true"
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all shadow-sm"
                    placeholder="John Doe"
                  />
                </motion.div>
              </div>
            </div>

            <div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2 text-foreground/80">
                  Your Email
                </label>
                <motion.div whileHover={{ scale: 1.01 }} transition={{ duration: 0.2 }}>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    required
                    autoComplete="true"
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all shadow-sm"
                    placeholder="john@example.com"
                  />
                </motion.div>
              </div>
            </div>
            
            <div>
              <label htmlFor="subject" className="block text-sm font-medium mb-2 text-foreground/80">
                Subject
              </label>
              <motion.div whileHover={{ scale: 1.01 }} transition={{ duration: 0.2 }}>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formState.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all shadow-sm"
                  placeholder="Project Inquiry"
                />
              </motion.div>
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2 text-foreground/80">
                Message
              </label>
              <motion.div whileHover={{ scale: 1.01 }} transition={{ duration: 0.2 }}>
                <textarea
                  id="message"
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all resize-none shadow-sm"
                  placeholder="Your message here..."
                />
              </motion.div>
            </div>
            
            <motion.button
              whileHover={buttonState === "idle" ? { scale: 1.02, boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)" } : {}}
              whileTap={buttonState === "idle" ? { scale: 0.98 } : {}}
              type="submit"
              disabled={buttonState !== "idle"}
              className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-medium flex items-center justify-center hover:bg-primary/90 transition-all duration-300 shadow-md"
            >
              {buttonContent[buttonState]}
            </motion.button>
          </form>
          
          {/* Decorative pattern */}
          <div className="absolute top-0 right-0 w-24 h-24 rounded-full border border-primary/10 -z-10 opacity-20 translate-x-6 -translate-y-6"></div>
        </motion.div>
      </div>
      
      {/* Background accent */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent to-background/5 pointer-events-none"></div>
    </section>
  );
}