import React, { useState } from 'react';
import { Scanner } from './components/Scanner';
import { PassList } from './components/PassList';
import { SearchValidator } from './components/SearchValidator';
import { EventPass, ScanResult } from './types';
import { initialEventPasses } from './data/qrCodes';
import { QrCode } from 'lucide-react';

function App() {
  const [eventPasses, setEventPasses] = useState<EventPass[]>(initialEventPasses);

  const handleValidation = (scannedData: string, isQRScan: boolean = false): ScanResult => {
    const eventPass = isQRScan
      ? eventPasses.find(pass => pass.validQRCodes.includes(scannedData))
      : eventPasses.find(pass => pass.id === scannedData);
    
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

    // For QR scans, check if the code has already been used
    if (isQRScan && eventPass.usedQRCodes.includes(scannedData)) {
      return {
        success: false,
        message: 'This QR code has already been used'
      };
    }

    // Update counter and mark QR code as used if it's a QR scan
    setEventPasses(prevPasses =>
      prevPasses.map(pass =>
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
    );

    return {
      success: true,
      message: `Successfully validated ${eventPass.name}`
    };
  };

  const handleQRScan = (scannedData: string): ScanResult => {
    return handleValidation(scannedData, true);
  };

  const handleManualValidation = (passId: string): ScanResult => {
    return handleValidation(passId, false);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      <div className="max-w-md mx-auto p-4">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <QrCode size={32} className="text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Pass Validator</h1>
          <p className="text-gray-600">Scan QR code or search to verify access</p>
        </div>

        <Scanner onScan={handleQRScan} />
        <SearchValidator passes={eventPasses} onValidate={handleManualValidation} />
        <PassList passes={eventPasses} />
      </div>
    </div>
  );
}

export default App;