import React from 'react';
import { QRCode } from '../types';
import { QrCode } from 'lucide-react';

interface QRListProps {
  codes: QRCode[];
}

export const QRList: React.FC<QRListProps> = ({ codes }) => {
  return (
    <div className="mt-6 space-y-4">
      <h2 className="text-xl font-semibold text-gray-800">Available Passes</h2>
      <div className="space-y-3">
        {codes.map((code) => (
          <div
            key={code.id}
            className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm"
          >
            <div className="flex items-center space-x-3">
              <QrCode className="text-gray-600" />
              <div>
                <h3 className="font-medium text-gray-800">{code.name}</h3>
                <p className="text-sm text-gray-500">ID: {code.id}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="px-3 py-1 text-sm font-medium rounded-full bg-blue-100 text-blue-800">
                {code.counter} uses left
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};