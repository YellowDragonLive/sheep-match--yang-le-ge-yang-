import React, { useMemo } from 'react';
import { TileData } from '../types';
import { Tile } from './Tile';
import { isObscured } from '../utils/gameLogic';

interface GameBoardProps {
  tiles: TileData[];
  onTileClick: (tile: TileData) => void;
}

export const GameBoard: React.FC<GameBoardProps> = ({ tiles, onTileClick }) => {
  
  // Calculate blocked status for all tiles
  // Memoize this expensive calculation
  const clickableStatus = useMemo(() => {
    const statusMap = new Map<string, boolean>();
    
    tiles.forEach(target => {
      // A tile is clickable if NOT obscured by any other tile currently on the board
      const blocked = isObscured(target, tiles);
      statusMap.set(target.id, !blocked);
    });
    
    return statusMap;
  }, [tiles]);

  return (
    <div className="relative w-full h-[450px] md:h-[500px] bg-[#C4E69F] overflow-hidden perspective-1000">
      {/* Decoration - Grass patches */}
      <div className="absolute top-10 left-10 text-4xl opacity-20">🌿</div>
      <div className="absolute bottom-20 right-10 text-4xl opacity-20">🌱</div>
      <div className="absolute top-1/2 left-5 text-3xl opacity-10">🍀</div>

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
         {/* Container for centering the absolute tiles */}
         <div className="relative w-0 h-0">
            {tiles.map(tile => (
              <div key={tile.id} className="pointer-events-auto">
                <Tile 
                  data={tile} 
                  isClickable={clickableStatus.get(tile.id) || false} 
                  onClick={onTileClick} 
                />
              </div>
            ))}
         </div>
      </div>
    </div>
  );
};
