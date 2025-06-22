import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, useInView } from 'framer-motion';
import { Users, Calendar, Coffee, ArrowRight, Star, Heart, Zap, Target, Clock, Network, Sparkles, Rocket, Crown, TrendingUp, Handshake, Award, Shield, CheckCircle, Globe, Linkedin, Twitter, Mail, ChevronDown, Quote } from 'lucide-react';
// Import des composants existants sans les recréer
import SidebarNav from '../components/Nav/SidebarNav';
import MobileBurger from '../components/Nav/MobileBurger';
import Footer from '../components/Footer';

// Données Premium
const communityStats = [
  { value: "150", suffix: "+", label: "Entrepreneurs", color: "from-violet-500 to-purple-500" },
  { value: "30", suffix: "M€", label: "Levés ensemble", color: "from-emerald-500 to-teal-500" },
  { value: "92", suffix: "%", label: "Taux de synergie", color: "from-amber-500 to-orange-500" },
];

const communityBenefits = [
  { 
    icon: Network, 
    title: "Capital Relationnel", 
    description: "Accédez à un réseau trié sur le volet de décideurs, investisseurs et innovateurs.",
    gradient: "from-violet-600 to-indigo-600",
    stats: "500+ connexions/mois"
  },
  { 
    icon: Sparkles, 
    title: "Intelligence Collective", 
    description: "Bénéficiez de l'expertise croisée de 150+ entrepreneurs accomplis.",
    gradient: "from-emerald-600 to-teal-600",
    stats: "50+ experts"
  },
  { 
    icon: Rocket, 
    title: "Accélération Business", 
    description: "Trouvez vos futurs associés, clients stratégiques et partenaires de croissance.",
    gradient: "from-orange-600 to-red-600",
    stats: "3x croissance moyenne"
  },
  { 
    icon: Crown, 
    title: "Événements Exclusifs", 
    description: "Masterclasses privées, soirées VIP et sessions de co-création premium.",
    gradient: "from-purple-600 to-pink-600",
    stats: "2 events/semaine"
  },
];

const upcomingEvents = [
  { 
    id: 1, 
    category: "NETWORKING",
    title: "Dîner des Décideurs", 
    date: "28 JUIN 2025", 
    time: "19:00",
    description: "Rencontre exclusive avec 20 CEOs de la Tech marseillaise",
    seats: "20 places",
    level: "C-Level only",
    image: "https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=800",
    gradient: "from-violet-600 to-indigo-600"
  },
  { 
    id: 2, 
    category: "MASTERCLASS",
    title: "Scale-Up Strategies", 
    date: "12 JUILLET 2025",
    time: "14:00", 
    description: "Comment passer de 1 à 10M€ de CA avec Xavier Niel",
    seats: "50 places",
    level: "Founders",
    image: "https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=800",
    gradient: "from-emerald-600 to-teal-600"
  },
  { 
    id: 3, 
    category: "PITCH SESSION",
    title: "Investors Day", 
    date: "25 JUILLET 2025",
    time: "09:00", 
    description: "Pitchez devant 15 VCs et Business Angels accrédités",
    seats: "10 startups",
    level: "Sur sélection",
    image: "https://images.pexels.com/photos/7176026/pexels-photo-7176026.jpeg?auto=compress&cs=tinysrgb&w=800",
    gradient: "from-orange-600 to-red-600"
  },
];

const testimonials = [
  {
    name: "Sophie Martin",
    role: "CEO, TechCorp",
    photo: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400",
    quote: "En 6 mois au 40, j'ai levé 2M€ et trouvé mon CTO. L'écosystème est une vraie machine à opportunités.",
    metric: "2M€ levés"
  },
  {
    name: "Thomas Dubois",
    role: "Founder, GreenTech",
    photo: "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=400",
    quote: "La qualité du réseau est exceptionnelle. Chaque membre apporte une réelle valeur ajoutée.",
    metric: "5 partenariats"
  },
  {
    name: "Marie Chen",
    role: "CPO, DataFlow",
    photo: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400",
    quote: "Les masterclasses m'ont fait gagner 2 ans. J'ai évité toutes les erreurs classiques du scale-up.",
    metric: "x3 croissance"
  }
];

const admissionSteps = [
  {
    number: "01",
    title: "Candidature",
    description: "Soumettez votre profil et votre vision entrepreneuriale",
    icon: Mail
  },
  {
    number: "02", 
    title: "Sélection",
    description: "Entretien avec notre comité d'admission",
    icon: Shield
  },
  {
    number: "03",
    title: "Intégration", 
    description: "Welcome pack et mentorat personnalisé",
    icon: Heart
  },
  {
    number: "04",
    title: "Activation",
    description: "Accès illimité à tous les avantages membres",
    icon: Zap
  }
];

// Composant Stat Counter Animé
const AnimatedCounter = ({ value, suffix = "", delay = 0 }) => {
  const [count, setCount] = useState(0);
  const nodeRef = useRef(null);
  const isInView = useInView(nodeRef, { once: true });
  
  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        const end = parseInt(value);
        const duration = 2000;
        const increment = end / (duration / 16);
        
        let current = 0;
        const counter = setInterval(() => {
          current += increment;
          if (current >= end) {
            setCount(end);
            clearInterval(counter);
          } else {
            setCount(Math.floor(current));
          }
        }, 16);
        
        return () => clearInterval(counter);
      }, delay);
      
      return () => clearTimeout(timer);
    }
  }, [value, delay, isInView]);
  
  return (
    <span ref={nodeRef} className="tabular-nums">
      {count}{suffix}
    </span>
  );
};

// Composant Carte 3D Interactive
const Benefit3DCard = ({ benefit, index }) => {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const rotateX = useTransform(mouseY, [-100, 100], [10, -10]);
  const rotateY = useTransform(mouseX, [-100, 100], [-10, 10]);
  
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };
  
  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };
  
  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.8 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setIsHovered(true)}
      style={{ perspective: 1000 }}
      className="relative group"
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="relative h-full"
      >
        {/* Glow Effect */}
        <motion.div
          className={`absolute -inset-[1px] bg-gradient-to-r ${benefit.gradient} rounded-3xl opacity-0 group-hover:opacity-50 blur-xl transition-opacity duration-500`}
        />
        
        {/* Card */}
        <div className="relative h-full bg-black/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 overflow-hidden group-hover:border-white/20 transition-all duration-500">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 1px)`,
              backgroundSize: '20px 20px'
            }} />
          </div>
          
          {/* Icon */}
          <motion.div
            animate={{ rotate: isHovered ? 360 : 0 }}
            transition={{ duration: 0.8 }}
            className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${benefit.gradient} mb-6`}
          >
            <benefit.icon className="w-8 h-8 text-white" />
          </motion.div>
          
          {/* Content */}
          <h3 className="text-2xl font-bold text-white mb-3">{benefit.title}</h3>
          <p className="text-white/70 mb-4">{benefit.description}</p>
          
          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0.5 }}
            className="text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60"
          >
            {benefit.stats}
          </motion.div>
          
          {/* Decorative Elements */}
          <motion.div
            className="absolute top-0 right-0 w-32 h-32 opacity-10"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <div className={`w-full h-full bg-gradient-to-br ${benefit.gradient} rounded-full blur-3xl`} />
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Composant Event Card Premium
const EventCard = ({ event, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.2, duration: 0.8 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative"
    >
      <div className="relative overflow-hidden rounded-3xl bg-black/40 backdrop-blur-xl border border-white/10 group-hover:border-white/20 transition-all duration-500">
        {/* Image Container */}
        <div className="relative h-64 overflow-hidden">
          <motion.img 
            src={event.image} 
            alt={event.title}
            className="w-full h-full object-cover"
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.5 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
          
          {/* Category Badge */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="absolute top-6 left-6"
          >
            <span className={`inline-flex items-center px-4 py-2 rounded-full text-xs font-bold text-white bg-gradient-to-r ${event.gradient}`}>
              {event.category}
            </span>
          </motion.div>
        </div>
        
        {/* Content */}
        <div className="p-8">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">{event.title}</h3>
              <p className="text-white/70">{event.description}</p>
            </div>
          </div>
          
          {/* Meta Info */}
          <div className="flex items-center gap-6 text-sm text-white/60 mb-6">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{event.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{event.time}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>{event.seats}</span>
            </div>
          </div>
          
          {/* Footer */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-white/40">{event.level}</span>
            <motion.button
              whileHover={{ x: 5 }}
              className="flex items-center gap-2 text-white font-semibold"
            >
              Réserver ma place
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Composant Principal
export default function Community() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -500]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0.3]);

  return (
    <div ref={containerRef} className="min-h-screen bg-black text-white overflow-hidden">
      {/* Sidebar Navigation */}
      <SidebarNav />
      
      {/* Mobile Menu */}
      <MobileBurger />
      
      {/* Main Content - with margin for sidebar */}
      <main className="lg:ml-[260px]">
        {/* Hero Section Épique */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Animé */}
        <div className="absolute inset-0">
          <motion.div 
            style={{ y: backgroundY }}
            className="absolute inset-0 opacity-50"
          >
            {/* Mesh Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-violet-900/20 via-black to-emerald-900/20" />
            
            {/* Animated Orbs */}
            <motion.div
              className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-600/30 rounded-full blur-[128px]"
              animate={{
                x: [0, 100, 0],
                y: [0, -100, 0],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-600/30 rounded-full blur-[128px]"
              animate={{
                x: [0, -100, 0],
                y: [0, 100, 0],
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>
          
          {/* Grid Pattern */}
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }} />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 text-sm font-medium text-white/70">
              <Sparkles className="w-4 h-4" />
              Réseau Premium
            </span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-7xl md:text-8xl lg:text-9xl font-black font-montserrat mb-6"
          >
            <span className="text-white">LE</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-purple-400 to-pink-400">
              CERCLE
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto mb-12"
          >
            Un réseau exclusif où l'excellence attire l'excellence
          </motion.p>
          
          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-8 md:gap-16"
          >
            {communityStats.map((stat, index) => (
              <div key={index} className="text-center">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className={`text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r ${stat.color}`}
                >
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} delay={index * 200} />
                </motion.div>
                <p className="text-sm text-white/50 uppercase tracking-wider mt-2">{stat.label}</p>
              </div>
            ))}
          </motion.div>
          
          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <ChevronDown className="w-6 h-6 text-white/40" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section avec Cartes 3D */}
      <section className="py-32 relative">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              Les Piliers de Notre
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-purple-400">
                Communauté
              </span>
            </h2>
            <p className="text-xl text-white/60 max-w-2xl mx-auto">
              Quatre fondamentaux qui font de notre réseau un accélérateur unique
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {communityBenefits.map((benefit, index) => (
              <Benefit3DCard key={index} benefit={benefit} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="py-32 bg-gradient-to-b from-black to-gray-950">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              Agenda
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">
                Premium
              </span>
            </h2>
            <p className="text-xl text-white/60 max-w-2xl mx-auto">
              Des événements soigneusement conçus pour maximiser votre impact
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {upcomingEvents.map((event, index) => (
              <EventCard key={event.id} event={event} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950 to-black" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              Ils Ont Rejoint
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">
                Le Cercle
              </span>
            </h2>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative group"
              >
                <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 h-full group-hover:border-white/20 transition-all duration-500">
                  {/* Quote Icon */}
                  <Quote className="absolute top-6 right-6 w-8 h-8 text-white/10" />
                  
                  {/* Content */}
                  <div className="flex items-start gap-4 mb-6">
                    <img 
                      src={testimonial.photo} 
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-bold text-white">{testimonial.name}</h3>
                      <p className="text-sm text-white/60">{testimonial.role}</p>
                    </div>
                  </div>
                  
                  <p className="text-white/80 mb-6 italic">"{testimonial.quote}"</p>
                  
                  <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-500/30">
                    <span className="text-sm font-bold text-emerald-400">{testimonial.metric}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Admission Process */}
      <section className="py-32 relative">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              Devenir
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                Membre
              </span>
            </h2>
            <p className="text-xl text-white/60 max-w-2xl mx-auto">
              Un processus sélectif pour garantir l'excellence
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {admissionSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                {/* Connection Line */}
                {index < admissionSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-[2px] bg-gradient-to-r from-white/20 to-transparent" />
                )}
                
                <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 text-center hover:border-white/20 transition-all duration-500">
                  {/* Number */}
                  <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white/20 to-white/10 mb-4">
                    {step.number}
                  </div>
                  
                  {/* Icon */}
                  <div className="inline-flex p-4 rounded-2xl bg-white/10 mb-4">
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-white/60 text-sm">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-40 relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-violet-900/20 via-purple-900/20 to-pink-900/20" />
          <motion.div
            className="absolute inset-0 opacity-30"
            animate={{
              backgroundPosition: ['0% 0%', '100% 100%'],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 1px)',
              backgroundSize: '50px 50px'
            }}
          />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-6xl md:text-7xl font-bold mb-6">
              Prêt à Rejoindre
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-purple-400 to-pink-400">
                L'Élite ?
              </span>
            </h2>
            
            <p className="text-xl text-white/70 mb-12 max-w-2xl mx-auto">
              Candidatez maintenant et transformez votre trajectoire entrepreneuriale
            </p>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative inline-flex items-center gap-4 px-12 py-6 text-lg font-bold"
            >
              {/* Background Glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 to-purple-600 rounded-full blur-xl opacity-70 group-hover:opacity-100 transition-opacity" />
              
              {/* Button */}
              <div className="relative flex items-center gap-4 px-12 py-6 bg-gradient-to-r from-violet-600 to-purple-600 rounded-full">
                <span>Déposer Ma Candidature</span>
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.div>
              </div>
            </motion.button>
            
            <p className="mt-8 text-sm text-white/40">
              Adhésion sur dossier uniquement • 95% de taux de satisfaction membre
            </p>
          </motion.div>
        </div>
      </section>
      </main>
      
      <Footer />
      
      {/* Noise Texture Overlay */}
      <div className="fixed inset-0 opacity-[0.015] pointer-events-none mix-blend-overlay z-[100]">
        <svg width="100%" height="100%">
          <filter id="noiseFilter">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="1" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseFilter)" />
        </svg>
      </div>
    </div>
  );
}