import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholderSrc?: string;
  width?: number;
  height?: number;
  onLoad?: () => void;
  onError?: () => void;
}

/**
 * LazyImage component with intersection observer
 * Loads images only when they enter the viewport
 */
const LazyImage = React.memo(function LazyImage({
  src,
  alt,
  className = '',
  placeholderSrc,
  width,
  height,
  onLoad,
  onError,
}: LazyImageProps) {
  const [imageSrc, setImageSrc] = useState<string | null>(placeholderSrc || null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // Intersection Observer to detect when image enters viewport
  useEffect(() => {
    if (!imgRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect(); // Stop observing once image is in view
          }
        });
      },
      {
        rootMargin: '100px', // Load images 100px before they enter viewport
        threshold: 0.01,
      }
    );

    observer.observe(imgRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  // Load image when in view
  useEffect(() => {
    if (!isInView) return;

    const img = new Image();
    img.src = src;

    img.onload = () => {
      setImageSrc(src);
      setIsLoaded(true);
      onLoad?.();
    };

    img.onerror = () => {
      console.error(`Failed to load image: ${src}`);
      onError?.();
    };
  }, [isInView, src, onLoad, onError]);

  return (
    <motion.img
      ref={imgRef}
      src={imageSrc || 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect fill="%23f3f4f6" width="400" height="300"/%3E%3C/svg%3E'}
      alt={alt}
      width={width}
      height={height}
      className={className}
      loading="lazy" // Native lazy loading as fallback
      initial={{ opacity: 0 }}
      animate={{ opacity: isLoaded ? 1 : 0.5 }}
      transition={{ duration: 0.3 }}
      style={{
        backgroundColor: '#f3f4f6', // Placeholder background
      }}
    />
  );
});

export default LazyImage;
