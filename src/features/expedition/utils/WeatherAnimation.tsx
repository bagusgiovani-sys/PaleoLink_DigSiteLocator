import type { WeatherCondition } from '../../../types';
import RainyAnimation from './RainyAnimation';
import ThunderstormAnimation from './ThunderstormAnimation';
import FloodAnimation from './FloodAnimation';
import SunnyAnimation from './SunnyAnimation';
import TyphoonAnimation from './TyphoonAnimation';

const WeatherAnimation = ({ condition }: { condition: WeatherCondition }) => {
  switch (condition) {
    case 'rainy': return <RainyAnimation />;
    case 'thunderstorm': return <ThunderstormAnimation />;
    case 'flood': return <FloodAnimation />;
    case 'sunny': return <SunnyAnimation />;
    case 'typhoon': return <TyphoonAnimation />;
    default: return null;
  }
};

export default WeatherAnimation;
