import type { DigSite } from '../types';

export const digSites: DigSite[] = [
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
