import { EventPass } from '../types';

export const initialEventPasses: EventPass[] = [
  { 
    id: 'PASS1',
    name: 'Event Pass A',
    counter: 3,
    validQRCodes: ['QR1A', 'QR1B', 'QR1C'],
    usedQRCodes: []
  },
  { 
    id: 'PASS2',
    name: 'Event Pass B',
    counter: 2,
    validQRCodes: ['QR2A', 'QR2B'],
    usedQRCodes: []
  },
  { 
    id: 'PASS3',
    name: 'VIP Pass',
    counter: 1,
    validQRCodes: ['VIPA', 'VIPB', 'VIPC', 'VIPD'],
    usedQRCodes: []
  },
];