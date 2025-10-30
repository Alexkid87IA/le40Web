import { useState, useEffect, useRef, ImgHTMLAttributes } from 'react';
import { motion } from 'framer-motion';

interface LazyImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'placeholder'> {
  src: string;
  alt: string;
  placeholder?: string;
  threshold?: number;
  className?: string;
  onLoad?: () => void;
  blurDataURL?: string;
}

export default function LazyImage({
  src,
  alt,
  placeholder = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect width="400" height="300" fill="%23333"%3E%3C/rect%3E%3C/svg%3E',
  threshold = 0.1,
  className = '',
  onLoad,
  blurDataURL,
  ...props
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(blurDataURL || placeholder);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!imgRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      {
        threshold,
        rootMargin: '50px',
      }
    );

    observer.observe(imgRef.current);

    return () => {
      observer.disconnect();
    };
  }, [threshold]);

  useEffect(() => {
    if (isInView && src) {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        setCurrentSrc(src);
        setIsLoaded(true);
        onLoad?.();
      };
      img.onerror = () => {
        console.error(`Failed to load image: ${src}`);
        setIsLoaded(true);
      };
    }
  }, [isInView, src, onLoad]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <motion.img
        ref={imgRef}
        src={currentSrc}
        alt={alt}
        className={`w-full h-full object-cover transition-all duration-700 ${
          isLoaded ? 'blur-0 scale-100' : 'blur-md scale-105'
        }`}
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0.6 }}
        transition={{ duration: 0.5 }}
        loading="lazy"
        decoding="async"
        {...props}
      />

      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 animate-pulse" />
      )}
    </div>
  );
}
