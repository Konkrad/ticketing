import React, { useEffect, useRef, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { Camera, CameraOff } from 'lucide-react';
import { ScanResult } from '../types';

interface ScannerProps {
  onScan: (data: string) => ScanResult;
}

export const Scanner: React.FC<ScannerProps> = ({ onScan }) => {
  const [isScanning, setIsScanning] = useState(true);
  const [lastResult, setLastResult] = useState<ScanResult | null>(null);
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);

  useEffect(() => {
    if (isScanning && !scannerRef.current) {
      scannerRef.current = new Html5QrcodeScanner(
        'qr-reader',
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
          aspectRatio: 1,
        },
        true
      );

      scannerRef.current.render((decodedText) => {
        const result = onScan(decodedText);
        setLastResult(result);
        
        if (!result.success && navigator.vibrate) {
          navigator.vibrate(400);
        }
        
        // setTimeout(() => setLastResult(null), 2000);
      }, (error) => {
        console.warn(error);
      });
    }

    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear().catch(console.error);
        scannerRef.current = null;
      }
    };
  }, [isScanning, onScan]);

  const toggleScanner = () => {
    setIsScanning(!isScanning);
    if (scannerRef.current) {
      scannerRef.current.clear().catch(console.error);
      scannerRef.current = null;
    }
  };

  const getStatusColor = () => {
    if (!lastResult) return 'bg-gray-100';
    return lastResult.success ? 'bg-green-100' : 'bg-red-100';
  };

  return (
    <div className={`p-4 rounded-lg transition-colors ${getStatusColor()}`}>
      <div className="relative">
        <button
          onClick={toggleScanner}
          className="absolute top-2 right-2 z-10 p-2 bg-white rounded-full shadow-lg"
        >
          {isScanning ? <CameraOff size={24} /> : <Camera size={24} />}
        </button>
        
        <div className="overflow-hidden rounded-lg">
          <div id="qr-reader" className="w-full" />
        </div>
      </div>
      
      {lastResult && (
        <div className={`mt-4 p-4 rounded-lg text-center font-medium
          ${lastResult.success ? 'text-green-800' : 'text-red-800'}`}>
          {lastResult.message}
        </div>
      )}
    </div>
  );
};