import React from 'react';
import { Scanner } from './components/Scanner';
import { PassList } from './components/PassList';
import { SearchValidator } from './components/SearchValidator';
import { FileUpload } from './components/FileUpload';
import { usePassStore } from './stores/passStore';

function App() {
  const { passes, isLoaded, loadPasses, validatePass } = usePassStore();

  const handleQRScan = (scannedData: string) => {
    return validatePass(scannedData, true);
  };

  const handleManualValidation = (passId: string) => {
    return validatePass(passId, false);
  };

  if (!isLoaded) {
    return <FileUpload onFileLoad={loadPasses} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      <div className="max-w-md mx-auto p-4">
        <Scanner onScan={handleQRScan} />
        <SearchValidator passes={passes} onValidate={handleManualValidation} />
        <PassList passes={passes} />
      </div>
    </div>
  );
}

export default App;