import { locationData } from './location.data.js';
import { businessUnitData } from './businessUnit.data.js';


export const timeSlotData = {
  startTime: {
    hh: '11',
    mm: '00',
  },
  endTime: {
    hh: '15',
    mm: '00',
  },
  businessUnit: businessUnitData.name,
  location: locationData.locationName
};
