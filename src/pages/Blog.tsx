import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, ArrowRight, Search, Filter, BookOpen } from 'lucide-react';
import HeaderNav from '../components/Nav/HeaderNav';
import MobileBurger from '../components/Nav/MobileBurger';
import Footer from '../components/Footer';
import { blogPosts } from '../data/mockData';

// Extended mock blog posts for pagination demo
const allBlogPosts = [
  ...blogPosts,
  {
    id: 4,
    title: "L'avenir du travail hybride",
    excerpt: "Comment les entreprises s'adaptent aux nouveaux modes de travail post-pandémie.",
    image: "https://images.pexels.com/photos/4226140/pexels-photo-4226140.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "Futur du travail",
    readTime: "6 min"
  },
  {
    id: 5,
    title: "Networking efficace en coworking",
    excerpt: "Stratégies pour développer votre réseau professionnel dans un espace de coworking.",
    image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "Networking",
    readTime: "4 min"
  },
  {
    id: 6,
    title: "Domiciliation : aspects légaux",
    excerpt: "Tout ce qu'il faut savoir sur les obligations légales de la domiciliation d'entreprise.",
    image: "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "Juridique",
    readTime: "7 min"
  }
];

const categories = ["Tous", "Tendances", "Productivité", "Entrepreneuriat", "Futur du travail", "Networking", "Juridique"];

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  // Filter posts
  const filteredPosts = allBlogPosts.filter(post => {
    const matchesCategory = selectedCategory === "Tous" || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Pagination
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const currentPosts = filteredPosts.slice(startIndex, startIndex + postsPerPage);

  return (
    <div className="min-h-screen bg-[#0F172A]">
      <HeaderNav />
      <MobileBurger />
      
      <main className="pt-32">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-b from-[#0F172A] to-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h1 className="text-5xl sm:text-6xl font-bold text-white mb-6">
                Notre <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">Blog</span>
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Conseils d'experts, tendances et actualités pour accompagner votre réussite entrepreneuriale
              </p>
            </motion.div>
          </div>
        </section>

        {/* Filters */}
        <section className="py-12 bg-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
              {/* Search */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative flex-1 max-w-md"
              >
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Rechercher un article..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-300"
                />
              </motion.div>

              {/* Categories */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="flex flex-wrap gap-2"
              >
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => {
                      setSelectedCategory(category);
                      setCurrentPage(1);
                    }}
                    className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                      selectedCategory === category
                        ? 'bg-gradient-to-r from-orange-400 to-orange-600 text-white'
                        : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="py-20 bg-[#0F172A]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {currentPosts.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {currentPosts.map((post, index) => (
                    <motion.article
                      key={post.id}
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
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                          
                          <div className="absolute top-4 left-4 bg-gradient-to-r from-orange-400 to-orange-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                            {post.category}
                          </div>

                          <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-md rounded-full px-3 py-1 flex items-center">
                            <Clock className="w-3 h-3 text-white mr-1" />
                            <span className="text-white text-xs">{post.readTime}</span>
                          </div>
                        </div>

                        <div className="p-6">
                          <h3 className="text-xl font-bold text-white mb-3 group-hover:text-orange-400 transition-colors line-clamp-2">
                            {post.title}
                          </h3>
                          <p className="text-gray-300 mb-4 text-sm leading-relaxed line-clamp-3">
                            {post.excerpt}
                          </p>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center text-orange-400 font-medium text-sm group-hover:text-orange-300 transition-colors">
                              <span>Lire l'article</span>
                              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.article>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="flex justify-center mt-16"
                  >
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                        className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                      >
                        Précédent
                      </button>
                      
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                            currentPage === page
                              ? 'bg-gradient-to-r from-orange-400 to-orange-600 text-white'
                              : 'bg-white/10 text-white hover:bg-white/20'
                          }`}
                        >
                          {page}
                        </button>
                      ))}
                      
                      <button
                        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                      >
                        Suivant
                      </button>
                    </div>
                  </motion.div>
                )}
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center py-16"
              >
                <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-white mb-4">
                  Aucun article trouvé
                </h3>
                <p className="text-gray-300 mb-8">
                  Essayez de modifier vos critères de recherche ou de sélectionner une autre catégorie.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory("Tous");
                    setSearchTerm("");
                    setCurrentPage(1);
                  }}
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-orange-400 to-orange-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-orange-500/25 transition-all duration-300"
                >
                  Réinitialiser les filtres
                </button>
              </motion.div>
            )}
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="py-20 bg-slate-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                Restez informé de nos derniers articles
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Recevez nos conseils d'experts directement dans votre boîte mail
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Votre email"
                  className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-300"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-gradient-to-r from-orange-400 to-orange-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-orange-500/25 transition-all duration-300"
                >
                  S'abonner
                </motion.button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}