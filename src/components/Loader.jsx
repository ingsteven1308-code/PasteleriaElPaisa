import { AnimatePresence, motion } from 'framer-motion';
import logo from '../image/logo-pasteleria.jpeg';

const backdrop = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0, transition: { duration: 0.45, ease: 'easeInOut' } },
};

const card = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    scale: 0.96,
    transition: { duration: 0.5, ease: 'easeInOut' },
  },
};

export default function Loader({ visible }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={backdrop}
          className="fixed inset-0 z-[999] flex items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.35),_transparent_25%),linear-gradient(180deg,_#ffffff_0%,_#f5e8e6_25%,_#d4131f_100%)] px-6 py-8"
        >
          <motion.div
            variants={card}
            className="relative flex w-full max-w-md flex-col items-center justify-center gap-5 overflow-hidden rounded-[2.4rem] border border-white/15 bg-white/10 px-8 py-10 text-center shadow-[0_36px_110px_rgba(212,27,36,0.22)] backdrop-blur-2xl"
          >
            <div className="absolute inset-0 opacity-70 bg-gradient-to-br from-white/20 via-transparent to-white/0" />
            <div className="pointer-events-none absolute -left-8 top-6 h-4 w-4 rounded-full bg-white/65 blur-xl" />
            <div className="pointer-events-none absolute right-6 top-10 h-6 w-6 rounded-full bg-white/40 blur-2xl" />
            <motion.div
              initial={{ opacity: 0, scale: 0.72 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex h-36 w-36 items-center justify-center rounded-[2.3rem] bg-white/85 shadow-[0_20px_60px_rgba(255,255,255,0.45)]"
            >
              <motion.img
                src={logo}
                alt="Pastelería El Paisa"
                className="h-28 w-28 rounded-[2rem] object-cover"
                initial={{ scale: 0.92, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.9, ease: 'easeOut' }}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
              className="relative z-10 text-white"
            >
              <p className="text-2xl font-semibold tracking-tight md:text-3xl">Pastelería El Paisa</p>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35, ease: 'easeOut' }}
              className="relative z-10 max-w-sm text-sm leading-7 text-white/85 md:text-base"
            >
              Endulzando tus momentos especiales con estilo moderno y sabor premium.
            </motion.p>

            <motion.div
              className="relative z-10 flex items-center justify-center gap-2"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.45, ease: 'easeOut' }}
            >
              <span className="h-1.5 w-16 rounded-full bg-white/70 blur-sm" />
              <span className="h-1.5 w-8 rounded-full bg-white/70 blur-sm" />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
