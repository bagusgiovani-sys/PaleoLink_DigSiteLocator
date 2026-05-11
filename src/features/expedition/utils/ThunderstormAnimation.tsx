import { useState } from 'react';
import { motion } from 'framer-motion';

const ThunderstormAnimation = () => {
  const [particles] = useState(() => ({
    drops: [...Array(15)].map(() => ({
      initialX: Math.random() * 100,
      animateX: Math.random() * 100,
      delay: Math.random() * 2,
    })),
    lightningDelay: Math.random() * 3 + 2,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.drops.map((p, i) => (
        <motion.div
          key={i}
          className="absolute w-0.5 h-4 bg-blue-400 opacity-60"
          initial={{ y: -20, x: p.initialX }}
          animate={{ y: 120, x: p.animateX }}
          transition={{ duration: 0.8, repeat: Infinity, delay: p.delay, ease: "linear" }}
        />
      ))}
      <motion.div
        className="absolute inset-0 bg-yellow-300 opacity-30"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.5, 0] }}
        transition={{ duration: 0.2, repeat: Infinity, repeatDelay: particles.lightningDelay }}
      />
    </div>
  );
};

export default ThunderstormAnimation;
