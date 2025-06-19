import React from 'react';
import { motion } from 'framer-motion';
import { Clock, ArrowRight, BookOpen, Sparkles, Calendar } from 'lucide-react';
import { blogPosts } from '../../data/mockData';

export default function BlogPreview() {
  return (
    <section id="blog-preview" className="py-32 bg-black-nuanced relative film-grain">
      <div className="max-w-7xl mx-auto px-8 lg:px-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center px-6 py-3 glass-effect rounded-full border border-white/20 mb-8"
          >
            <BookOpen className="w-4 h-4 text-blog mr-2" />
            <span className="text-sm font-inter font-medium text-white/80 tracking-wide">INSIGHTS & EXPERTISE</span>
          </motion.div>

          <h2 className="text-section-title font-montserrat font-black text-white mb-8">
            Nos derniers <span className="bg-gradient-to-r from-blog to-teal-600 bg-clip-text text-transparent">articles</span>
          </h2>
          <p className="text-body-large font-inter text-white/70 max-w-4xl mx-auto leading-relaxed">
            Conseils d'experts, tendances et actualités pour accompagner votre réussite entrepreneuriale et nourrir votre vision
          </p>
        </motion.div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.8 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group cursor-pointer h-full"
            >
              <div className="glass-effect border border-white/10 rounded-4xl overflow-hidden hover:border-white/20 transition-all duration-500 h-full relative">
                {/* Hover glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blog/10 to-teal-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-4xl"></div>
                
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover ken-burns group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black-deep/80 via-transparent to-black-nuanced/30"></div>
                  
                  {/* Category Badge */}
                  <div className="absolute top-6 left-6 bg-gradient-to-r from-blog to-teal-600 text-white px-4 py-2 rounded-full text-xs font-montserrat font-semibold tracking-wide">
                    {post.category}
                  </div>

                  {/* Read Time */}
                  <div className="absolute bottom-6 right-6 glass-effect rounded-full px-4 py-2 flex items-center border border-white/20">
                    <Clock className="w-3 h-3 text-white mr-2" />
                    <span className="text-white font-inter text-xs tracking-wide">{post.readTime}</span>
                  </div>

                  {/* Article Number */}
                  <div className="absolute bottom-6 left-6 w-10 h-10 glass-effect rounded-full flex items-center justify-center border border-white/20">
                    <span className="text-white font-playfair font-bold text-sm">{post.id}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <h3 className="text-2xl font-montserrat font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blog group-hover:to-teal-600 group-hover:bg-clip-text transition-all duration-500 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-white/70 font-inter mb-8 leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>

                  {/* CTA */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-blog font-inter font-medium group-hover:text-teal-400 transition-colors duration-500">
                      <span className="group-hover:translate-x-1 transition-transform duration-300">Lire l'article</span>
                      <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-2 transition-transform duration-300" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-center"
        >
          <motion.a
            href="/blog"
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.98 }}
            className="group inline-flex items-center px-10 py-5 glass-effect text-white font-montserrat font-semibold text-lg rounded-2xl border border-white/20 hover:bg-white/10 hover:border-white/30 transition-all duration-500"
          >
            <BookOpen className="w-6 h-6 mr-3" />
            <span className="tracking-wide">Voir tous les articles</span>
            <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}