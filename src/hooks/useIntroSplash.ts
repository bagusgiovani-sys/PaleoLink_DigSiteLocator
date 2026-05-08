import { useState, useEffect } from 'react';

export const useIntroSplash = (): boolean => {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return showIntro;
};
