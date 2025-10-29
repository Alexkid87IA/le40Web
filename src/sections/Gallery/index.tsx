import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { designTokens } from '../../styles/designTokens';

interface GalleryImage {
  url: string;
  caption: string;
}

const images: GalleryImage[] = [
  {
    url: 'https://cdn.discordapp.com/attachments/1432824903513538773/1433138403951644722/alexorigines_71937_mentoring_session_experienced_professional_a_025719e0-fc93-4247-8436-91c18b12334c.png?ex=690399a5&is=69024825&hm=69072dc5ebfe60e95b226f9f2641a966a03836188af392108f94d46c8652ce4c&',
    caption: 'Session de Mentorat'
  },
  {
    url: 'https://cdn.discordapp.com/attachments/1432824903513538773/1433138372641161296/alexorigines_71937_professionals_networking_at_event_real_diver_706afad5-b327-44e8-a377-584a42b1fee5.png?ex=6903999e&is=6902481e&hm=73dc2517ed5affb86e2b44f8d3019c9e611d42beb05a3204417e5403409b0822&',
    caption: 'Événement de Networking'
  },
  {
    url: 'https://cdn.discordapp.com/attachments/1432824903513538773/1433138351375912970/alexorigines_71937_business_expert_presenting_to_small_group_re_b1ca3819-a721-4def-baa5-5c2e10a7998a.png?ex=69039999&is=69024819&hm=8cc436c9e8d0dc332a7d78b9d114bc06bbbb05c1c985e7281339c9403f9aedf2&',
    caption: 'Masterclass Professionnelle'
  },
  {
    url: 'https://cdn.discordapp.com/attachments/1432824903513538773/1433138325488926730/alexorigines_71937_business_consultant_meeting_with_client_auth_dc040e5c-3934-4310-92c4-9416e31d0965.png?ex=69039993&is=69024813&hm=2df697bcb08ae1050942f7d809eaed4286b3695d7a93715f5fedb2a3cb1add26&',
    caption: 'Consultation Professionnelle'
  },
  {
    url: 'https://cdn.discordapp.com/attachments/1432824903513538773/1433138298741850215/alexorigines_71937_startup_team_high-fiving_real_diverse_people_85fdf0a5-756a-4644-b97c-8251ac9ba811.png?ex=6903998c&is=6902480c&hm=1c0fb5d00766eca9b28bb6a828747e9038d2f62f2ed889eb6f0473ebcb25a201&',
    caption: 'Célébration d\'Équipe'
  },
  {
    url: 'https://cdn.discordapp.com/attachments/1432824903513538773/1433138239559958629/alexorigines_71937_real_business_team_discussing_around_whitebo_b973b314-c71c-4bd6-bc7a-4b6da82db1c2.png?ex=6903997e&is=690247fe&hm=5854081d7825bf92abc85d096c84eb3bce2cc224a8d4fe114f6c9771e0b13294&',
    caption: 'Réunion Informelle'
  },
  {
    url: 'https://cdn.discordapp.com/attachments/1432824903513538773/1433138169586516079/alexorigines_71937_people_networking_in_lounge_with_coffee_real_eb36a0a8-a7bd-4fcf-971f-61d230282f93.png?ex=6903996e&is=690247ee&hm=832a9106208bd0b3b32c47ce7e683fa211f768b320cec135fc519a51ff81551c&',
    caption: 'Networking au Lounge'
  },
  {
    url: 'https://cdn.discordapp.com/attachments/1432824903513538773/1433138205368254571/alexorigines_71937_young_entrepreneur_focused_on_laptop_rough_w_c401f928-86f0-46c1-a859-223c31016ad0.png?ex=69039976&is=690247f6&hm=fe44214015869ad406359b45cae0fe204665d7fb62523c70f511df9e5e3191ee&',
    caption: 'Espace Solopreneur'
  },
  {
    url: 'https://cdn.discordapp.com/attachments/1432824903513538773/1433138064879784148/alexorigines_71937_creative_meeting_room_with_whiteboards_cover_081bfcbc-1d2f-4bb1-a998-d295726aab42.png?ex=69039955&is=690247d5&hm=0e614699e43fd96dae0d6fa2db9e071084e7976f56b8db264b507d4c096e9be6&',
    caption: 'Salle de Réunion'
  },
  {
    url: 'https://cdn.discordapp.com/attachments/1432824903513538773/1433138059255349319/alexorigines_71937_creative_meeting_room_with_whiteboards_cover_0d0646bb-cc2e-4ba3-afbe-36bb57d793ec.png?ex=69039953&is=690247d3&hm=ec95601909c7442e5fa0f9e05da047acc656f3ca86a05cd06daffbef18ca1985&',
    caption: 'Salle Créative'
  },
  {
    url: 'https://cdn.discordapp.com/attachments/1432824903513538773/1433138033535746099/alexorigines_71937_creative_meeting_room_with_whiteboards_cover_f0d421ef-404c-4032-be37-5d67e728e297.png?ex=6903994d&is=690247cd&hm=650736cf76dbd5456ef64376bbfaabde7190e0fc3b55d92e09f959f2db7d6a42&',
    caption: 'Espace Brainstorming'
  },
  {
    url: 'https://cdn.discordapp.com/attachments/1432824903513538773/1433138014929948824/alexorigines_71937_meeting_room_with_large_screen_displaying_pr_dd4884c4-c214-40dd-8ff1-afd7f1bde382.png?ex=69039949&is=690247c9&hm=ec679e134b6beaeb461b980f4a8fd5e8d109c27317510969ba4a4b0bd3a23e99&',
    caption: 'Salle avec Grand Écran'
  },
  {
    url: 'https://cdn.discordapp.com/attachments/1432824903513538773/1433137956167618764/alexorigines_71937_meeting_room_in_warehouse_building_rectangul_4b82455b-4e7a-4f17-a73e-092606ce7695.png?ex=6903993b&is=690247bb&hm=dc68f0600998be3b21ae2be0262d1bfea7865351b8231a9d2c4e591e8331d7c2&',
    caption: 'Salle de Réunion Moderne'
  },
  {
    url: 'https://cdn.discordapp.com/attachments/1432824903513538773/1433137866711633972/alexorigines_71937_briefing_area_with_65-inch_screen_on_wall_se_02a235c6-4f32-444a-a727-40f6e8468cd1.png?ex=69039925&is=690247a5&hm=5738876204c1109abb1e35c389ab5d3eebd2a04eae0072ea6f08e002498f6296&',
    caption: 'Espace Briefing'
  },
  {
    url: 'https://cdn.discordapp.com/attachments/1432824903513538773/1433137830741147872/alexorigines_71937_person_being_filmed_on_green_screen_natural__8a9cf9cf-d3a1-4cc8-8279-081b2ac64f69.png?ex=6903991d&is=6902479d&hm=8bf5cd0f79b2e37ec24eb554ae8b7db126e72ccf7eb7b31ae9bcc170482b0055&',
    caption: 'Studio Fond Vert'
  },
  {
    url: 'https://cdn.discordapp.com/attachments/1432824903513538773/1433137796503048263/alexorigines_71937_person_being_filmed_on_green_screen_natural__9ed520ef-5f20-4063-8643-0772bf314189.png?ex=69039915&is=69024795&hm=54a8caaf2e4e5b71f238fc1315b2e0159a76586f1b13e847c4171ab29de8b3ee&',
    caption: 'Tournage Vidéo'
  },
  {
    url: 'https://cdn.discordapp.com/attachments/1432824903513538773/1433137777502982375/alexorigines_71937_chromakey_workstation_computer_screen_showin_e91e5a4e-aac4-4160-880d-6263ba71a04f.png?ex=69039910&is=69024790&hm=756d9eb6d0128c1ed9634471cd91ec93bce355532fcf93c8ea1f694759153284&',
    caption: 'Poste Chromakey'
  },
  {
    url: 'https://cdn.discordapp.com/attachments/1432824903513538773/1433137708850745534/alexorigines_71937_green_screen_studio_seamless_3x3m_green_back_5ca32af4-a3b0-4752-8363-792d594ea026.png?ex=69039900&is=69024780&hm=68dab61bb8bda3a43bbf3d3ef7dda4ede8ebaa2b42bf8caea28c61ebf5ab71dc&',
    caption: 'Studio Chromakey'
  },
  {
    url: 'https://cdn.discordapp.com/attachments/1432824903513538773/1433137489882779648/alexorigines_71937_green_screen_studio_3x3_meter_green_cycloram_2e6a0cb8-6f18-4e65-bb85-3f2123a69730.png?ex=690398cb&is=6902474b&hm=01d7242dff8f485a07e98ab537268df6d5a418dfbb34974dbf3d37d057918bbb&',
    caption: 'Studio 3x3m'
  },
  {
    url: 'https://cdn.discordapp.com/attachments/1432824903513538773/1433137651594039508/alexorigines_71937_two_makeup_stations_side_by_side_Hollywood_m_a8e10d5e-915b-4487-abc9-e0b3ef29ad1b.png?ex=690398f2&is=69024772&hm=30b8cda9704ebd01ddadc983b582fefc0cd3cb29be8d05b6efda2c38282019c2&',
    caption: 'Loges Maquillage'
  },
  {
    url: 'https://cdn.discordapp.com/attachments/1432824903513538773/1433137635139780760/alexorigines_71937_podcast_recording_session_3_real_people_with_4c127f57-0c34-4bb2-bbe5-13fe02fb91b6.png?ex=690398ee&is=6902476e&hm=e7841419c69b9fcaf41ce8ecc8b316d79a7c35f3741cc3f8cb477e02fef1a3dd&',
    caption: 'Session Podcast'
  },
  {
    url: 'https://cdn.discordapp.com/attachments/1432824903513538773/1433137618106712175/alexorigines_71937_podcast_recording_session_3_real_people_with_b942bcad-de5a-417a-8da9-31ba25e0e3d7.png?ex=690398ea&is=6902476a&hm=b070cbeb450a4583fc2032ec8f3fc731f5a5ec5e1251eb46aa49523eff411f54&',
    caption: 'Enregistrement Podcast'
  },
  {
    url: 'https://cdn.discordapp.com/attachments/1432824903513538773/1433137547785146439/alexorigines_71937_podcast_studio_simple_wood_table_with_4_Shur_5a432fd2-6ca3-4d19-a5f7-892f6ff0efdc.png?ex=690398d9&is=69024759&hm=6b1e53ee51223ac93ebff6c860ecffe7aa36fd5f0e50e017084a6dff2fdedb7a&',
    caption: 'Studio Podcast'
  },
  {
    url: 'https://cdn.discordapp.com/attachments/1432824903513538773/1433137422132187166/alexorigines_71937_podcast_recording_room_simple_wood_table_wit_486a08d8-107e-4a26-af3f-1afc32425b2d.png?ex=690398bb&is=6902473b&hm=29cf4a245a6a08794478602252306944c1608269bf27561fa3c48920079263ff&',
    caption: 'Studio Podcast Table'
  },
  {
    url: 'https://cdn.discordapp.com/attachments/1432824903513538773/1433137596237611019/alexorigines_71937_acoustic_foam_panels_in_geometric_pattern_co_61e5097c-3b46-40d3-bab8-fea3c041b329.png?ex=690398e5&is=69024765&hm=76fc9df7ede880b7595a2e6fa6e08b33d4269d47fad07aa3bbca81d93bb25e05&',
    caption: 'Insonorisation Acoustique'
  },
  {
    url: 'https://cdn.discordapp.com/attachments/1432824903513538773/1433137458320773151/alexorigines_71937_broadcast_control_room_ATEM_video_switcher_w_1b3a2986-8f2d-436c-a104-185817c4b94e.png?ex=690398c4&is=69024744&hm=a4735c786092f4e4a57852cb8117e35c389ab5d3eebd2a04eae0072ea6f08e002498f6296&',
    caption: 'Régie Broadcast'
  },
  {
    url: 'https://cdn.discordapp.com/attachments/1432824903513538773/1433137373260025907/alexorigines_71937_interview_setup_with_two_chairs_facing_each__3d7de1ab-dd4f-48a5-ba22-07dee506d49f.png?ex=690398b0&is=69024730&hm=bfea7422ee7c5a3f2c13167ec6d9472df99c3d4ae4284ed778053e12a9d53a94&',
    caption: 'Setup Interview'
  },
  {
    url: 'https://cdn.discordapp.com/attachments/1432824903513538773/1433137360136175817/alexorigines_71937_interview_setup_with_two_chairs_facing_each__06209513-a484-4fb3-8b6e-40938ffd5af2.png?ex=690398ad&is=6902472d&hm=0791f9eeeab38f2c5df5e65f2a5f88e111e0fabf8019890dd88a5d08f217b274&',
    caption: 'Configuration Émission'
  },
  {
    url: 'https://cdn.discordapp.com/attachments/1432824903513538773/1433136958141366423/alexorigines_71937_small_enclosed_office_with_glass_walls_in_wa_de2b0eea-709b-4f65-bc1e-edabacf24458.png?ex=6903984d&is=690246cd&hm=d5645e7ba251732f1ef7d3324da505ebda0f8854f9e26029a2cf3f43a4580345&',
    caption: 'Bureau Privé'
  },
  {
    url: 'https://cdn.discordapp.com/attachments/1432824903513538773/1433136877786894336/alexorigines_71937_people_collaborating_around_rough_wood_table_d4943d14-05be-4f50-a7a0-a2d27285e9ca.png?ex=6903983a&is=690246ba&hm=afc46f3541aaacabae6ce8fe8d19829df648047e9e2e3495ddb0e13cb2152c7b&',
    caption: 'Collaboration en Équipe'
  },
  {
    url: 'https://cdn.discordapp.com/attachments/1432824903513538773/1433136820392300705/alexorigines_71937_converted_warehouse_coworking_workspace_thic_8438cad7-37a0-4155-959a-ac9dde701fbe.png?ex=6903982c&is=690246ac&hm=5cd00ffe23cad28a13632ed945d68bbb23f6ec53ab801aa32ced9a294859399b&',
    caption: 'Espace de Coworking'
  }
];

export default function Gallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    if (!isPlaying || images.length === 0) return;

    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isPlaying]);

  const goToPrevious = () => {
    setDirection(-1);
    setIsPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToNext = () => {
    setDirection(1);
    setIsPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setIsPlaying(false);
    setCurrentIndex(index);
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const currentImage = images[currentIndex];

  return (
    <section className="relative bg-black py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-950 to-black" />

      <motion.div
        className="absolute top-20 right-20 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.15, 0.1],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <div className={`relative z-10 w-full max-w-[1600px] mx-auto ${designTokens.spacing.container}`}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-6xl md:text-7xl font-black text-white mb-6 tracking-tight">
            Découvrez Nos{' '}
            <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 bg-clip-text text-transparent">
              Espaces
            </span>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            4000m² d'infrastructures professionnelles au cœur de Marseille
          </p>
        </motion.div>

        <div className="relative mt-16">
          <div className="relative aspect-[16/9] rounded-3xl overflow-hidden bg-zinc-900 shadow-2xl">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: 'spring', stiffness: 300, damping: 30 },
                  opacity: { duration: 0.3 },
                }}
                className="absolute inset-0"
              >
                <img
                  src={currentImage.url}
                  alt={currentImage.caption}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex items-center gap-4"
                  >
                    <span className="px-4 py-2 rounded-lg bg-amber-500/90 text-white font-semibold text-sm backdrop-blur-sm">
                      {currentImage.caption}
                    </span>
                    <span className="text-white/60 text-sm">
                      {currentIndex + 1} / {images.length}
                    </span>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="absolute inset-0 pointer-events-none rounded-3xl ring-1 ring-white/10" />
          </div>

          <motion.button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-4 rounded-full bg-black/50 backdrop-blur-xl border border-white/10 text-white hover:bg-black/70 hover:border-amber-500/50 transition-all"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Image précédente"
          >
            <ChevronLeft className="w-6 h-6" />
          </motion.button>

          <motion.button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-4 rounded-full bg-black/50 backdrop-blur-xl border border-white/10 text-white hover:bg-black/70 hover:border-amber-500/50 transition-all"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Image suivante"
          >
            <ChevronRight className="w-6 h-6" />
          </motion.button>

          <motion.button
            onClick={() => setIsPlaying(!isPlaying)}
            className="absolute top-4 right-4 p-3 rounded-full bg-black/50 backdrop-blur-xl border border-white/10 text-white hover:bg-black/70 hover:border-amber-500/50 transition-all"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label={isPlaying ? 'Pause' : 'Lecture'}
          >
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          </motion.button>
        </div>

        <div className="mt-8 flex justify-center gap-2 flex-wrap px-4">
          {images.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all ${
                index === currentIndex
                  ? 'w-12 bg-gradient-to-r from-amber-500 to-orange-500'
                  : 'w-3 bg-white/20 hover:bg-white/40'
              } h-3 rounded-full`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              aria-label={`Aller à l'image ${index + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
