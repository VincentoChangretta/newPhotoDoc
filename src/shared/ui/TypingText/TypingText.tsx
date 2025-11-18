import { useEffect, useState } from 'react';

interface TypingTextProps {
   texts: string[]; // массив строк для анимации
   typingSpeed?: number; // скорость печати
   deletingSpeed?: number; // скорость удаления
   pauseTime?: number; // пауза перед удалением
   className?: string;
}

export const TypingText = ({
   texts,
   typingSpeed = 100,
   deletingSpeed = 50,
   pauseTime = 1500,
   className,
}: TypingTextProps) => {
   const [displayedText, setDisplayedText] = useState('');
   const [currentIndex, setCurrentIndex] = useState(0);
   const [charIndex, setCharIndex] = useState(0);
   const [deleting, setDeleting] = useState(false);

   useEffect(() => {
      if (!texts || texts.length === 0) return;

      const currentText = texts[currentIndex];
      let timeout: NodeJS.Timeout;

      if (!deleting && charIndex < currentText.length) {
         timeout = setTimeout(() => {
            setDisplayedText(currentText.slice(0, charIndex + 1));
            setCharIndex(charIndex + 1);
         }, typingSpeed);
      } else if (!deleting && charIndex === currentText.length) {
         timeout = setTimeout(() => setDeleting(true), pauseTime);
      } else if (deleting && charIndex > 0) {
         timeout = setTimeout(() => {
            setDisplayedText(currentText.slice(0, charIndex - 1));
            setCharIndex(charIndex - 1);
         }, deletingSpeed);
      } else if (deleting && charIndex === 0) {
         setDeleting(false);
         setCurrentIndex(prev => (prev + 1) % texts.length);
      }

      return () => clearTimeout(timeout);
   }, [charIndex, deleting, texts, currentIndex, typingSpeed, deletingSpeed, pauseTime]);

   return <span className={className}>{displayedText}</span>;
};
