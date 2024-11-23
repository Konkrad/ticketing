import React from 'react';
import { Upload } from 'lucide-react';
import { EventPass } from '../types';

interface FileUploadProps {
  onFileLoad: (passes: EventPass[]) => void;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onFileLoad }) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const passes = JSON.parse(content) as EventPass[];
        onFileLoad(passes);
      } catch (error) {
        console.error('Error parsing JSON file:', error);
        alert('Invalid JSON file format. Please check your file and try again.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-lg shadow-lg p-6 text-center">
          <div className="mb-6">
            <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <Upload className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className="mt-4 text-xl font-semibold text-gray-800">Load Event Passes</h2>
            <p className="mt-2 text-sm text-gray-600">
              Select your event passes JSON file to begin
            </p>
          </div>
          
          <label className="relative block">
            <input
              type="file"
              accept=".json"
              onChange={handleFileChange}
              className="hidden"
              id="file-upload"
            />
            <button
              onClick={() => document.getElementById('file-upload')?.click()}
              className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Choose File
            </button>
          </label>
        </div>
      </div>
    </div>
  );
};