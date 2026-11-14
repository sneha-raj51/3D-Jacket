import React from 'react';
import { RotateCw, Pause } from 'lucide-react';
import type { CameraPreset } from '../Scene';

interface ControlBarProps {
  currentPreset: CameraPreset;
  onSelectPreset: (preset: CameraPreset) => void;
  autoRotate: boolean;
  onToggleAutoRotate: () => void;
}

export const ControlBar: React.FC<ControlBarProps> = ({
  currentPreset,
  onSelectPreset,
  autoRotate,
  onToggleAutoRotate
}) => {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center justify-center max-w-[95vw]">
      <div className="flex flex-wrap items-center justify-center gap-1.5 p-1.5 rounded-full bg-[#121318]/75 border border-white/10 backdrop-blur-xl shadow-2xl transition-all">
        {/* 1. FRONT */}
        <button
          onClick={() => onSelectPreset('front')}
          className={`control-btn ${currentPreset === 'front' && !autoRotate ? 'active' : ''}`}
        >
          FRONT
        </button>

        {/* 2. BACK (KABIR) */}
        <button
          onClick={() => onSelectPreset('back')}
          className={`control-btn ${currentPreset === 'back' && !autoRotate ? 'active' : ''}`}
        >
          BACK (KABIR)
        </button>

        {/* 3. LEFT */}
        <button
          onClick={() => onSelectPreset('left')}
          className={`control-btn ${currentPreset === 'left' && !autoRotate ? 'active' : ''}`}
        >
          LEFT
        </button>

        {/* 4. RIGHT */}
        <button
          onClick={() => onSelectPreset('right')}
          className={`control-btn ${currentPreset === 'right' && !autoRotate ? 'active' : ''}`}
        >
          RIGHT
        </button>

        {/* 5. CHEST PATCH */}
        <button
          onClick={() => onSelectPreset('chest')}
          className={`control-btn ${currentPreset === 'chest' && !autoRotate ? 'active' : ''}`}
        >
          CHEST PATCH
        </button>

        {/* 6. ARCH ZOOM */}
        <button
          onClick={() => onSelectPreset('backText')}
          className={`control-btn ${currentPreset === 'backText' && !autoRotate ? 'active' : ''}`}
        >
          ARCH ZOOM
        </button>

        {/* Divider */}
        <div className="w-px h-5 bg-white/10 mx-0.5 hidden sm:block" />

        {/* 7. AUTO 360° */}
        <button
          onClick={onToggleAutoRotate}
          className={`control-btn flex items-center gap-1.5 ${
            autoRotate ? 'active-rotate' : ''
          }`}
        >
          {autoRotate ? (
            <Pause className="w-3.5 h-3.5 text-emerald-400" />
          ) : (
            <RotateCw className="w-3.5 h-3.5 text-neutral-400 group-hover:text-white" />
          )}
          <span>AUTO 360°</span>
        </button>
      </div>
    </div>
  );
};

