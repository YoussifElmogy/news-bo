// src/utils/exportUtils.js
import { saveAs } from 'file-saver';

// Format airport names
const formatAirportName = (airportName) => {
  if (!airportName) return 'N/A';
  
  // Map airport codes to formatted names
  const airportMap = {
    'CAIRO_AIRPORT': 'Cairo Airport',
    'HURGHADA_AIRPORT': 'Hurghada Airport',
  };
  
  // Return formatted name if exists, otherwise return original
  return airportMap[airportName] || airportName;
};
