import { useState } from 'react';
import { User } from 'lucide-react';
import { EXTENSIONS } from '../../constants/extensions';

interface Props {
  src: string;
  alt: string;
  className?: string;
}

const ImageWithFallback = ({ src, alt, className }: Props) => {
  const [extIndex, setExtIndex] = useState(0);
  const [failed, setFailed] = useState(false);

  const currentSrc = src.includes('.') ? src : src + EXTENSIONS[extIndex];

  const handleError = () => {
    if (extIndex < EXTENSIONS.length - 1) {
      setExtIndex(extIndex + 1);
    } else {
      setFailed(true);
    }
  };

  if (failed) {
    return (
      <div className={`${className} flex items-center justify-center bg-slate-800/50`}>
        <User className="w-20 h-20 text-slate-600" />
      </div>
    );
  }

  return (
    <div className={`${className} flex items-center justify-center bg-slate-800/50`}>
      <img
        key={currentSrc}
        src={currentSrc}
        alt={alt}
        className="w-full h-full object-cover"
        onError={handleError}
      />
    </div>
  );
};

export default ImageWithFallback;
