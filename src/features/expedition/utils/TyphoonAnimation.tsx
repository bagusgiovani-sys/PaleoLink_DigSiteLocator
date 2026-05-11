import { motion } from 'framer-motion';

const TyphoonAnimation = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    <motion.div
      className="absolute inset-0"
      animate={{ rotate: 360 }}
      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
    >
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-0.5 h-6 bg-gray-400 opacity-60"
          style={{
            left: '50%',
            top: '50%',
            transform: `rotate(${i * 30}deg) translateX(${20 + i * 3}px)`
          }}
        />
      ))}
    </motion.div>
  </div>
);

export default TyphoonAnimation;
