import { motion } from 'framer-motion';

interface SectionHeaderProps {
  title: string;
  highlightedText?: string;
  subtitle?: string;
  className?: string;
}

export default function SectionHeader({ title, highlightedText, subtitle, className = '' }: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={className}
    >
      <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-white text-center mb-4 md:mb-6 px-4 leading-tight">
        {title}{' '}
        {highlightedText && (
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">
            {highlightedText}
          </span>
        )}
      </h2>
      {subtitle && (
        <p className="text-base md:text-lg lg:text-xl text-white/60 text-center max-w-3xl mx-auto px-4">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
