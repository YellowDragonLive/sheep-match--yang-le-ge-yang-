export enum TileType {
  CABBAGE = '🥬',
  FIRE = '🔥',
  STUMP = '🪵',
  WOOL = '🧶',
  CARROT = '🥕',
  BUCKET = '🪣',
  CORN = '🌽',
  SHEARS = '✂️',
  MILK = '🥛'
}

export interface TileData {
  id: string;
  type: TileType;
  layer: number;
  x: number; // Grid coordinate X (-3 to 3 typically)
  y: number; // Grid coordinate Y
  zIndex: number;
}

export interface GameState {
  tiles: TileData[];
  dock: TileData[];
  status: 'playing' | 'won' | 'lost';
}

export const GRID_SIZE = 44; // Pixels per grid unit step
export const TILE_SIZE = 48; // Pixel size of the tile visual
export const DOCK_CAPACITY = 8;
