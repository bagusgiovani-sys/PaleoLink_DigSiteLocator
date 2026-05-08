import { motion } from 'framer-motion';

const IntroSplash = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center"
      >
        <motion.h1
          className="text-7xl font-bold text-cyan-300 mb-4 tracking-wider"
          animate={{
            textShadow: [
              "0 0 20px rgba(34, 211, 238, 0.5)",
              "0 0 40px rgba(34, 211, 238, 0.8)",
              "0 0 20px rgba(34, 211, 238, 0.5)"
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          PALEO LINK
        </motion.h1>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="h-1 bg-gradient-to-r from-transparent via-cyan-300 to-transparent mb-4"
        ></motion.div>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="text-cyan-200 text-lg tracking-widest"
        >
          GLOBAL EXCAVATION & PRESERVATION NETWORK
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
          className="text-cyan-500/70 text-xl tracking-[0.3em] mt-2"
        >
          BY DINONUGGETS
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="mt-8"
        >
          <div className="inline-flex items-center gap-3 text-cyan-400">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-6 h-6 border-2 border-cyan-400 border-t-transparent rounded-full"
            ></motion.div>
            <span className="text-sm tracking-wide">INITIALIZING SYSTEM</span>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default IntroSplash;
