import React from 'react';
import { TileData, DOCK_CAPACITY } from '../types';
import { Tile } from './Tile';

interface DockProps {
  dockTiles: TileData[];
}

export const Dock: React.FC<DockProps> = ({ dockTiles }) => {
  // Create empty slots to render the grid structure visual
  const emptySlots = Array.from({ length: DOCK_CAPACITY - dockTiles.length });

  return (
    <div className="w-full px-4 pb-8 pt-2 flex justify-center bg-[#90BC64]">
      <div className="
        relative
        flex items-center justify-start px-3 gap-2
        h-20 rounded-xl
        bg-[#5D4037] border-4 border-[#3E2723] shadow-2xl
        overflow-hidden
      ">
        {/* Render actual tiles */}
        {dockTiles.map((tile) => (
          <Tile 
            key={tile.id} 
            data={tile} 
            isClickable={false} // Tiles in dock aren't clickable in this version
            onClick={() => {}} 
            inDock={true}
          />
        ))}

        {/* Render placeholders for remaining space to keep the bar structure rigid? 
            Actually, simpler to just let the flexbox flow, but the "slots" visual is key to the game feel.
        */}
        {emptySlots.map((_, idx) => (
          <div 
            key={`empty-${idx}`} 
            className="w-12 h-12 rounded-lg bg-[#4E342E] opacity-50 border-2 border-[#3E2723] border-dashed"
          />
        ))}
      </div>
    </div>
  );
};
