"use client";

import { useState, useEffect } from "react";

interface TypewriterEffectProps {
  phrases?: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
}

const DEFAULT_PHRASES = [
  "Discover. Learn. Excel in Computer Science.",
  "Master Algorithms and Data Structures.",
  "Build Cutting-Edge Web Applications.",
  "Explore the World of Artificial Intelligence.",
  "Secure the Digital Frontier with Cybersecurity.",
  "Learn Cloud Computing and DevOps.",
  "Dive into Mobile App Development.",
  "Master Database Management Systems.",
  "Explore Software Architecture.",
  "Learn System Design Principles.",
];

export function TypewriterEffect({
  phrases = DEFAULT_PHRASES,
  typingSpeed = 80,
  deletingSpeed = 30,
  pauseDuration = 2000,
}: TypewriterEffectProps) {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = phrases[currentPhraseIndex];
    if (!currentPhrase) return;

    const typeText = () => {
      if (isDeleting) {
        if (currentText === "") {
          setIsDeleting(false);
          const nextIndex = (currentPhraseIndex + 1) % phrases.length;
          setCurrentPhraseIndex(nextIndex);
          return pauseDuration;
        }
        setCurrentText((prev) => prev.slice(0, -1));
        return deletingSpeed;
      } else {
        if (currentText === currentPhrase) {
          setIsDeleting(true);
          return pauseDuration;
        }
        setCurrentText((prev) => currentPhrase.slice(0, prev.length + 1));
        return typingSpeed;
      }
    };

    const timeout = setTimeout(
      typeText,
      isDeleting ? deletingSpeed : typingSpeed
    );

    return () => clearTimeout(timeout);
  }, [
    currentPhraseIndex,
    currentText,
    isDeleting,
    phrases,
    typingSpeed,
    deletingSpeed,
    pauseDuration,
  ]);

  return (
    <div className="text-xl md:text-2xl text-center mb-8 text-gray-600 dark:text-gray-300 h-16 flex items-center justify-center">
      <span className="inline-block">
        {currentText}
        <span className="ml-1 inline-block w-[3px] h-[1.2em] bg-blue-500 align-middle animate-blink"></span>
      </span>
    </div>
  );
}
