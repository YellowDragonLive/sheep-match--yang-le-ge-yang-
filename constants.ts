import { TileType } from './types';

export const TILE_TYPES = [
  TileType.CABBAGE,
  TileType.FIRE,
  TileType.STUMP,
  TileType.WOOL,
  TileType.CARROT,
  TileType.BUCKET,
  TileType.CORN,
  TileType.SHEARS,
  TileType.MILK
];

// Hard Mode configuration
export const LEVEL_CONFIG = {
  totalTriplets: 18, // 18 * 3 = 54 tiles
  layers: 6, // Depth of the pile
  spread: 3, // How wide the pile spreads from center
};
