import { motion } from 'framer-motion';

const FloodAnimation = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    <motion.div
      className="absolute bottom-0 left-0 right-0 bg-blue-500 opacity-40"
      initial={{ height: '0%' }}
      animate={{ height: ['0%', '30%', '0%'] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    />
  </div>
);

export default FloodAnimation;
