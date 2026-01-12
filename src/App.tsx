import { useState, useEffect, useRef } from 'react';
import { MapPin, Users, Wrench, Gem, X } from 'lucide-react';

const DigSiteLocator = () => {
  const [selectedSite, setSelectedSite] = useState<any>(null); /* #Pls dont use any */
  const [animatingItems, setAnimatingItems] = useState<any>({});
  const panelRef = useRef<HTMLDivElement>(null);

  const digSites = [
    {
      id: 1,
      name: "Morrison Formation",
      location: "Colorado, USA",
      coordinates: { x: 25, y: 35 },
      discoveries: ["Stegosaurus", "Allosaurus", "Brachiosaurus"],
      team: "Team Alpha - 6 members",
      tools: ["Ground Penetrating Radar", "Excavation Tools", "Preservation Kit"],
      status: "Active"
    },
    {
      id: 2,
      name: "Hell Creek Formation",
      location: "Montana, USA",
      coordinates: { x: 30, y: 25 },
      discoveries: ["Tyrannosaurus Rex", "Triceratops", "Ankylosaurus"],
      team: "Team Bravo - 8 members",
      tools: ["3D Scanner", "Heavy Machinery", "Chemical Analysis Kit"],
      status: "Active"
    },
    {
      id: 3,
      name: "Solnhofen Limestone",
      location: "Bavaria, Germany",
      coordinates: { x: 55, y: 30 },
      discoveries: ["Archaeopteryx", "Pterodactylus", "Marine Reptiles"],
      team: "Team Delta - 5 members",
      tools: ["Fine Brushes", "Microscope", "Digital Mapping"],
      status: "Planning"
    },
    {
      id: 4,
      name: "Gobi Desert",
      location: "Mongolia",
      coordinates: { x: 70, y: 40 },
      discoveries: ["Velociraptor", "Protoceratops", "Oviraptor"],
      team: "Team Gamma - 7 members",
      tools: ["Drone Survey", "GPS Markers", "Climate Control"],
      status: "Active"
    },
    {
      id: 5,
      name: "Patagonia Formation",
      location: "Argentina",
      coordinates: { x: 35, y: 75 },
      discoveries: ["Argentinosaurus", "Giganotosaurus", "Carnotaurus"],
      team: "Team Epsilon - 9 members",
      tools: ["Seismic Sensors", "Heavy Excavators", "Airlifting Equipment"],
      status: "Active"
    }
  ];

  useEffect(() => {
    if (selectedSite) {
      setAnimatingItems({});
      
      // Animate panel entrance
      if (panelRef.current) {
        panelRef.current.style.opacity = '0';
        panelRef.current.style.transform = 'scale(0.8) translateY(20px)';
        
        requestAnimationFrame(() => {
          if (panelRef.current) {
            panelRef.current.style.transition = 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
            panelRef.current.style.opacity = '1';
            panelRef.current.style.transform = 'scale(1) translateY(0)';
          }
        });
      }

      // Stagger animations for content
      const timers = [
        setTimeout(() => setAnimatingItems((prev: any) => ({ ...prev, header: true })), 100),
        setTimeout(() => setAnimatingItems((prev: any) => ({ ...prev, status: true })), 200),
        setTimeout(() => setAnimatingItems((prev: any) => ({ ...prev, discoveries: true })), 300),
        setTimeout(() => setAnimatingItems((prev: any) => ({ ...prev, team: true })), 500),
        setTimeout(() => setAnimatingItems((prev: any) => ({ ...prev, tools: true })), 700)
      ];

      return () => timers.forEach(timer => clearTimeout(timer));
    }
  }, [selectedSite]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-6">
      <style>{`
        @keyframes slideInFromLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInFromBottom {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.5);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes glowPulse {
          0%, 100% {
            box-shadow: 0 0 20px rgba(34, 211, 238, 0.3);
          }
          50% {
            box-shadow: 0 0 40px rgba(34, 211, 238, 0.6);
          }
        }

        .animate-slide-left {
          animation: slideInFromLeft 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        .animate-slide-bottom {
          animation: slideInFromBottom 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        .animate-scale-in {
          animation: scaleIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        .glow-pulse {
          animation: glowPulse 2s ease-in-out infinite;
        }

        .item-hidden {
          opacity: 0;
        }
      `}</style>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-5xl font-bold text-cyan-400 mb-2 tracking-wider">
            PALEO LINK
          </h1>
          <div className="h-1 w-64 mx-auto bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>
          <p className="text-cyan-200 mt-3 text-sm tracking-widest">GLOBAL EXCAVATION NETWORK</p>
        </div>

        {/* Map Section - Full Width */}
        <div className="mb-6">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg border-2 border-cyan-500/30 p-6 shadow-2xl shadow-cyan-500/20">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-cyan-400 tracking-wide">WORLD MAP</h2>
              <div className="flex gap-4 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse"></div>
                  <span className="text-green-400">Active</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <span className="text-yellow-400">Planning</span>
                </div>
              </div>
            </div>
            
            {/* Map Container */}
            <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 rounded-lg border border-cyan-500/20 overflow-visible" style={{ height: '600px' }}>
              {/* World Map SVG Background */}
              <div className="absolute inset-0 overflow-hidden rounded-lg">
                <svg width="100%" height="100%" viewBox="0 0 1000 500" className="opacity-20">
                  {/* Continents simplified shapes */}
                  {/* North America */}
                  <path d="M150,100 L180,80 L220,90 L250,70 L280,90 L270,150 L250,180 L200,200 L180,180 L150,160 Z" fill="rgba(34, 211, 238, 0.3)" stroke="cyan" strokeWidth="0.5"/>
                  {/* South America */}
                  <path d="M280,250 L300,240 L320,260 L310,320 L290,360 L270,340 L260,300 Z" fill="rgba(34, 211, 238, 0.3)" stroke="cyan" strokeWidth="0.5"/>
                  {/* Europe */}
                  <path d="M480,120 L520,110 L540,130 L530,160 L500,170 L480,150 Z" fill="rgba(34, 211, 238, 0.3)" stroke="cyan" strokeWidth="0.5"/>
                  {/* Africa */}
                  <path d="M480,180 L520,175 L540,200 L550,250 L540,300 L500,320 L480,290 L470,240 Z" fill="rgba(34, 211, 238, 0.3)" stroke="cyan" strokeWidth="0.5"/>
                  {/* Asia */}
                  <path d="M550,80 L650,70 L720,90 L750,120 L740,160 L700,180 L650,170 L600,150 L570,130 Z" fill="rgba(34, 211, 238, 0.3)" stroke="cyan" strokeWidth="0.5"/>
                  {/* Australia */}
                  <path d="M700,320 L750,310 L780,330 L770,360 L740,370 L710,360 Z" fill="rgba(34, 211, 238, 0.3)" stroke="cyan" strokeWidth="0.5"/>
                  
                  {/* Latitude lines */}
                  <line x1="0" y1="125" x2="1000" y2="125" stroke="cyan" strokeWidth="0.3" opacity="0.3"/>
                  <line x1="0" y1="250" x2="1000" y2="250" stroke="cyan" strokeWidth="0.3" opacity="0.5"/>
                  <line x1="0" y1="375" x2="1000" y2="375" stroke="cyan" strokeWidth="0.3" opacity="0.3"/>
                  
                  {/* Longitude lines */}
                  <line x1="250" y1="0" x2="250" y2="500" stroke="cyan" strokeWidth="0.3" opacity="0.3"/>
                  <line x1="500" y1="0" x2="500" y2="500" stroke="cyan" strokeWidth="0.3" opacity="0.5"/>
                  <line x1="750" y1="0" x2="750" y2="500" stroke="cyan" strokeWidth="0.3" opacity="0.3"/>
                </svg>
              </div>
              
              {/* Grid overlay */}
              <div className="absolute inset-0 opacity-20 overflow-hidden rounded-lg">
                <svg width="100%" height="100%">
                  <defs>
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="cyan" strokeWidth="0.5"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
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
                    zIndex: selectedSite?.id === site.id ? 50 : 10
                  }}
                >
                  <button
                    onClick={() => setSelectedSite(selectedSite?.id === site.id ? null : site)}
                    className="relative group z-10"
                  >
                    <div className="relative">
                      {/* Pulse ring */}
                      <div className={`absolute inset-0 rounded-full ${site.status === 'Active' ? 'bg-green-400 animate-ping' : 'bg-yellow-400'} opacity-75`}></div>
                      
                      {/* Main marker */}
                      <div className={`relative w-10 h-10 rounded-full ${site.status === 'Active' ? 'bg-green-400' : 'bg-yellow-400'} border-2 border-white shadow-lg flex items-center justify-center transition-all duration-300 ${selectedSite?.id === site.id ? 'scale-125' : 'group-hover:scale-110'}`}>
                        <MapPin className="w-5 h-5 text-slate-900" />
                      </div>
                    </div>
                  </button>

                  {/* Info Panel - Appears near marker */}
                  {selectedSite?.id === site.id && (
                    <div 
                      ref={panelRef}
                      className="absolute"
                      style={{
                        left: site.coordinates.x > 50 ? 'auto' : '60px',
                        right: site.coordinates.x > 50 ? '60px' : 'auto',
                        top: site.coordinates.y > 50 ? 'auto' : '0',
                        bottom: site.coordinates.y > 50 ? '0' : 'auto',
                        minWidth: '340px',
                        maxWidth: '380px'
                      }}
                    >
                      <div className="bg-slate-900/95 backdrop-blur-md rounded-lg border-2 border-cyan-500/50 shadow-2xl shadow-cyan-500/30 overflow-hidden glow-pulse">
                        {/* Animated top bar */}
                        <div className="h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500 animate-pulse"></div>
                        
                        <div className="p-4">
                          {/* Header with close button */}
                          <div className="flex items-start justify-between mb-3 border-b border-cyan-500/30 pb-3">
                            <div className="flex-1">
                              <h3 className={`text-lg font-bold text-white mb-1 ${animatingItems.header ? 'animate-slide-left' : 'item-hidden'}`}>
                                {site.name}
                              </h3>
                              <p className={`text-cyan-300 text-xs ${animatingItems.header ? 'animate-slide-left' : 'item-hidden'}`} style={{ animationDelay: '0.1s' }}>
                                {site.location}
                              </p>
                              <div className={`mt-2 ${animatingItems.status ? 'animate-scale-in' : 'item-hidden'}`}>
                                <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                                  site.status === 'Active' 
                                    ? 'bg-green-500/20 text-green-400 border border-green-500/50' 
                                    : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/50'
                                }`}>
                                  {site.status}
                                </span>
                              </div>
                            </div>
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                if (panelRef.current) {
                                  panelRef.current.style.transition = 'all 0.3s ease-out';
                                  panelRef.current.style.opacity = '0';
                                  panelRef.current.style.transform = 'scale(0.8) translateY(20px)';
                                  setTimeout(() => setSelectedSite(null), 300);
                                }
                              }}
                              className="text-cyan-400 hover:text-cyan-300 transition-colors animate-scale-in"
                            >
                              <X className="w-5 h-5" />
                            </button>
                          </div>

                          {/* Discoveries */}
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

                          {/* Team */}
                          <div className={`mb-3 ${animatingItems.team ? 'animate-slide-bottom' : 'item-hidden'}`}>
                            <div className="flex items-center gap-2 text-cyan-400 mb-2">
                              <Users className="w-4 h-4" />
                              <h4 className="font-semibold text-xs tracking-wide">TEAM</h4>
                            </div>
                            <div className="bg-slate-800/50 rounded p-2 border border-cyan-500/20">
                              <p className="text-gray-300 text-xs">{site.team}</p>
                            </div>
                          </div>

                          {/* Tools */}
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
                        </div>

                        {/* Animated bottom bar */}
                        <div className="h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                      </div>

                      {/* Connection line to marker */}
                      <div 
                        className="absolute w-0.5 bg-gradient-to-b from-cyan-500 to-transparent"
                        style={{
                          height: '20px',
                          left: site.coordinates.x > 50 ? 'auto' : '-20px',
                          right: site.coordinates.x > 50 ? '-20px' : 'auto',
                          top: site.coordinates.y > 50 ? 'auto' : '-20px',
                          bottom: site.coordinates.y > 50 ? '-20px' : 'auto',
                          animation: 'scaleIn 0.3s ease-out forwards'
                        }}
                      ></div>
                    </div>
                  )}
                </div>
              ))}

              {/* Scanning lines effect */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-lg">
                <div className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-30 animate-pulse" style={{ top: '30%' }}></div>
                <div className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-30 animate-pulse" style={{ top: '60%', animationDelay: '1s' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Footer */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg border border-cyan-500/30 p-4 text-center">
            <p className="text-cyan-400 text-sm tracking-wide">ACTIVE SITES</p>
            <p className="text-3xl font-bold text-white mt-1">{digSites.filter(s => s.status === 'Active').length}</p>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg border border-cyan-500/30 p-4 text-center">
            <p className="text-cyan-400 text-sm tracking-wide">TOTAL SITES</p>
            <p className="text-3xl font-bold text-white mt-1">{digSites.length}</p>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg border border-cyan-500/30 p-4 text-center">
            <p className="text-cyan-400 text-sm tracking-wide">TEAM MEMBERS</p>
            <p className="text-3xl font-bold text-white mt-1">35</p>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg border border-cyan-500/30 p-4 text-center">
            <p className="text-cyan-400 text-sm tracking-wide">DISCOVERIES</p>
            <p className="text-3xl font-bold text-white mt-1">17</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DigSiteLocator;