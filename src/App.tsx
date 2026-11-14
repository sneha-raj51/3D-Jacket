import React, { useState } from 'react';
import { Scene, type CameraPreset } from './components/Scene';
import { ControlBar } from './components/UI/ControlBar';

export const App: React.FC = () => {
  const [autoRotate, setAutoRotate] = useState<boolean>(false);
  const [currentPreset, setCurrentPreset] = useState<CameraPreset>('front');

  const handleSelectPreset = (preset: CameraPreset) => {
    if (autoRotate) {
      setAutoRotate(false);
    }
    setCurrentPreset(preset);
  };

  const handleToggleAutoRotate = () => {
    setAutoRotate(prev => !prev);
  };

  return (
    <div className="w-screen h-screen relative overflow-hidden bg-[#0c0d10] studio-gradient select-none">
      {/* Full-Screen 3D Interactive Canvas Scene */}
      <Scene
        autoRotate={autoRotate}
        currentPreset={currentPreset}
        onUserDragStart={() => {
          if (autoRotate) setAutoRotate(false);
        }}
      />

      {/* Minimal Floating Bottom Control Bar */}
      <ControlBar
        currentPreset={currentPreset}
        onSelectPreset={handleSelectPreset}
        autoRotate={autoRotate}
        onToggleAutoRotate={handleToggleAutoRotate}
      />
    </div>
  );
};

export default App;
