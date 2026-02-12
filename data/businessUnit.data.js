import { taxTypedata } from './taxType.data.js';
import { ticketClassData } from './ticketClass.data.js';
export const businessUnitData = {
    name: 'Dubai Aquarium & Underwater Zoo',
    code: 'DAUZ',
    description: 'Adventure Family Friendly Group Bookings testings',
    country: 'United Arab Emirates',
    city: 'dubai',
    timeZone: 'dubai',
    taxType: taxTypedata.taxTypeName,
    cumulativeCapacity: '100',
    role: 'POS User',
    registrationNumber: 'REG-BU-056789',
    ticketClass: ticketClassData.ticketClassName,
}   