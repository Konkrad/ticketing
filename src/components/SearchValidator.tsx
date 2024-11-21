import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { EventPass, ScanResult } from '../types';

interface SearchValidatorProps {
  passes: EventPass[];
  onValidate: (id: string) => ScanResult;
}

export const SearchValidator: React.FC<SearchValidatorProps> = ({ passes, onValidate }) => {
  const [search, setSearch] = useState('');
  const [result, setResult] = useState<ScanResult | null>(null);

  const filteredPasses = passes.filter(pass => 
    pass.id.toLowerCase().includes(search.toLowerCase()) ||
    pass.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleValidate = (id: string) => {
    const result = onValidate(id);
    setResult(result);
    
    if (!result.success && navigator.vibrate) {
      navigator.vibrate(400);
    }

    setTimeout(() => setResult(null), 2000);
  };

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Manual Validation</h2>
      
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Search by ID or name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="mt-4 space-y-2">
        {filteredPasses.map(pass => (
          <div
            key={pass.id}
            className={`p-4 rounded-lg bg-white shadow-sm flex items-center justify-between
              ${result && result.message.includes(pass.name) 
                ? (result.success ? 'bg-green-50' : 'bg-red-50') 
                : ''}`}
          >
            <div>
              <h3 className="font-medium text-gray-800">{pass.name}</h3>
              <p className="text-sm text-gray-500">ID: {pass.id}</p>
            </div>
            <button
              onClick={() => handleValidate(pass.id)}
              className={`px-4 py-2 rounded-lg transition-colors
                ${pass.counter > 0 
                  ? 'bg-blue-600 text-white hover:bg-blue-700' 
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`}
              disabled={pass.counter <= 0}
            >
              Validate
            </button>
          </div>
        ))}
        
        {search && filteredPasses.length === 0 && (
          <p className="text-center text-gray-500 py-4">No passes found</p>
        )}
      </div>

      {result && (
        <div className={`mt-4 p-4 rounded-lg text-center font-medium
          ${result.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {result.message}
        </div>
      )}
    </div>
  );
};