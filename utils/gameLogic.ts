import { TileData, TileType } from '../types';
import { LEVEL_CONFIG, TILE_TYPES } from '../constants';

// Simple bounding box collision
// We assume tiles are roughly 1x1 unit in grid space for logic, 
// even if visual is slightly different.
export const isObscured = (target: TileData, allTiles: TileData[]): boolean => {
  // A tile is obscured if there is a tile on a HIGHER layer
  // that overlaps its position significantly.
  
  const COLLISION_THRESHOLD = 0.85; // Normalized overlap threshold

  return allTiles.some(other => {
    if (other.layer <= target.layer) return false; // Only check tiles above
    
    const dx = Math.abs(other.x - target.x);
    const dy = Math.abs(other.y - target.y);

    // If overlaps significantly
    return dx < COLLISION_THRESHOLD && dy < COLLISION_THRESHOLD;
  });
};

export const generateLevel = (): TileData[] => {
  const tiles: TileData[] = [];
  const { totalTriplets, spread } = LEVEL_CONFIG;
  
  // 1. Create the pool of types (guaranteed sets of 3)
  let typePool: TileType[] = [];
  for (let i = 0; i < totalTriplets; i++) {
    const randomType = TILE_TYPES[Math.floor(Math.random() * TILE_TYPES.length)];
    typePool.push(randomType, randomType, randomType);
  }

  // Shuffle pool
  typePool = typePool.sort(() => Math.random() - 0.5);

  // 2. Place tiles in a pyramid/random stack structure
  // We simulate "dropping" tiles. 
  // For a true "Sheep a Sheep" feel, it's often patterns + randomness.
  
  typePool.forEach((type, index) => {
    // Randomize position slightly biased towards center (normal distribution-ish)
    // We use a grid system where 0,0 is center.
    
    // Create localized clusters to ensure overlap
    const layerBias = Math.floor(index / 10); 
    
    // Random integer coordinates within spread
    const rX = (Math.random() * spread * 2) - spread;
    const rY = (Math.random() * spread * 2) - spread;

    // Snap to 0.5 grid steps for "brick pattern" look
    const x = Math.round(rX * 2) / 2;
    const y = Math.round(rY * 2) / 2;

    // Layer increases as we add tiles, effectively stacking them
    // We simply increment layer ID for sorting, but logical layer depends on index
    const layer = index; 

    tiles.push({
      id: `tile-${index}-${Date.now()}`,
      type,
      x,
      y,
      layer, // Logical layer for collision
      zIndex: index // Visual z-index
    });
  });

  return tiles;
};

// Check dock for matches and return new dock state + number of matches found
export const processDockMatches = (dock: TileData[]): TileData[] => {
    // Count occurrences
    const counts: Record<string, number> = {};
    dock.forEach(t => {
        counts[t.type] = (counts[t.type] || 0) + 1;
    });

    // Find types with 3 or more
    const typesToRemove = Object.keys(counts).filter(type => counts[type] >= 3);

    if (typesToRemove.length === 0) return dock;

    // Filter out the matched types (removing exactly 3 is standard, 
    // but usually in this game if you have 3, they all go)
    return dock.filter(t => !typesToRemove.includes(t.type));
};
