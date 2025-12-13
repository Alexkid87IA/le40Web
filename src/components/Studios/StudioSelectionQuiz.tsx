import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, Check, Sparkles, Users, Video, Mic, Camera, Zap } from 'lucide-react';
import { studioSetups } from '../../data/studios/setups';

interface QuizQuestion {
  id: string;
  question: string;
  icon: React.ElementType;
  answers: {
    id: string;
    text: string;
    tags: string[];
    icon: React.ElementType;
  }[];
}

const quizQuestions: QuizQuestion[] = [
  {
    id: 'content-type',
    question: 'Quel type de contenu allez-vous créer ?',
    icon: Video,
    answers: [
      { id: 'podcast', text: 'Podcast / Interview', tags: ['podcast', 'interview', 'audio'], icon: Mic },
      { id: 'youtube', text: 'Vidéo YouTube / Formation', tags: ['youtube', 'solo', 'education'], icon: Camera },
      { id: 'social', text: 'Contenu réseaux sociaux', tags: ['tiktok', 'reels', 'shorts'], icon: Zap },
      { id: 'show', text: 'Émission / Table ronde', tags: ['show', 'team', 'talk'], icon: Users },
    ]
  },
  {
    id: 'team-size',
    question: 'Combien de personnes à l\'écran ?',
    icon: Users,
    answers: [
      { id: 'solo', text: '1 personne (solo)', tags: ['solo', '1-person'], icon: Users },
      { id: 'duo', text: '2-3 personnes', tags: ['duo', 'small-team'], icon: Users },
      { id: 'team', text: '4+ personnes', tags: ['team', 'large-team'], icon: Users },
    ]
  },
  {
    id: 'format',
    question: 'Format de production préféré ?',
    icon: Camera,
    answers: [
      { id: 'vertical', text: 'Vertical (TikTok, Reels)', tags: ['vertical', 'mobile', 'tiktok'], icon: Zap },
      { id: 'horizontal', text: 'Horizontal (YouTube, TV)', tags: ['horizontal', 'youtube', 'professional'], icon: Video },
      { id: 'both', text: 'Les deux formats', tags: ['multi-format', 'versatile'], icon: Sparkles },
    ]
  },
  {
    id: 'experience',
    question: 'Votre niveau d\'expérience ?',
    icon: Sparkles,
    answers: [
      { id: 'beginner', text: 'Débutant (besoin d\'aide)', tags: ['beginner', 'guided'], icon: Users },
      { id: 'intermediate', text: 'Intermédiaire', tags: ['intermediate', 'semi-pro'], icon: Camera },
      { id: 'expert', text: 'Expert (autonome)', tags: ['expert', 'pro'], icon: Sparkles },
    ]
  }
];

interface StudioSelectionQuizProps {
  onStudioSelected: (studioId: string) => void;
  onClose: () => void;
}

export default function StudioSelectionQuiz({ onStudioSelected, onClose }: StudioSelectionQuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [recommendation, setRecommendation] = useState<typeof studioSetups[0] | null>(null);

  const question = quizQuestions[currentQuestion];
  const isLastQuestion = currentQuestion === quizQuestions.length - 1;
  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;

  const handleAnswer = (answerId: string) => {
    const newAnswers = { ...answers, [question.id]: answerId };
    setAnswers(newAnswers);

    if (isLastQuestion) {
      const recommendedStudio = calculateRecommendation(newAnswers);
      setRecommendation(recommendedStudio);
    } else {
      setTimeout(() => {
        setCurrentQuestion(prev => prev + 1);
      }, 300);
    }
  };

  const calculateRecommendation = (userAnswers: Record<string, string>) => {
    const selectedTags = Object.entries(userAnswers).flatMap(([questionId, answerId]) => {
      const question = quizQuestions.find(q => q.id === questionId);
      const answer = question?.answers.find(a => a.id === answerId);
      return answer?.tags || [];
    });

    const studioScores = studioSetups.map(studio => {
      let score = 0;

      if (selectedTags.includes('solo') && studio.capacity.includes('1')) score += 3;
      if (selectedTags.includes('duo') && (studio.capacity.includes('2') || studio.capacity.includes('3'))) score += 3;
      if (selectedTags.includes('team') && !studio.capacity.includes('1-2')) score += 3;

      if (selectedTags.includes('tiktok') && studio.id === 'tiktok') score += 5;
      if (selectedTags.includes('podcast') && (studio.id === 'podcast-audio' || studio.id === 'intimiste')) score += 5;
      if (selectedTags.includes('youtube') && studio.id === 'face-cam') score += 5;
      if (selectedTags.includes('show') && studio.id === 'full-show') score += 5;

      if (selectedTags.includes('vertical') && studio.id === 'tiktok') score += 3;
      if (selectedTags.includes('beginner') && studio.popular) score += 2;

      return { studio, score };
    });

    studioScores.sort((a, b) => b.score - a.score);
    return studioScores[0].studio;
  };

  const goBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
      setRecommendation(null);
    }
  };

  const selectStudio = () => {
    if (recommendation) {
      onStudioSelected(recommendation.id);
      onClose();
    }
  };

  if (recommendation) {
    const Icon = recommendation.icon;

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 bg-black/90 backdrop-blur-lg z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-slate-900 rounded-3xl border border-white/10 max-w-4xl w-full overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative h-64 overflow-hidden">
            <img
              src={recommendation.image}
              alt={recommendation.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="bg-emerald-500 rounded-full p-6"
              >
                <Sparkles className="w-12 h-12 text-white" />
              </motion.div>
            </div>
          </div>

          <div className="p-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-4xl font-montserrat font-black text-white mb-3">
                Studio parfait trouvé !
              </h2>
              <p className="text-white/60 font-inter text-lg mb-8">
                Basé sur vos réponses, nous recommandons :
              </p>

              <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 mb-8">
                <div className="flex items-center justify-center gap-4 mb-6">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${recommendation.gradient} flex items-center justify-center`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-left">
                    <span className={`text-transparent bg-clip-text bg-gradient-to-r ${recommendation.gradient} font-montserrat font-bold text-sm tracking-wider uppercase`}>
                      {recommendation.subtitle}
                    </span>
                    <h3 className="text-3xl font-montserrat font-black text-white">
                      {recommendation.name}
                    </h3>
                  </div>
                </div>

                <p className="text-white/80 font-inter text-lg mb-6 leading-relaxed">
                  {recommendation.description}
                </p>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-white/5 rounded-xl p-4">
                    <Users className="w-5 h-5 text-cyan-400 mb-2" />
                    <p className="text-white/60 text-xs font-inter mb-1">CAPACITÉ</p>
                    <p className="text-white font-inter font-bold">{recommendation.capacity}</p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4">
                    <Zap className="w-5 h-5 text-blue-400 mb-2" />
                    <p className="text-white/60 text-xs font-inter mb-1">TARIF</p>
                    <p className="text-white font-inter font-bold">{recommendation.basePrice}€/h</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span className="text-white/80 font-inter text-sm text-left">{recommendation.equipment.cameras}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span className="text-white/80 font-inter text-sm text-left">{recommendation.equipment.audio}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={goBack}
                  className="flex-1 bg-white/10 hover:bg-white/15 text-white py-4 rounded-xl font-montserrat font-bold border border-white/20"
                >
                  Recommencer
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={selectStudio}
                  className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white py-4 rounded-xl font-montserrat font-bold flex items-center justify-center gap-2"
                >
                  Sélectionner ce studio
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    );
  }

  const QuestionIcon = question.icon;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/90 backdrop-blur-lg z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-slate-900 rounded-3xl border border-white/10 max-w-3xl w-full p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center">
                <QuestionIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-white/60 text-sm font-inter">
                  Question {currentQuestion + 1} sur {quizQuestions.length}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white/60 hover:text-white transition-colors"
            >
              ✕
            </button>
          </div>

          <div className="h-2 bg-white/10 rounded-full overflow-hidden mb-6">
            <motion.div
              className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-3xl md:text-4xl font-montserrat font-black text-white mb-8">
              {question.question}
            </h2>

            <div className="grid gap-4 mb-8">
              {question.answers.map((answer, index) => {
                const AnswerIcon = answer.icon;
                const isSelected = answers[question.id] === answer.id;

                return (
                  <motion.button
                    key={answer.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, x: 8 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleAnswer(answer.id)}
                    className={`p-6 rounded-2xl border-2 transition-all text-left ${
                      isSelected
                        ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border-cyan-400'
                        : 'bg-white/5 border-white/10 hover:border-white/30'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                        isSelected
                          ? 'bg-gradient-to-r from-cyan-500 to-blue-500'
                          : 'bg-white/10'
                      }`}>
                        <AnswerIcon className="w-7 h-7 text-white" />
                      </div>
                      <div className="flex-1">
                        <span className="text-xl font-montserrat font-bold text-white">
                          {answer.text}
                        </span>
                      </div>
                      {isSelected && (
                        <Check className="w-6 h-6 text-cyan-400" />
                      )}
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>

        {currentQuestion > 0 && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={goBack}
            className="flex items-center gap-2 text-white/60 hover:text-white font-inter font-medium transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Question précédente
          </motion.button>
        )}
      </motion.div>
    </motion.div>
  );
}
