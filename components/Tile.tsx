import React from 'react';
import { TileData, GRID_SIZE, TILE_SIZE } from '../types';

interface TileProps {
  data: TileData;
  isClickable: boolean;
  onClick: (tile: TileData) => void;
  inDock?: boolean;
}

export const Tile: React.FC<TileProps> = ({ data, isClickable, onClick, inDock = false }) => {
  
  // Calculate position
  // If in dock, the position is handled by the parent container flow
  // If on board, absolute position relative to center
  
  const style: React.CSSProperties = inDock 
    ? { 
        position: 'relative',
        width: `${TILE_SIZE}px`,
        height: `${TILE_SIZE}px`,
      } 
    : {
        position: 'absolute',
        left: `calc(50% + ${data.x * GRID_SIZE}px)`,
        top: `calc(50% + ${data.y * GRID_SIZE}px)`,
        width: `${TILE_SIZE}px`,
        height: `${TILE_SIZE}px`,
        marginLeft: `-${TILE_SIZE / 2}px`, // Center anchor
        marginTop: `-${TILE_SIZE / 2}px`,
        zIndex: data.zIndex,
        transition: 'all 0.2s ease-out'
      };

  // Visual Logic: blocked tiles are darker/greyed out
  const visualClass = inDock
    ? "bg-white border-b-4 border-gray-300" // Dock style
    : isClickable
      ? "bg-white shadow-lg hover:scale-105 cursor-pointer border-b-4 border-emerald-600" // Active style
      : "bg-gray-300 shadow-sm brightness-75 border-b-4 border-gray-400 cursor-not-allowed"; // Disabled style

  return (
    <div
      style={style}
      onClick={() => isClickable && onClick(data)}
      className={`
        flex items-center justify-center 
        rounded-lg select-none text-2xl
        ${visualClass}
      `}
    >
      {data.type}
    </div>
  );
};
