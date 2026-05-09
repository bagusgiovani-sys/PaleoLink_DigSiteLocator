import { useMemo } from 'react';
import { motion } from 'framer-motion';
import type { WeatherCondition } from '../../../types';

const WeatherAnimation = ({ condition }: { condition: WeatherCondition }) => {
  const rainyParticles = useMemo(
    () => [...Array(20)].map(() => ({
      initialX: Math.random() * 100,
      animateX: Math.random() * 100,
      delay: Math.random() * 2,
    })),
    []
  );

  const thunderParticles = useMemo(
    () => ({
      drops: [...Array(15)].map(() => ({
        initialX: Math.random() * 100,
        animateX: Math.random() * 100,
        delay: Math.random() * 2,
      })),
      lightningDelay: Math.random() * 3 + 2,
    }),
    []
  );

  switch (condition) {
    case 'rainy':
      return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {rainyParticles.map((p, i) => (
            <motion.div
              key={i}
              className="absolute w-0.5 h-4 bg-blue-400 opacity-60"
              initial={{ y: -20, x: p.initialX }}
              animate={{ y: 120, x: p.animateX }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: p.delay,
                ease: "linear"
              }}
            />
          ))}
        </div>
      );

    case 'thunderstorm':
      return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {thunderParticles.drops.map((p, i) => (
            <motion.div
              key={i}
              className="absolute w-0.5 h-4 bg-blue-400 opacity-60"
              initial={{ y: -20, x: p.initialX }}
              animate={{ y: 120, x: p.animateX }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                delay: p.delay,
                ease: "linear"
              }}
            />
          ))}
          <motion.div
            className="absolute inset-0 bg-yellow-300 opacity-30"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.5, 0] }}
            transition={{
              duration: 0.2,
              repeat: Infinity,
              repeatDelay: thunderParticles.lightningDelay
            }}
          />
        </div>
      );

    case 'flood':
      return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div
            className="absolute bottom-0 left-0 right-0 bg-blue-500 opacity-40"
            initial={{ height: '0%' }}
            animate={{ height: ['0%', '30%', '0%'] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
      );

    case 'sunny':
      return (
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
                style={{
                  transform: `rotate(${i * 45}deg) translateY(-20px)`,
                  transformOrigin: 'center'
                }}
                animate={{ opacity: [0.2, 0.6, 0.2] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2
                }}
              />
            ))}
          </motion.div>
        </div>
      );

    case 'typhoon':
      return (
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

    default:
      return null;
  }
};

export default WeatherAnimation;
