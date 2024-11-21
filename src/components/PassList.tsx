import React from 'react';
import { EventPass } from '../types';
import { QrCode } from 'lucide-react';

interface PassListProps {
  passes: EventPass[];
}

export const PassList: React.FC<PassListProps> = ({ passes }) => {
  return (
    <div className="mt-6 space-y-4">
      <h2 className="text-xl font-semibold text-gray-800">Available Passes</h2>
      <div className="space-y-3">
        {passes.map((pass) => (
          <div
            key={pass.id}
            className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm"
          >
            <div className="flex items-center space-x-3">
              <QrCode className="text-gray-600" />
              <div>
                <h3 className="font-medium text-gray-800">{pass.name}</h3>
                <p className="text-sm text-gray-500">ID: {pass.id}</p>
                <p className="text-xs text-gray-400">
                  {pass.validQRCodes.length - pass.usedQRCodes.length} unused QR codes
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className={`px-3 py-1 text-sm font-medium rounded-full 
                ${pass.counter > 0 ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}>
                {pass.counter} uses left
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};