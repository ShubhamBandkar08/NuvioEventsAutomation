import { locationData } from './location.data.js';
import { businessUnitData } from './businessUnit.data.js';


export const timeSlotData = {
  startTime: {
    hh: '11',
    mm: '01',
  },
  endTime: {
    hh: '15',
    mm: '01',
  },
  businessUnit: businessUnitData.name,
  location: locationData.locationName
};
