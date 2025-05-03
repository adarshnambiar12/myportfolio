"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface TypingEffectProps {
  phrases: string[];
  typingSpeed?: number;
  deleteSpeed?: number;
  delayBetweenPhrases?: number;
  className?: string;
}

export default function TypingEffect({
  phrases,
  typingSpeed = 100,
  deleteSpeed = 50,
  delayBetweenPhrases = 1000,
  className = "",
}: TypingEffectProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (isWaiting) {
      timeout = setTimeout(() => {
        setIsWaiting(false);
        setIsDeleting(true);
      }, delayBetweenPhrases);
      return () => clearTimeout(timeout);
    }

    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      if (displayedText === "") {
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % phrases.length);
      } else {
        timeout = setTimeout(() => {
          setDisplayedText(displayedText.slice(0, -1));
        }, deleteSpeed);
      }
    } else {
      if (displayedText === currentPhrase) {
        setIsWaiting(true);
      } else {
        timeout = setTimeout(() => {
          setDisplayedText(currentPhrase.slice(0, displayedText.length + 1));
        }, typingSpeed);
      }
    }

    return () => clearTimeout(timeout);
  }, [
    displayedText,
    phraseIndex,
    isDeleting,
    isWaiting,
    phrases,
    typingSpeed,
    deleteSpeed,
    delayBetweenPhrases,
  ]);

  return (
    <div className={`inline-block relative ${className}`}>
      <span className="inline-block">
        {displayedText}
      </span>
      
      <motion.span
        animate={{ 
          opacity: isWaiting || displayedText.length === 0 ? [1, 0, 1] : 1 
        }}
        transition={{ 
          duration: 0.8, 
          repeat: isWaiting || displayedText.length === 0 ? Infinity : 0 
        }}
        className="inline-block w-[2px] h-[1.2em] bg-primary ml-1 relative top-[2px]"
      />
    </div>
  );
}