import { Radio, Wrench, Droplets, Box, Zap, Satellite, Camera, Thermometer, GraduationCap, Building2, Truck } from 'lucide-react';

export const resourceMap: Record<string, { tools: { name: string; source: string; sourceType: string; distance: string; eta: string; available: boolean; icon: any }[] }> = {
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

export const sourceTypeIcon = (type: string) => {
  if (type === 'University') return <GraduationCap className="w-3 h-3" />;
  if (type === 'Government') return <Building2 className="w-3 h-3" />;
  if (type === 'Supplier') return <Truck className="w-3 h-3" />;
  return <Box className="w-3 h-3" />;
};
