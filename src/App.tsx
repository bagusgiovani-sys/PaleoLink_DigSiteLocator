import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { MapPin, Users, Wrench, Gem, X, Cloud, CloudRain, CloudSnow, Sun, Wind, AlertTriangle, Camera, Satellite, Box, Map, FlaskConical, ShoppingCart, User, DollarSign, TrendingUp, Navigation, Radio, Zap, Droplets, Thermometer, Building2, GraduationCap, Truck, CheckCircle, Clock, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { WeatherCondition, SiteType, WeatherSeverity, MainTab, SafetyProfile, DigSite, Scientist, MarketItem } from './types';
import ImageWithFallback from './components/shared/ImageWithFallback';

const DigSiteLocator = () => {
  const [selectedSite, setSelectedSite] = useState<DigSite | null>(null);
  const [animatingItems, setAnimatingItems] = useState<Record<string, boolean>>({});
  const [activeTab, setActiveTab] = useState<'details' | 'model' | 'safety'>('details');
  const [mainTab, setMainTab] = useState<MainTab>('expedition');
  const [showIntro, setShowIntro] = useState(true);
  const [showModel, setShowModel] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  const scientists: Scientist[] = [
    {
      id: 1,
      name: "EMRE BRAY",
      title: "Logistics",
      photo: "/assets/scientist1",
      logistics: { current: 1, max: 4 },
      genetics: { current: 2, max: 5 },
      welfare: { current: 1, max: 5 },
      trait: "Motivated",
      traitDescription: "Increases Unrest limit by 4",
      bio: "Raised in the city, Emre Bray often visited the local natural history museum. Her interest in scientific development led her to a career in palaeontology.",
      salary: 1500,
      trainingLevel: 1
    },
    {
      id: 2,
      name: "PATRICK CROWTHER",
      title: "Logistics",
      photo: "/assets/scientist2",
      logistics: { current: 1, max: 5 },
      genetics: { current: 2, max: 3 },
      welfare: { current: 2, max: 5 },
      trait: "Cheaper Research",
      traitDescription: "Reduces the cost of Research tasks by 30%",
      bio: "Patrick took a Maths degree before focusing on his love of dinosaurs. Patrick formed a palaeontology club for fellow dinosaur fans at school.",
      salary: 1700,
      trainingLevel: 1
    },
    {
      id: 3,
      name: "HYEJIN SEO",
      title: "Logistics",
      photo: "/assets/scientist3",
      logistics: { current: 1, max: 5 },
      genetics: { current: 1, max: 3 },
      welfare: { current: 4, max: 9 },
      trait: "Welfare Specialist",
      traitDescription: "Increases Welfare Potential by 5 and Welfare Skill by 3",
      bio: "HyeJin Seo was born in a coastal town famous for dinosaur discoveries. She completed a degree in English Literature from Jadavpur University in India.",
      salary: 1000,
      trainingLevel: 1
    },
    {
      id: 4,
      name: "ANEEGA SAFAR",
      title: "Logistics",
      photo: "/assets/scientist4",
      logistics: { current: 2, max: 8 },
      genetics: { current: 1, max: 3 },
      welfare: { current: 0, max: 4 },
      trait: "Altruistic Salary",
      traitDescription: "Reduces the salary by 50%",
      bio: "Aneega Safar loved dinosaurs as a child and visited local dig sites to learn more. Aneega's intelligence and drive have led to two successive promotions.",
      salary: 1000,
      trainingLevel: 1
    }
  ];

  const marketItems: MarketItem[] = [
    {
      id: 1,
      name: "DIMORPHODON",
      category: "FLYING DINOSAURS",
      image: "/assets/dino1.jpg",
      amount: 5,
      appeal: 1350,
      price: 207392,
      priceStatus: "Good price",
      seller: "DARK_JURASSIC_ANON344",
      rating: 16
    },
    {
      id: 2,
      name: "PTERANODON",
      category: "FLYING DINOSAURS",
      image: "/assets/dino2.jpg",
      amount: 2,
      appeal: 5292,
      price: 1328099,
      priceStatus: "Fair price",
      seller: "FOSSIL_TRADER_89",
      rating: 58
    },
    {
      id: 3,
      name: "QUETZALCOATLUS",
      category: "FLYING DINOSAURS",
      image: "/assets/dino3.jpg",
      amount: 2,
      appeal: 35424,
      price: 8603527,
      priceStatus: "Good price",
      seller: "PALEO_KING_123",
      rating: 95
    },
    {
      id: 4,
      name: "THANATOSDRAKON",
      category: "FLYING DINOSAURS",
      image: "/assets/dino4.jpg",
      amount: 2,
      appeal: 5328,
      price: 1139788,
      priceStatus: "Premium",
      seller: "DINO_DEALER_PRO",
      rating: 92
    }
  ];

  const calculateSafetyRisk = (profile: SafetyProfile) => {
    let score = 0;

    if (profile.groundType === 'Sand') score += 2;
    else if (profile.groundType === 'Clay') score += 1;
    else if (profile.groundType === 'Limestone') score += 1;

    if (profile.excavationDepth === 'Deep (2m+)') score += 3;
    else if (profile.excavationDepth === 'Medium (1-2m)') score += 2;

    if (profile.landSlope === 'Steep slope') score += 2;
    else if (profile.landSlope === 'Slight slope') score += 1;

    if (profile.waterRisk === 'High water accumulation') score += 2;
    else if (profile.waterRisk === 'Moderate drainage risk') score += 1;

    if (profile.collapseHistory === 'Major collapse before') score += 3;
    else if (profile.collapseHistory === 'Minor collapse before') score += 2;

    if (score <= 3) return { level: 'Low Risk', color: 'bg-green-500', textColor: 'text-green-400', borderColor: 'border-green-500' };
    if (score <= 6) return { level: 'Medium Risk', color: 'bg-yellow-500', textColor: 'text-yellow-400', borderColor: 'border-yellow-500' };
    return { level: 'High Risk', color: 'bg-red-500', textColor: 'text-red-400', borderColor: 'border-red-500' };
  };

  const digSites: DigSite[] = [
    {
      id: 1,
      name: "Morrison Formation",
      location: "Colorado, USA",
      type: "fossil",
      coordinates: { x: 25, y: 35 },
      discoveries: ["Stegosaurus", "Allosaurus", "Brachiosaurus"],
      team: "Team Alpha - 6 members",
      tools: ["Ground Penetrating Radar", "Excavation Tools", "Preservation Kit"],
      status: "Active",
      weather: {
        condition: "thunderstorm",
        temperature: 68,
        severity: "catastrophic",
        alert: true,
        alertMessage: "Severe thunderstorm warning - Document all findings immediately"
      },
      has3DModel: true,
      modelPath: "/assets/model1",
      modelDescription: "Complete Stegosaurus skeleton - 95% intact",
      safetyProfile: {
        groundType: 'Rocky',
        excavationDepth: 'Medium (1-2m)',
        landSlope: 'Slight slope',
        waterRisk: 'Low drainage risk',
        collapseHistory: 'No'
      }
    },
    {
      id: 2,
      name: "Hell Creek Formation",
      location: "Montana, USA",
      type: "fossil",
      coordinates: { x: 30, y: 25 },
      discoveries: ["Tyrannosaurus Rex", "Triceratops", "Ankylosaurus"],
      team: "Team Bravo - 8 members",
      tools: ["3D Scanner", "Heavy Machinery", "Chemical Analysis Kit"],
      status: "Active",
      weather: {
        condition: "sunny",
        temperature: 75,
        severity: "good",
        alert: false,
        alertMessage: ""
      },
      has3DModel: true,
      modelPath: "/assets/model2",
      modelDescription: "T-Rex skull fragment - Excellent preservation",
      safetyProfile: {
        groundType: 'Clay',
        excavationDepth: 'Deep (2m+)',
        landSlope: 'Flat',
        waterRisk: 'Moderate drainage risk',
        collapseHistory: 'Minor collapse before'
      }
    },
    {
      id: 3,
      name: "Giza Pyramid Complex",
      location: "Cairo, Egypt",
      type: "archaeological",
      coordinates: { x: 55, y: 30 },
      discoveries: ["Ancient chambers", "Hieroglyphics", "Burial artifacts"],
      team: "Team Delta - 5 members",
      tools: ["Fine Brushes", "Microscope", "Digital Mapping"],
      status: "Planning",
      weather: {
        condition: "sunny",
        temperature: 95,
        severity: "warning",
        alert: true,
        alertMessage: "Extreme heat advisory - Satellite imagery scheduled"
      },
      has3DModel: false,
      modelPath: "",
      modelDescription: "3D scan pending - Site documentation in progress",
      safetyProfile: {
        groundType: 'Limestone',
        excavationDepth: 'Shallow (0-1m)',
        landSlope: 'Flat',
        waterRisk: 'Low drainage risk',
        collapseHistory: 'No'
      }
    },
    {
      id: 4,
      name: "Gobi Desert",
      location: "Mongolia",
      type: "fossil",
      coordinates: { x: 70, y: 40 },
      discoveries: ["Velociraptor", "Protoceratops", "Oviraptor"],
      team: "Team Gamma - 7 members",
      tools: ["Drone Survey", "GPS Markers", "Climate Control"],
      status: "Active",
      weather: {
        condition: "typhoon",
        temperature: 62,
        severity: "catastrophic",
        alert: true,
        alertMessage: "Typhoon approaching - Emergency documentation protocol activated"
      },
      has3DModel: true,
      modelPath: "/assets/model3",
      modelDescription: "Velociraptor nest with eggs - Rare find",
      safetyProfile: {
        groundType: 'Sand',
        excavationDepth: 'Deep (2m+)',
        landSlope: 'Steep slope',
        waterRisk: 'High water accumulation',
        collapseHistory: 'Major collapse before'
      }
    },
    {
      id: 5,
      name: "Machu Picchu",
      location: "Peru",
      type: "archaeological",
      coordinates: { x: 35, y: 75 },
      discoveries: ["Inca structures", "Ceremonial artifacts", "Agricultural terraces"],
      team: "Team Epsilon - 9 members",
      tools: ["Seismic Sensors", "Heavy Excavators", "Airlifting Equipment"],
      status: "Active",
      weather: {
        condition: "rainy",
        temperature: 58,
        severity: "warning",
        alert: true,
        alertMessage: "Heavy rainfall expected - Secure all documentation"
      },
      has3DModel: true,
      modelPath: "/assets/model4",
      modelDescription: "Complete temple structure scan - High resolution",
      safetyProfile: {
        groundType: 'Rocky',
        excavationDepth: 'Shallow (0-1m)',
        landSlope: 'Steep slope',
        waterRisk: 'Moderate drainage risk',
        collapseHistory: 'No'
      }
    },
    {
      id: 6,
      name: "Patagonia Formation",
      location: "Argentina",
      type: "fossil",
      coordinates: { x: 32, y: 80 },
      discoveries: ["Argentinosaurus", "Giganotosaurus", "Marine fossils"],
      team: "Team Zeta - 6 members",
      tools: ["Ground Radar", "Marine Equipment", "Preservation Kit"],
      status: "Active",
      weather: {
        condition: "flood",
        temperature: 54,
        severity: "catastrophic",
        alert: true,
        alertMessage: "Flood warning - Evacuate and secure all specimens"
      },
      has3DModel: false,
      modelPath: "",
      modelDescription: "3D scan missing - Requires immediate documentation",
      safetyProfile: {
        groundType: 'Clay',
        excavationDepth: 'Medium (1-2m)',
        landSlope: 'Slight slope',
        waterRisk: 'High water accumulation',
        collapseHistory: 'Minor collapse before'
      }
    }
  ];

  const getWeatherColor = (severity: WeatherSeverity) => {
    switch (severity) {
      case 'good': return 'bg-green-400';
      case 'warning': return 'bg-yellow-400';
      case 'catastrophic': return 'bg-red-500';
    }
  };

  const getWeatherIcon = (condition: WeatherCondition) => {
    switch (condition) {
      case 'sunny': return <Sun className="w-4 h-4" />;
      case 'rainy': return <CloudRain className="w-4 h-4" />;
      case 'thunderstorm': return <CloudSnow className="w-4 h-4" />;
      case 'flood': return <Cloud className="w-4 h-4" />;
      case 'typhoon': return <Wind className="w-4 h-4" />;
    }
  };

  const getSiteIcon = (type: SiteType, status: string) => {
    if (status === 'Planning') {
      return <Wrench className="w-5 h-5 text-slate-900" />;
    }
    return type === 'fossil' ? <Gem className="w-5 h-5 text-slate-900" /> : <Box className="w-5 h-5 text-slate-900" />;
  };

  const WeatherAnimation = ({ condition }: { condition: WeatherCondition }) => {
    switch (condition) {
      case 'rainy':
        return (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-0.5 h-4 bg-blue-400 opacity-60"
                initial={{ y: -20, x: Math.random() * 100 }}
                animate={{ y: 120, x: Math.random() * 100 }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                  ease: "linear"
                }}
              />
            ))}
          </div>
        );

      case 'thunderstorm':
        return (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-0.5 h-4 bg-blue-400 opacity-60"
                initial={{ y: -20, x: Math.random() * 100 }}
                animate={{ y: 120, x: Math.random() * 100 }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  delay: Math.random() * 2,
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
                repeatDelay: Math.random() * 3 + 2
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

  useEffect(() => {
    if (selectedSite) {
      setAnimatingItems({});
      setActiveTab('details');
      setShowModel(false);

      if (panelRef.current) {
        panelRef.current.style.opacity = '0';
        panelRef.current.style.transform = 'translate(-50%, -50%) scale(0.8)';

        requestAnimationFrame(() => {
          if (panelRef.current) {
            panelRef.current.style.transition = 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
            panelRef.current.style.opacity = '1';
            panelRef.current.style.transform = 'translate(-50%, -50%) scale(1)';
          }
        });
      }

      const timers = [
        setTimeout(() => setAnimatingItems(prev => ({ ...prev, header: true })), 100),
        setTimeout(() => setAnimatingItems(prev => ({ ...prev, status: true })), 200),
        setTimeout(() => setAnimatingItems(prev => ({ ...prev, weather: true })), 300),
        setTimeout(() => setAnimatingItems(prev => ({ ...prev, discoveries: true })), 400),
        setTimeout(() => setAnimatingItems(prev => ({ ...prev, team: true })), 600),
        setTimeout(() => setAnimatingItems(prev => ({ ...prev, tools: true })), 800)
      ];

      return () => timers.forEach(timer => clearTimeout(timer));
    }
  }, [selectedSite]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (showIntro) {
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
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-3 md:p-6">
      <style>{`
        @keyframes slideInFromLeft {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInFromBottom {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.5); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes glowPulse {
          0%, 100% { box-shadow: 0 0 20px rgba(34, 211, 238, 0.3); }
          50% { box-shadow: 0 0 40px rgba(34, 211, 238, 0.6); }
        }
        .animate-slide-left { animation: slideInFromLeft 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
        .animate-slide-bottom { animation: slideInFromBottom 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
        .animate-scale-in { animation: scaleIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
        .glow-pulse { animation: glowPulse 2s ease-in-out infinite; }
        .item-hidden { opacity: 0; }

        /* Map container heights — mobile: 460px (~15% up from 400px), desktop: 690px (~15% up from 600px) */
        .map-container { height: 860px; min-height: 840px; }
        .map-mobile-spacer { height: 460px; }
        .map-desktop-spacer { height: 890px; }
      `}</style>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 md:mb-8 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-cyan-400 mb-2 tracking-wider">PALEO LINK</h1>
          <div className="h-1 w-48 md:w-64 mx-auto bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>
          <p className="text-cyan-200 mt-3 text-xs md:text-sm tracking-widest">GLOBAL EXCAVATION & PRESERVATION NETWORK</p>
        </div>

        {/* Main Navigation Tabs */}
        <div className="mb-4 md:mb-6">
          <div className="bg-slate-900/50 backdrop-blur-sm rounded-lg border border-cyan-500/30 p-1 md:p-2 flex flex-col md:flex-row gap-2">
            <button
              onClick={() => setMainTab('expedition')}
              className={`flex-1 px-4 md:px-6 py-2 md:py-3 rounded-lg font-semibold text-xs md:text-sm tracking-wide transition-all duration-300 flex items-center justify-center gap-2 ${mainTab === 'expedition'
                ? 'bg-cyan-500/30 text-cyan-400 border border-cyan-500/50 shadow-lg shadow-cyan-500/20'
                : 'text-gray-400 hover:text-cyan-300 hover:bg-slate-800/50'
                }`}
            >
              <Map className="w-4 h-4 md:w-5 md:h-5" />
              EXPEDITION MAP
            </button>
            <button
              onClick={() => setMainTab('scientists')}
              className={`flex-1 px-4 md:px-6 py-2 md:py-3 rounded-lg font-semibold text-xs md:text-sm tracking-wide transition-all duration-300 flex items-center justify-center gap-2 ${mainTab === 'scientists'
                ? 'bg-cyan-500/30 text-cyan-400 border border-cyan-500/50 shadow-lg shadow-cyan-500/20'
                : 'text-gray-400 hover:text-cyan-300 hover:bg-slate-800/50'
                }`}
            >
              <FlaskConical className="w-4 h-4 md:w-5 md:h-5" />
              SCIENTISTS
            </button>
            <button
              onClick={() => setMainTab('marketplace')}
              className={`flex-1 px-4 md:px-6 py-2 md:py-3 rounded-lg font-semibold text-xs md:text-sm tracking-wide transition-all duration-300 flex items-center justify-center gap-2 ${mainTab === 'marketplace'
                ? 'bg-cyan-500/30 text-cyan-400 border border-cyan-500/50 shadow-lg shadow-cyan-500/20'
                : 'text-gray-400 hover:text-cyan-300 hover:bg-slate-800/50'
                }`}
            >
              <ShoppingCart className="w-4 h-4 md:w-5 md:h-5" />
              MARKETPLACE
            </button>
            <button
              onClick={() => setMainTab('pathfinder')}
              className={`flex-1 px-4 md:px-6 py-2 md:py-3 rounded-lg font-semibold text-xs md:text-sm tracking-wide transition-all duration-300 flex items-center justify-center gap-2 ${mainTab === 'pathfinder'
                ? 'bg-cyan-500/30 text-cyan-400 border border-cyan-500/50 shadow-lg shadow-cyan-500/20'
                : 'text-gray-400 hover:text-cyan-300 hover:bg-slate-800/50'
                }`}
            >
              <Navigation className="w-4 h-4 md:w-5 md:h-5" />
              PATHFINDER
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {mainTab === 'expedition' ? (
            <motion.div
              key="expedition"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Map Section */}
              <div className="mb-4 md:mb-6">
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg border-2 border-cyan-500/30 p-3 md:p-6 shadow-2xl shadow-cyan-500/20">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-2">
                    <h2 className="text-lg md:text-xl font-bold text-cyan-400 tracking-wide">WORLD MAP</h2>
                    <div className="flex gap-3 md:gap-4 text-xs">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-green-400"></div>
                        <span className="text-green-400">Safe</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-yellow-400"></div>
                        <span className="text-yellow-400">Warning</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-red-500"></div>
                        <span className="text-red-400">Critical</span>
                      </div>
                    </div>
                  </div>

                  {/* Map Container — increased ~15%: mobile 400→460px, desktop 600→690px */}
                  <div className="map-container relative bg-gradient-to-br from-slate-900 to-slate-800 rounded-lg border border-cyan-500/20 overflow-visible">
                    {/* Mobile spacer */}
                    <div className="map-mobile-spacer md:hidden"></div>
                    {/* Desktop spacer */}
                    <div className="map-desktop-spacer hidden md:block"></div>

                    {/* World Map Background Image */}
                    <div className="absolute inset-0 overflow-hidden rounded-lg">
                      <img
                        src="/assets/world_map.png"
                        alt="World Map"
                        className="w-full h-full object-cover opacity-60"
                        style={{ filter: 'brightness(0.7) contrast(1.3)' }}
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </div>

                    {/* Grid overlay */}
                    <div className="absolute inset-0 opacity-10 overflow-hidden rounded-lg">
                      <svg width="100%" height="100%">
                        <defs>
                          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="cyan" strokeWidth="0.5" />
                          </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#grid)" />
                      </svg>
                    </div>

                    {/* Weather Animation Layer */}
                    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-lg">
                      {digSites.map((site) => (
                        <div
                          key={`weather-${site.id}`}
                          className="absolute"
                          style={{
                            left: `${site.coordinates.x}%`,
                            top: `${site.coordinates.y}%`,
                            transform: 'translate(-50%, -50%)',
                            width: '80px',
                            height: '80px'
                          }}
                        >
                          <WeatherAnimation condition={site.weather.condition} />
                        </div>
                      ))}
                    </div>

                    {/* Dig Site Markers */}
                    {digSites.map((site) => (
                      <div
                        key={site.id}
                        className="absolute"
                        style={{
                          left: `${site.coordinates.x}%`,
                          top: `${site.coordinates.y}%`,
                          transform: 'translate(-50%, -50%)',
                          zIndex: selectedSite?.id === site.id ? 100 : 10
                        }}
                      >
                        <button
                          onClick={() => setSelectedSite(selectedSite?.id === site.id ? null : site)}
                          className="relative group z-10"
                        >
                          <div className="relative">
                            <div className={`absolute inset-0 rounded-full ${getWeatherColor(site.weather.severity)} animate-ping opacity-75`}></div>
                            <div className={`relative w-10 h-10 rounded-full ${getWeatherColor(site.weather.severity)} border-2 border-white shadow-lg flex items-center justify-center transition-all duration-300 ${selectedSite?.id === site.id ? 'scale-125' : 'group-hover:scale-110'}`}>
                              {getSiteIcon(site.type, site.status)}
                            </div>
                            <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-slate-900 border border-cyan-400 flex items-center justify-center">
                              {getWeatherIcon(site.weather.condition)}
                            </div>
                          </div>
                        </button>

                        {/* Info Panel — rendered via portal to escape all stacking contexts */}
                        {selectedSite?.id === site.id && createPortal(
                          <div
                            ref={panelRef}
                            style={{
                              position: 'fixed',
                              top: '50%',
                              left: '50%',
                              transform: 'translate(-50%, -50%)',
                              width: '90vw',
                              maxWidth: '420px',
                              zIndex: 999999
                            }}
                          >
                            <div className="bg-slate-900/95 backdrop-blur-md rounded-lg border-2 border-cyan-500/50 shadow-2xl shadow-cyan-500/30 overflow-hidden glow-pulse">
                              <div className="h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500 animate-pulse"></div>

                              <div className="p-4">
                                <div className="flex items-start justify-between mb-3 border-b border-cyan-500/30 pb-3">
                                  <div className="flex-1">
                                    <h3 className={`text-lg font-bold text-white mb-1 ${animatingItems.header ? 'animate-slide-left' : 'item-hidden'}`}>
                                      {site.name}
                                    </h3>
                                    <p className={`text-cyan-300 text-xs ${animatingItems.header ? 'animate-slide-left' : 'item-hidden'}`} style={{ animationDelay: '0.1s' }}>
                                      {site.location} • {site.type === 'fossil' ? 'Fossil Site' : 'Archaeological Site'}
                                    </p>
                                    <div className={`mt-2 flex gap-2 ${animatingItems.status ? 'animate-scale-in' : 'item-hidden'}`}>
                                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${site.status === 'Active'
                                        ? 'bg-green-500/20 text-green-400 border border-green-500/50'
                                        : 'bg-blue-500/20 text-blue-400 border border-blue-500/50'
                                        }`}>
                                        {site.status}
                                      </span>
                                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${site.weather.severity === 'good' ? 'bg-green-500/20 text-green-400 border border-green-500/50' :
                                        site.weather.severity === 'warning' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/50' :
                                          'bg-red-500/20 text-red-400 border border-red-500/50'
                                        }`}>
                                        {site.weather.temperature}°F • {site.weather.condition}
                                      </span>
                                    </div>
                                  </div>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      if (panelRef.current) {
                                        panelRef.current.style.transition = 'all 0.3s ease-out';
                                        panelRef.current.style.opacity = '0';
                                        panelRef.current.style.transform = 'translate(-50%, -50%) scale(0.8)';
                                        setTimeout(() => setSelectedSite(null), 300);
                                      }
                                    }}
                                    className="text-cyan-400 hover:text-cyan-300 transition-colors animate-scale-in"
                                  >
                                    <X className="w-5 h-5" />
                                  </button>
                                </div>

                                {site.weather.alert && (
                                  <div className={`mb-3 ${animatingItems.weather ? 'animate-slide-bottom' : 'item-hidden'}`}>
                                    <div className={`rounded p-3 border ${site.weather.severity === 'catastrophic'
                                      ? 'bg-red-500/10 border-red-500/50'
                                      : 'bg-yellow-500/10 border-yellow-500/50'
                                      }`}>
                                      <div className="flex items-start gap-2">
                                        <AlertTriangle className={`w-4 h-4 mt-0.5 ${site.weather.severity === 'catastrophic' ? 'text-red-400' : 'text-yellow-400'}`} />
                                        <div className="flex-1">
                                          <p className={`text-xs font-semibold mb-1 ${site.weather.severity === 'catastrophic' ? 'text-red-400' : 'text-yellow-400'}`}>
                                            WEATHER ALERT
                                          </p>
                                          <p className="text-gray-300 text-xs">{site.weather.alertMessage}</p>
                                          <div className="flex gap-2 mt-2">
                                            <button className="flex items-center gap-1 px-2 py-1 bg-cyan-500/20 border border-cyan-500/50 rounded text-xs text-cyan-400 hover:bg-cyan-500/30 transition-colors">
                                              <Camera className="w-3 h-3" />
                                              Document
                                            </button>
                                            <button className="flex items-center gap-1 px-2 py-1 bg-purple-500/20 border border-purple-500/50 rounded text-xs text-purple-400 hover:bg-purple-500/30 transition-colors">
                                              <Satellite className="w-3 h-3" />
                                              Satellite Scan
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                )}

                                {/* Tabs */}
                                <div className="flex gap-2 mb-3 border-b border-cyan-500/30">
                                  <button
                                    onClick={() => setActiveTab('details')}
                                    className={`px-3 py-2 text-xs font-semibold transition-colors ${activeTab === 'details'
                                      ? 'text-cyan-400 border-b-2 border-cyan-400'
                                      : 'text-gray-400 hover:text-cyan-300'
                                      }`}
                                  >
                                    Site Details
                                  </button>
                                  <button
                                    onClick={() => setActiveTab('safety')}
                                    className={`px-3 py-2 text-xs font-semibold transition-colors ${activeTab === 'safety'
                                      ? 'text-cyan-400 border-b-2 border-cyan-400'
                                      : 'text-gray-400 hover:text-cyan-300'
                                      }`}
                                  >
                                    Safety Profile
                                  </button>
                                  <button
                                    onClick={() => setActiveTab('model')}
                                    className={`px-3 py-2 text-xs font-semibold transition-colors ${activeTab === 'model'
                                      ? 'text-cyan-400 border-b-2 border-cyan-400'
                                      : 'text-gray-400 hover:text-cyan-300'
                                      }`}
                                  >
                                    3D Data
                                  </button>
                                </div>

                                {/* Tab Content */}
                                <AnimatePresence mode="wait">
                                  {activeTab === 'details' ? (
                                    <motion.div
                                      key="details"
                                      initial={{ opacity: 0, x: -20 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      exit={{ opacity: 0, x: 20 }}
                                      transition={{ duration: 0.3 }}
                                    >
                                      <div className={`mb-3 ${animatingItems.discoveries ? 'animate-slide-bottom' : 'item-hidden'}`}>
                                        <div className="flex items-center gap-2 text-cyan-400 mb-2">
                                          <Gem className="w-4 h-4" />
                                          <h4 className="font-semibold text-xs tracking-wide">DISCOVERIES</h4>
                                        </div>
                                        <div className="bg-slate-800/50 rounded p-2 border border-cyan-500/20">
                                          {site.discoveries.map((discovery, idx) => (
                                            <div
                                              key={idx}
                                              className={`flex items-center gap-2 py-1 ${animatingItems.discoveries ? 'animate-slide-left' : 'item-hidden'}`}
                                              style={{ animationDelay: `${0.1 + idx * 0.1}s` }}
                                            >
                                              <div className="w-1 h-1 rounded-full bg-cyan-400 animate-pulse"></div>
                                              <span className="text-gray-300 text-xs">{discovery}</span>
                                            </div>
                                          ))}
                                        </div>
                                      </div>

                                      <div className={`mb-3 ${animatingItems.team ? 'animate-slide-bottom' : 'item-hidden'}`}>
                                        <div className="flex items-center gap-2 text-cyan-400 mb-2">
                                          <Users className="w-4 h-4" />
                                          <h4 className="font-semibold text-xs tracking-wide">TEAM</h4>
                                        </div>
                                        <div className="bg-slate-800/50 rounded p-2 border border-cyan-500/20">
                                          <p className="text-gray-300 text-xs">{site.team}</p>
                                        </div>
                                      </div>

                                      <div className={`${animatingItems.tools ? 'animate-slide-bottom' : 'item-hidden'}`}>
                                        <div className="flex items-center gap-2 text-cyan-400 mb-2">
                                          <Wrench className="w-4 h-4" />
                                          <h4 className="font-semibold text-xs tracking-wide">TOOLS</h4>
                                        </div>
                                        <div className="bg-slate-800/50 rounded p-2 border border-cyan-500/20">
                                          {site.tools.map((tool, idx) => (
                                            <div
                                              key={idx}
                                              className={`flex items-center gap-2 py-1 ${animatingItems.tools ? 'animate-slide-left' : 'item-hidden'}`}
                                              style={{ animationDelay: `${0.1 + idx * 0.1}s` }}
                                            >
                                              <div className="w-1 h-1 rounded-full bg-cyan-400 animate-pulse" style={{ animationDelay: `${idx * 0.2}s` }}></div>
                                              <span className="text-gray-300 text-xs">{tool}</span>
                                            </div>
                                          ))}
                                        </div>
                                      </div>
                                    </motion.div>
                                  ) : activeTab === 'safety' ? (
                                    <motion.div
                                      key="safety"
                                      initial={{ opacity: 0, x: -20 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      exit={{ opacity: 0, x: 20 }}
                                      transition={{ duration: 0.3 }}
                                    >
                                      {(() => {
                                        const risk = calculateSafetyRisk(site.safetyProfile);
                                        return (
                                          <>
                                            <div className="mb-4 p-4 bg-slate-800/50 rounded-lg border border-cyan-500/20">
                                              <div className="flex items-center justify-between mb-3">
                                                <h4 className="font-semibold text-xs tracking-wide text-cyan-400">OVERALL RISK ASSESSMENT</h4>
                                                <div className={`px-3 py-1 rounded-full ${risk.color}/20 border ${risk.borderColor}/50 flex items-center gap-2`}>
                                                  <div className={`w-2 h-2 rounded-full ${risk.color} animate-pulse`}></div>
                                                  <span className={`text-xs font-bold ${risk.textColor}`}>{risk.level}</span>
                                                </div>
                                              </div>
                                            </div>

                                            <div className="space-y-3">
                                              <div className="bg-slate-800/50 rounded p-3 border border-cyan-500/20">
                                                <div className="flex items-center justify-between">
                                                  <span className="text-gray-400 text-xs">Ground Type</span>
                                                  <span className="text-white text-xs font-semibold">{site.safetyProfile.groundType}</span>
                                                </div>
                                              </div>
                                              <div className="bg-slate-800/50 rounded p-3 border border-cyan-500/20">
                                                <div className="flex items-center justify-between">
                                                  <span className="text-gray-400 text-xs">Excavation Depth</span>
                                                  <span className="text-white text-xs font-semibold">{site.safetyProfile.excavationDepth}</span>
                                                </div>
                                              </div>
                                              <div className="bg-slate-800/50 rounded p-3 border border-cyan-500/20">
                                                <div className="flex items-center justify-between">
                                                  <span className="text-gray-400 text-xs">Land Slope</span>
                                                  <span className="text-white text-xs font-semibold">{site.safetyProfile.landSlope}</span>
                                                </div>
                                              </div>
                                              <div className="bg-slate-800/50 rounded p-3 border border-cyan-500/20">
                                                <div className="flex items-center justify-between">
                                                  <span className="text-gray-400 text-xs">Water Risk</span>
                                                  <span className="text-white text-xs font-semibold">{site.safetyProfile.waterRisk}</span>
                                                </div>
                                              </div>
                                              <div className="bg-slate-800/50 rounded p-3 border border-cyan-500/20">
                                                <div className="flex items-center justify-between">
                                                  <span className="text-gray-400 text-xs">Past Collapse History</span>
                                                  <span className="text-white text-xs font-semibold">{site.safetyProfile.collapseHistory}</span>
                                                </div>
                                              </div>
                                            </div>

                                            <div className="mt-4 p-3 bg-slate-900/50 rounded border border-cyan-500/20">
                                              <h4 className="text-xs font-semibold text-cyan-400 mb-2">RECOMMENDATIONS</h4>
                                              {risk.level === 'High Risk' && (
                                                <p className="text-xs text-red-400">⚠️ High-risk site. Implement additional safety measures, continuous monitoring, and evacuation protocols.</p>
                                              )}
                                              {risk.level === 'Medium Risk' && (
                                                <p className="text-xs text-yellow-400">⚡ Moderate risk detected. Regular safety inspections and monitoring recommended.</p>
                                              )}
                                              {risk.level === 'Low Risk' && (
                                                <p className="text-xs text-green-400">✓ Low-risk site. Standard safety protocols apply.</p>
                                              )}
                                            </div>
                                          </>
                                        );
                                      })()}
                                    </motion.div>
                                  ) : (
                                    <motion.div
                                      key="model"
                                      initial={{ opacity: 0, x: 20 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      exit={{ opacity: 0, x: -20 }}
                                      transition={{ duration: 0.3 }}
                                    >
                                      <div className="bg-slate-800/50 rounded-lg p-4 border border-cyan-500/20">
                                        {site.has3DModel ? (
                                          <>
                                            <div className="flex items-center gap-2 text-green-400 mb-3">
                                              <Box className="w-4 h-4" />
                                              <h4 className="font-semibold text-xs tracking-wide">3D MODEL AVAILABLE</h4>
                                            </div>
                                            <div className="bg-slate-900/50 rounded aspect-video mb-3 border border-cyan-500/20 overflow-hidden">
                                              {showModel ? (
                                                <ImageWithFallback src={site.modelPath} alt={site.modelDescription || ''} className="w-full h-full" />
                                              ) : (
                                                <div className="w-full h-full flex items-center justify-center">
                                                  <div className="text-center">
                                                    <Box className="w-12 h-12 text-cyan-400 mx-auto mb-2 animate-pulse" />
                                                    <p className="text-xs text-gray-400">3D Model Viewer</p>
                                                    <p className="text-xs text-cyan-400 mt-1">{site.modelPath}</p>
                                                  </div>
                                                </div>
                                              )}
                                            </div>
                                            <p className="text-gray-300 text-xs mb-2">{site.modelDescription}</p>
                                            <button
                                              onClick={() => setShowModel(!showModel)}
                                              className="w-full px-3 py-2 bg-cyan-500/20 border border-cyan-500/50 rounded text-xs text-cyan-400 hover:bg-cyan-500/30 transition-colors"
                                            >
                                              {showModel ? 'Hide Model' : 'Load 3D Model'}
                                            </button>
                                          </>
                                        ) : (
                                          <>
                                            <div className="flex items-center gap-2 text-red-400 mb-3">
                                              <AlertTriangle className="w-4 h-4" />
                                              <h4 className="font-semibold text-xs tracking-wide">3D SCAN MISSING</h4>
                                            </div>
                                            <div className="bg-slate-900/50 rounded aspect-video mb-3 flex items-center justify-center border border-red-500/20">
                                              <div className="text-center">
                                                <Box className="w-12 h-12 text-red-400 mx-auto mb-2" />
                                                <p className="text-xs text-red-400">No preservation data available</p>
                                              </div>
                                            </div>
                                            <p className="text-gray-300 text-xs mb-3">{site.modelDescription}</p>
                                            <button className="w-full px-3 py-2 bg-red-500/20 border border-red-500/50 rounded text-xs text-red-400 hover:bg-red-500/30 transition-colors">
                                              Schedule 3D Documentation
                                            </button>
                                          </>
                                        )}
                                      </div>
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </div>

                              <div className="h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500 animate-pulse"></div>
                            </div>
                          </div>,
                          document.body
                        )}
                      </div>
                    ))}

                    {/* Scanning lines */}
                    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-lg">
                      <div className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-30 animate-pulse" style={{ top: '30%' }}></div>
                      <div className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-30 animate-pulse" style={{ top: '60%', animationDelay: '1s' }}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats Footer */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10">
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg border border-cyan-500/30 p-4 text-center">
                  <p className="text-cyan-400 text-xs md:text-sm tracking-wide">ACTIVE SITES</p>
                  <p className="text-3xl font-bold text-white mt-1">{digSites.filter(s => s.status === 'Active').length}</p>
                </div>
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg border border-cyan-500/30 p-4 text-center">
                  <p className="text-cyan-400 text-xs md:text-sm tracking-wide">WEATHER ALERTS</p>
                  <p className="text-3xl font-bold text-white mt-1">{digSites.filter(s => s.weather.alert).length}</p>
                </div>
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg border border-cyan-500/30 p-4 text-center">
                  <p className="text-cyan-400 text-xs md:text-sm tracking-wide">3D MODELS</p>
                  <p className="text-3xl font-bold text-white mt-1">{digSites.filter(s => s.has3DModel).length}</p>
                </div>
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg border border-cyan-500/30 p-4 text-center">
                  <p className="text-cyan-400 text-xs md:text-sm tracking-wide">CRITICAL SITES</p>
                  <p className="text-3xl font-bold text-white mt-1">{digSites.filter(s => s.weather.severity === 'catastrophic').length}</p>
                </div>
              </div>
            </motion.div>
          ) : mainTab === 'scientists' ? (
            <motion.div
              key="scientists"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-slate-800/30 backdrop-blur-sm rounded-lg border-2 border-cyan-500/30 p-4 md:p-6 shadow-2xl shadow-cyan-500/20">
                <h2 className="text-xl md:text-2xl font-bold text-cyan-400 mb-4 md:mb-6 tracking-wide">RECRUITMENT</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                  {scientists.map((scientist) => (
                    <div key={scientist.id} className="bg-slate-900/60 rounded-lg border border-cyan-500/20 overflow-hidden hover:border-cyan-500/50 transition-all">
                      <div className="p-4">
                        <div className="text-teal-400 text-xs font-semibold mb-1 tracking-wide">{scientist.name.split(' ')[0]}</div>
                        <div className="text-teal-300 text-lg font-bold mb-3">{scientist.name.split(' ')[1]}</div>

                        <ImageWithFallback src={scientist.photo} alt={scientist.name} className="bg-slate-800/50 rounded mb-3 aspect-[3/4] overflow-hidden border border-slate-700" />

                        <div className="space-y-2 mb-4 text-xs">
                          <div className="flex items-center justify-between text-teal-300">
                            <span>{scientist.title}</span>
                            <span>{scientist.logistics.current}/{scientist.logistics.max}</span>
                          </div>
                          <div className="flex items-center justify-between text-teal-300">
                            <span>Genetics</span>
                            <span>{scientist.genetics.current}/{scientist.genetics.max}</span>
                          </div>
                          <div className="flex items-center justify-between text-teal-300">
                            <span>Welfare</span>
                            <span>{scientist.welfare.current}/{scientist.welfare.max}</span>
                          </div>
                        </div>

                        <div className="mb-4">
                          <div className="text-white font-semibold text-xs mb-1">TRAITS</div>
                          <div className="text-teal-300 text-xs mb-1">💡 {scientist.trait}</div>
                          <div className="text-gray-400 text-xs">{scientist.traitDescription}</div>
                        </div>

                        <div className="mb-4">
                          <div className="text-white font-semibold text-xs mb-1">BIO</div>
                          <div className="flex items-center justify-between mb-2 text-xs">
                            <span className="text-gray-400">Salary</span>
                            <span className="text-white">${scientist.salary.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center justify-between mb-2 text-xs">
                            <span className="text-gray-400">Training</span>
                            <span className="text-white">LEVEL {scientist.trainingLevel}</span>
                          </div>
                          <p className="text-gray-400 text-xs line-clamp-3">{scientist.bio}</p>
                        </div>

                        <button className="w-full py-2 bg-teal-600/80 hover:bg-teal-600 rounded text-white text-sm font-semibold flex items-center justify-center gap-2 transition-colors">
                          <User className="w-4 h-4" />
                          RECRUIT SCIENTIST
                          <span className="text-xs">${scientist.salary.toLocaleString()}</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : mainTab === 'marketplace' ? (
            <motion.div
              key="marketplace"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-slate-800/30 backdrop-blur-sm rounded-lg border-2 border-cyan-500/30 p-4 md:p-6 shadow-2xl shadow-cyan-500/20">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 md:mb-6 gap-3">
                  <div>
                    <h2 className="text-xl md:text-2xl font-bold text-cyan-400 tracking-wide">MARKETPLACE</h2>
                    <p className="text-gray-400 text-xs md:text-sm">DINOSAURS › FLYING</p>
                  </div>
                  <button className="px-4 md:px-6 py-2 bg-cyan-600/80 hover:bg-cyan-600 rounded-lg text-white text-sm md:text-base font-semibold flex items-center justify-center gap-2 transition-colors">
                    <ShoppingCart className="w-4 h-4 md:w-5 md:h-5" />
                    <span className="hidden sm:inline">REFRESH LIST</span>
                    <span className="text-xs">$50,000</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 gap-2 md:gap-3">
                  {marketItems.map((item) => (
                    <div key={item.id} className="bg-slate-900/60 rounded-lg border border-cyan-500/20 hover:border-cyan-500/50 transition-all">
                      <div className="grid grid-cols-12 gap-2 md:gap-4 p-3 md:p-4 items-center">
                        <div className="col-span-1">
                          <div className="bg-slate-800/50 rounded aspect-square flex items-center justify-center border border-slate-700">
                            <Gem className="w-6 h-6 md:w-8 md:h-8 text-slate-600" />
                          </div>
                        </div>

                        <div className="col-span-4 md:col-span-3">
                          <div className="text-cyan-400 font-bold text-xs md:text-sm mb-1">{item.name}</div>
                          <div className="flex items-center gap-2">
                            <div className="text-gray-400 text-xs">👍 {item.rating}/100</div>
                          </div>
                        </div>

                        <div className="col-span-3 md:col-span-2 text-center">
                          <div className="text-gray-400 text-xs mb-1">AMOUNT</div>
                          <div className="text-teal-400 text-xs md:text-sm">♀️ {item.amount}</div>
                        </div>

                        <div className="col-span-3 md:col-span-2 text-center hidden md:block">
                          <div className="text-gray-400 text-xs mb-1">APPEAL</div>
                          <div className="text-white text-sm">⭐ {item.appeal.toLocaleString()}</div>
                        </div>

                        <div className="col-span-3 md:col-span-3 text-right">
                          <div className="text-gray-400 text-xs mb-1">PRICE</div>
                          <div className="text-white font-bold text-sm md:text-lg">${item.price.toLocaleString()}</div>
                          <div className="text-teal-400 text-xs">{item.priceStatus}</div>
                        </div>

                        <div className="col-span-1 flex justify-end">
                          <button className="p-1.5 md:p-2 bg-cyan-600/80 hover:bg-cyan-600 rounded text-white transition-colors">
                            <ShoppingCart className="w-4 h-4 md:w-5 md:h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : null}

          {mainTab === 'pathfinder' && (
            <motion.div
              key="pathfinder"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* PathFinder Header */}
              <div className="bg-slate-800/30 backdrop-blur-sm rounded-lg border-2 border-cyan-500/30 p-4 md:p-6 shadow-2xl shadow-cyan-500/20">
                <div className="flex items-center gap-3 mb-2">
                  <Navigation className="w-6 h-6 text-cyan-400" />
                  <h2 className="text-xl md:text-2xl font-bold text-cyan-400 tracking-wide">PATHFINDER</h2>
                </div>
                <p className="text-gray-400 text-xs md:text-sm mb-6">Real-time emergency resource matching — critical sites are automatically paired with the nearest available tools and institutions.</p>

                {/* Alert Summary Bar */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                  <div className="bg-red-500/10 border border-red-500/40 rounded-lg p-3 text-center">
                    <p className="text-red-400 text-2xl font-bold">{digSites.filter(s => s.weather.severity === 'catastrophic').length}</p>
                    <p className="text-red-400 text-xs tracking-wide mt-1">CRITICAL SITES</p>
                  </div>
                  <div className="bg-yellow-500/10 border border-yellow-500/40 rounded-lg p-3 text-center">
                    <p className="text-yellow-400 text-2xl font-bold">{digSites.filter(s => s.weather.severity === 'warning').length}</p>
                    <p className="text-yellow-400 text-xs tracking-wide mt-1">WARNING SITES</p>
                  </div>
                  <div className="bg-cyan-500/10 border border-cyan-500/40 rounded-lg p-3 text-center">
                    <p className="text-cyan-400 text-2xl font-bold">12</p>
                    <p className="text-cyan-400 text-xs tracking-wide mt-1">RESOURCES MATCHED</p>
                  </div>
                </div>

                {/* Per-site resource cards */}
                <div className="space-y-4">
                  {digSites.filter(s => s.weather.alert).map((site) => {

                    const resourceMap: Record<string, { tools: { name: string; source: string; sourceType: string; distance: string; eta: string; available: boolean; icon: any }[] }> = {
                      flood: {
                        tools: [
                          { name: "LiDAR Ground Scanner", source: "MIT Geosciences Dept.", sourceType: "University", distance: "12 km", eta: "45 min", available: true, icon: Radio },
                          { name: "Waterproof Excavation Kit", source: "NatGeo Field Depot", sourceType: "Depot", distance: "8 km", eta: "30 min", available: true, icon: Wrench },
                          { name: "Emergency Pump System", source: "State Civil Defense", sourceType: "Government", distance: "22 km", eta: "1h 10min", available: false, icon: Droplets },
                          { name: "Mobile Data Unit", source: "Stanford Paleo Lab", sourceType: "University", distance: "35 km", eta: "1h 45min", available: true, icon: Box },
                        ]
                      },
                      typhoon: {
                        tools: [
                          { name: "Wind-Resistant Shelter Kit", source: "Army Corps of Engineers", sourceType: "Government", distance: "18 km", eta: "55 min", available: true, icon: Zap },
                          { name: "Satellite Uplink Terminal", source: "Tokyo University Lab", sourceType: "University", distance: "41 km", eta: "2h 05min", available: true, icon: Satellite },
                          { name: "Rapid Specimen Container", source: "Fossil Shield Co.", sourceType: "Supplier", distance: "9 km", eta: "35 min", available: true, icon: Box },
                          { name: "Emergency Drone Fleet", source: "AeroPaleo Systems", sourceType: "Supplier", distance: "27 km", eta: "1h 20min", available: false, icon: Camera },
                        ]
                      },
                      thunderstorm: {
                        tools: [
                          { name: "Faraday-Shielded Storage", source: "Harvard Earth Sciences", sourceType: "University", distance: "6 km", eta: "20 min", available: true, icon: Zap },
                          { name: "Grounding Rod Set", source: "Field Safety Supplies", sourceType: "Supplier", distance: "4 km", eta: "15 min", available: true, icon: Wrench },
                          { name: "Portable Weather Station", source: "NOAA Field Office", sourceType: "Government", distance: "14 km", eta: "50 min", available: true, icon: Thermometer },
                          { name: "Rapid Resin Kit", source: "PaleoTech Depot", sourceType: "Depot", distance: "19 km", eta: "1h 05min", available: false, icon: Box },
                        ]
                      },
                      rainy: {
                        tools: [
                          { name: "Waterproof Tarps & Frames", source: "FieldCraft Supply Co.", sourceType: "Supplier", distance: "5 km", eta: "18 min", available: true, icon: Droplets },
                          { name: "Drainage Pump Set", source: "Lima Civil Rescue", sourceType: "Government", distance: "11 km", eta: "40 min", available: true, icon: Droplets },
                          { name: "Ground Moisture Sensors", source: "UC Berkeley GeoLab", sourceType: "University", distance: "28 km", eta: "1h 30min", available: true, icon: Radio },
                          { name: "Preservation Resin Kit", source: "Fossil Care Intl.", sourceType: "Supplier", distance: "16 km", eta: "55 min", available: false, icon: Box },
                        ]
                      },
                      sunny: {
                        tools: [
                          { name: "UV Protection Canopies", source: "Desert Field Depot", sourceType: "Depot", distance: "3 km", eta: "10 min", available: true, icon: Thermometer },
                          { name: "Hydration Supply Unit", source: "Red Cross Station A", sourceType: "Government", distance: "7 km", eta: "25 min", available: true, icon: Droplets },
                          { name: "Heat-Resistant Sample Bags", source: "Cairo Uni. Sciences", sourceType: "University", distance: "15 km", eta: "50 min", available: true, icon: Box },
                          { name: "Portable Cooling System", source: "ClimaTech Rentals", sourceType: "Supplier", distance: "24 km", eta: "1h 20min", available: false, icon: Zap },
                        ]
                      },
                    };

                    const resources = resourceMap[site.weather.condition]?.tools ?? [];
                    const sourceTypeIcon = (type: string) => {
                      if (type === 'University') return <GraduationCap className="w-3 h-3" />;
                      if (type === 'Government') return <Building2 className="w-3 h-3" />;
                      if (type === 'Supplier') return <Truck className="w-3 h-3" />;
                      return <Box className="w-3 h-3" />;
                    };

                    return (
                      <div key={site.id} className={`rounded-lg border overflow-hidden ${site.weather.severity === 'catastrophic'
                          ? 'border-red-500/40 bg-red-500/5'
                          : 'border-yellow-500/40 bg-yellow-500/5'
                        }`}>
                        {/* Site Header */}
                        <div className={`px-4 py-3 flex items-center justify-between ${site.weather.severity === 'catastrophic' ? 'bg-red-500/15' : 'bg-yellow-500/15'
                          }`}>
                          <div className="flex items-center gap-3">
                            <div className={`w-2 h-2 rounded-full animate-pulse ${site.weather.severity === 'catastrophic' ? 'bg-red-400' : 'bg-yellow-400'
                              }`}></div>
                            <div>
                              <p className="text-white font-bold text-sm">{site.name}</p>
                              <p className="text-gray-400 text-xs">{site.location} • {site.weather.condition.toUpperCase()} • {site.weather.temperature}°F</p>
                            </div>
                          </div>
                          <div className={`px-2 py-1 rounded text-xs font-bold ${site.weather.severity === 'catastrophic'
                              ? 'bg-red-500/30 text-red-400'
                              : 'bg-yellow-500/30 text-yellow-400'
                            }`}>
                            {site.weather.severity.toUpperCase()}
                          </div>
                        </div>

                        {/* Alert message */}
                        <div className="px-4 py-2 border-b border-slate-700/50">
                          <p className="text-gray-300 text-xs flex items-center gap-2">
                            <AlertTriangle className={`w-3 h-3 flex-shrink-0 ${site.weather.severity === 'catastrophic' ? 'text-red-400' : 'text-yellow-400'}`} />
                            {site.weather.alertMessage}
                          </p>
                        </div>

                        {/* Resource matches */}
                        <div className="p-4">
                          <p className="text-cyan-400 text-xs font-semibold tracking-wide mb-3 flex items-center gap-2">
                            <Navigation className="w-3 h-3" />
                            NEAREST AVAILABLE RESOURCES
                          </p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {resources.map((resource, idx) => (
                              <div key={idx} className={`rounded-lg p-3 border flex items-start gap-3 ${resource.available
                                  ? 'bg-slate-800/60 border-slate-700/60'
                                  : 'bg-slate-900/40 border-slate-800/40 opacity-60'
                                }`}>
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${resource.available ? 'bg-cyan-500/20' : 'bg-slate-700/50'
                                  }`}>
                                  <resource.icon className={`w-4 h-4 ${resource.available ? 'text-cyan-400' : 'text-gray-500'}`} />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-white text-xs font-semibold truncate">{resource.name}</p>
                                  <div className="flex items-center gap-1 mt-0.5">
                                    <span className={`text-xs ${resource.available ? 'text-cyan-300' : 'text-gray-500'}`}>{sourceTypeIcon(resource.sourceType)}</span>
                                    <p className="text-gray-400 text-xs truncate">{resource.source}</p>
                                  </div>
                                  <div className="flex items-center gap-3 mt-1.5">
                                    <span className="text-gray-400 text-xs flex items-center gap-1">
                                      <MapPin className="w-2.5 h-2.5" />{resource.distance}
                                    </span>
                                    <span className="text-gray-400 text-xs flex items-center gap-1">
                                      <Clock className="w-2.5 h-2.5" />{resource.eta}
                                    </span>
                                    {resource.available
                                      ? <span className="text-green-400 text-xs flex items-center gap-1"><CheckCircle className="w-2.5 h-2.5" />Available</span>
                                      : <span className="text-red-400 text-xs">Unavailable</span>
                                    }
                                  </div>
                                </div>
                                {resource.available && (
                                  <button className="flex-shrink-0 p-1.5 bg-cyan-500/20 border border-cyan-500/40 rounded text-cyan-400 hover:bg-cyan-500/30 transition-colors">
                                    <Phone className="w-3 h-3" />
                                  </button>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default DigSiteLocator;