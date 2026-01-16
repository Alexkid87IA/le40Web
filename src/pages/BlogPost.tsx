import React from 'react';
import { motion } from 'framer-motion';
import { Clock, ArrowLeft, ArrowRight, Share2, BookOpen, Calendar, User } from 'lucide-react';
import { useParams } from 'react-router-dom';
import HeaderNav from '../components/Nav/HeaderNav';
import MobileBurger from '../components/Nav/MobileBurger';
import Footer from '../components/Footer';
import { blogPosts } from '../data/mockData';

// Mock article content
const mockArticleContent = `
# Introduction

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.

## Les tendances actuelles

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

### Point important 1

Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis.

### Point important 2

Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus.

## Conclusion

At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias.

---

*Cet article vous a plu ? Partagez-le avec votre réseau !*
`;

export default function BlogPost() {
  const { slug } = useParams();
  
  // In a real app, you would fetch the post based on the slug
  // For now, we'll use the first post as a demo
  const post = blogPosts[0];
  const relatedPosts = blogPosts.slice(1, 3);

  if (!post) {
    return (
      <div className="min-h-screen bg-[#0F172A] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Article non trouvé</h1>
          <a href="/blog" className="text-orange-400 hover:text-orange-300">
            Retour au blog
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0F172A]">
      <HeaderNav />
      <MobileBurger />
      
      <main className="pt-32">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-b from-[#0F172A] to-slate-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Back Button */}
              <motion.a
                href="/blog"
                whileHover={{ x: -5 }}
                className="inline-flex items-center text-orange-400 hover:text-orange-300 mb-8 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Retour au blog
              </motion.a>

              {/* Category Badge */}
              <div className="inline-block bg-gradient-to-r from-orange-400 to-orange-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
                {post.category}
              </div>

              {/* Title */}
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
                {post.title}
              </h1>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-6 text-gray-300 mb-8">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span className="text-sm">15 janvier 2024</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  <span className="text-sm">{post.readTime}</span>
                </div>
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-2" />
                  <span className="text-sm">Équipe Le 40</span>
                </div>
              </div>

              {/* Share Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-xl hover:bg-white/20 hover:border-white/30 transition-all duration-300"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Partager
              </motion.button>
            </motion.div>
          </div>
        </section>

        {/* Article Content */}
        <section className="py-20 bg-slate-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
              {/* Main Content */}
              <motion.article
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-3"
              >
                {/* Featured Image */}
                <div className="relative h-64 sm:h-80 rounded-3xl overflow-hidden mb-12">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </div>

                {/* Article Body */}
                <div className="prose prose-lg prose-invert max-w-none">
                  <div className="text-gray-300 leading-relaxed space-y-6">
                    {/* TODO: Replace with MDX content or rich text from Sanity */}
                    <p className="text-xl text-gray-300 mb-8 font-medium">
                      {post.excerpt}
                    </p>
                    
                    <div className="space-y-6">
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                      </p>
                      
                      <h2 className="text-2xl font-bold text-white mt-8 mb-4">
                        Les tendances actuelles
                      </h2>
                      
                      <p>
                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                      </p>
                      
                      <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 my-8">
                        <h3 className="text-lg font-semibold text-orange-400 mb-3">
                          💡 Point clé à retenir
                        </h3>
                        <p className="text-gray-300">
                          Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis.
                        </p>
                      </div>
                      
                      <h3 className="text-xl font-bold text-white mt-6 mb-3">
                        Conseils pratiques
                      </h3>
                      
                      <ul className="space-y-2 text-gray-300">
                        <li className="flex items-start">
                          <span className="text-orange-400 mr-2">•</span>
                          Et harum quidem rerum facilis est et expedita distinctio
                        </li>
                        <li className="flex items-start">
                          <span className="text-orange-400 mr-2">•</span>
                          Nam libero tempore, cum soluta nobis est eligendi optio
                        </li>
                        <li className="flex items-start">
                          <span className="text-orange-400 mr-2">•</span>
                          Cumque nihil impedit quo minus id quod maxime
                        </li>
                      </ul>
                      
                      <h2 className="text-2xl font-bold text-white mt-8 mb-4">
                        Conclusion
                      </h2>
                      
                      <p>
                        At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Article Footer */}
                <div className="mt-12 pt-8 border-t border-white/10">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-400">
                      Publié le 15 janvier 2024 par l'équipe Le 40
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-xl hover:bg-white/20 hover:border-white/30 transition-all duration-300"
                    >
                      <Share2 className="w-4 h-4 mr-2" />
                      Partager
                    </motion.button>
                  </div>
                </div>
              </motion.article>

              {/* Sidebar */}
              <motion.aside
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-1"
              >
                <div className="sticky top-8 space-y-8">
                  {/* Table of Contents */}
                  <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                      <BookOpen className="w-5 h-5 mr-2 text-orange-400" />
                      Sommaire
                    </h3>
                    <nav className="space-y-2">
                      <a href="#introduction" className="block text-sm text-gray-300 hover:text-orange-400 transition-colors">
                        Introduction
                      </a>
                      <a href="#tendances" className="block text-sm text-gray-300 hover:text-orange-400 transition-colors">
                        Les tendances actuelles
                      </a>
                      <a href="#conseils" className="block text-sm text-gray-300 hover:text-orange-400 transition-colors">
                        Conseils pratiques
                      </a>
                      <a href="#conclusion" className="block text-sm text-gray-300 hover:text-orange-400 transition-colors">
                        Conclusion
                      </a>
                    </nav>
                  </div>

                  {/* Author Info */}
                  <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">
                      À propos de l'auteur
                    </h3>
                    <div className="flex items-center mb-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full flex items-center justify-center mr-3">
                        <User className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="font-semibold text-white">Équipe Le 40</div>
                        <div className="text-sm text-gray-400">Experts coworking</div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-300">
                      Notre équipe d'experts partage régulièrement conseils et tendances pour vous accompagner dans votre réussite professionnelle.
                    </p>
                  </div>
                </div>
              </motion.aside>
            </div>
          </div>
        </section>

        {/* Related Articles */}
        <section className="py-20 bg-[#0F172A]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-white mb-6">
                Articles <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">similaires</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedPosts.map((relatedPost, index) => (
                <motion.article
                  key={relatedPost.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="group cursor-pointer"
                >
                  <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={relatedPost.image}
                        alt={relatedPost.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      
                      <div className="absolute top-4 left-4 bg-gradient-to-r from-orange-400 to-orange-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                        {relatedPost.category}
                      </div>

                      <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-md rounded-full px-3 py-1 flex items-center">
                        <Clock className="w-3 h-3 text-white mr-1" />
                        <span className="text-white text-xs">{relatedPost.readTime}</span>
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-orange-400 transition-colors line-clamp-2">
                        {relatedPost.title}
                      </h3>
                      <p className="text-gray-300 mb-4 text-sm leading-relaxed line-clamp-3">
                        {relatedPost.excerpt}
                      </p>

                      <div className="flex items-center text-orange-400 font-medium text-sm group-hover:text-orange-300 transition-colors">
                        <span>Lire l'article</span>
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}