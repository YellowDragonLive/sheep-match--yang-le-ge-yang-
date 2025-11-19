import React, { useState, useEffect, useCallback } from 'react';
import { GameBoard } from './components/GameBoard';
import { Dock } from './components/Dock';
import { TileData, DOCK_CAPACITY, GameState } from './types';
import { generateLevel, processDockMatches } from './utils/gameLogic';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    tiles: [],
    dock: [],
    status: 'playing'
  });

  const [shakeDock, setShakeDock] = useState(false);

  // Initialize Game
  const startNewGame = useCallback(() => {
    const newTiles = generateLevel();
    setGameState({
      tiles: newTiles,
      dock: [],
      status: 'playing'
    });
  }, []);

  useEffect(() => {
    startNewGame();
  }, [startNewGame]);

  // Handle Tile Click (Move from Board to Dock)
  const handleTileClick = (clickedTile: TileData) => {
    if (gameState.status !== 'playing') return;

    // Check Game Over condition before move (Dock Full)
    if (gameState.dock.length >= DOCK_CAPACITY) {
      return; // Should be game over already, but safety check
    }

    setGameState(prev => {
      // Remove from board
      const newBoardTiles = prev.tiles.filter(t => t.id !== clickedTile.id);
      
      // Add to dock
      const newDock = [...prev.dock, clickedTile];
      
      return {
        ...prev,
        tiles: newBoardTiles,
        dock: newDock
      };
    });
  };

  // Effect to check for matches or game over whenever dock changes
  useEffect(() => {
    if (gameState.status !== 'playing') return;

    const { dock, tiles } = gameState;

    // 1. Check for Matches
    const cleanDock = processDockMatches(dock);

    // If matches occurred (dock length decreased)
    if (cleanDock.length < dock.length) {
      // Update state with cleaned dock
      // Using a small timeout to allow user to see the 3rd tile land before disappearing
      const timer = setTimeout(() => {
         setGameState(prev => ({
             ...prev,
             dock: cleanDock
         }));
      }, 150); // Fast feedback
      return () => clearTimeout(timer);
    }

    // 2. Check Win Condition
    if (dock.length === 0 && tiles.length === 0) {
      setGameState(prev => ({ ...prev, status: 'won' }));
      return;
    }

    // 3. Check Loss Condition
    if (dock.length >= DOCK_CAPACITY) {
      // Wait a split second so they see the full bar
      setShakeDock(true);
      const timer = setTimeout(() => {
         setShakeDock(false);
         setGameState(prev => ({ ...prev, status: 'lost' }));
      }, 500);
      return () => clearTimeout(timer);
    }

  }, [gameState.dock, gameState.tiles.length, gameState.status]);


  return (
    <div className="min-h-screen bg-[#C4E69F] flex flex-col font-sans">
      {/* Header */}
      <header className="p-4 text-center">
        <h1 className="text-3xl font-bold text-emerald-800 drop-shadow-sm">Sheep Match</h1>
        <p className="text-sm text-emerald-700 font-medium mt-1">Clear the pile! Don't fill the dock!</p>
      </header>

      {/* Game Area */}
      <main className="flex-grow flex flex-col relative max-w-lg mx-auto w-full">
        
        {/* Board */}
        <GameBoard tiles={gameState.tiles} onTileClick={handleTileClick} />

        {/* Controls / Stats */}
        <div className="px-6 flex justify-between items-center text-emerald-900 font-bold">
           <div>Remaining: {gameState.tiles.length}</div>
           <button 
             onClick={startNewGame}
             className="bg-emerald-600 text-white px-4 py-2 rounded-full shadow-md hover:bg-emerald-700 active:scale-95 transition"
           >
             Restart
           </button>
        </div>

        {/* Dock Area */}
        <div className={`transition-transform ${shakeDock ? 'animate-[shake_0.5s_ease-in-out]' : ''}`}>
           <Dock dockTiles={gameState.dock} />
        </div>
      </main>

      {/* Modals */}
      {gameState.status !== 'playing' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl p-8 shadow-2xl text-center max-w-sm w-full animate-[bounce_0.5s_ease-out]">
            {gameState.status === 'won' ? (
              <>
                <div className="text-6xl mb-4">🐑🎉</div>
                <h2 className="text-3xl font-black text-emerald-600 mb-2">YOU WIN!</h2>
                <p className="text-gray-600 mb-6">You've joined the flock!</p>
              </>
            ) : (
              <>
                 <div className="text-6xl mb-4">🪦</div>
                 <h2 className="text-3xl font-black text-red-600 mb-2">GAME OVER</h2>
                 <p className="text-gray-600 mb-6">The dock is full.</p>
              </>
            )}
            
            <button 
              onClick={startNewGame}
              className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-white text-lg font-bold rounded-xl shadow-lg transition active:translate-y-1"
            >
              Try Again
            </button>
          </div>
        </div>
      )}
      
      {/* Global Keyframes for Shake */}
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
      `}</style>
    </div>
  );
};

export default App;
