import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { EventPass, ScanResult } from '../types';

interface PassStore {
  passes: EventPass[];
  isLoaded: boolean;
  loadPasses: (passes: EventPass[]) => void;
  validatePass: (scannedData: string, isQRScan: boolean) => ScanResult;
  resetPasses: () => void;
}

export const usePassStore = create<PassStore>()(
  persist(
    (set, get) => ({
      passes: [],
      isLoaded: false,
      
      loadPasses: (passes: EventPass[]) => {
        set({ passes, isLoaded: true });
      },
      
      validatePass: (scannedData: string, isQRScan: boolean) => {
        const { passes } = get();
        const eventPass = isQRScan
          ? passes.find(pass => pass.validQRCodes.includes(scannedData))
          : passes.find(pass => pass.id === scannedData);

        if (!eventPass) {
          return {
            success: false,
            message: isQRScan ? 'Invalid QR Code' : 'Invalid Pass'
          };
        }

        if (eventPass.counter <= 0) {
          return {
            success: false,
            message: `No uses remaining for ${eventPass.name}`
          };
        }

        if (isQRScan && eventPass.usedQRCodes.includes(scannedData)) {
          return {
            success: false,
            message: 'This QR code has already been used'
          };
        }

        set((state) => ({
          passes: state.passes.map((pass) => 
            pass.id === eventPass.id
              ? {
                  ...pass,
                  counter: pass.counter - 1,
                  usedQRCodes: isQRScan 
                    ? [...pass.usedQRCodes, scannedData]
                    : pass.usedQRCodes
                }
              : pass
          )
        }));

        return {
          success: true,
          message: `Successfully validated ${eventPass.name}`
        };
      },

      resetPasses: () => set({ passes: [], isLoaded: false })
    }),
    {
      name: 'event-passes',
      storage: createJSONStorage(() => localStorage)
    }
  )
);