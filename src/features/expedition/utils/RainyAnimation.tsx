import { useState } from 'react';
import { motion } from 'framer-motion';

const RainyAnimation = () => {
  const [particles] = useState(() =>
    [...Array(20)].map(() => ({
      initialX: Math.random() * 100,
      animateX: Math.random() * 100,
      delay: Math.random() * 2,
    }))
  );

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute w-0.5 h-4 bg-blue-400 opacity-60"
          initial={{ y: -20, x: p.initialX }}
          animate={{ y: 120, x: p.animateX }}
          transition={{ duration: 1, repeat: Infinity, delay: p.delay, ease: "linear" }}
        />
      ))}
    </div>
  );
};

export default RainyAnimation;
