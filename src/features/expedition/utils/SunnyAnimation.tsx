import { motion } from 'framer-motion';

const SunnyAnimation = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    <motion.div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      animate={{ rotate: 360 }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
    >
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-8 bg-yellow-400 opacity-40"
          style={{ transform: `rotate(${i * 45}deg) translateY(-20px)`, transformOrigin: 'center' }}
          animate={{ opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
        />
      ))}
    </motion.div>
  </div>
);

export default SunnyAnimation;
