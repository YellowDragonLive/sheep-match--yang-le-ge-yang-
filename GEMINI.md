# Gemini Project Context: Sheep Match Game

## Project Overview

This project is a web-based tile-matching game called "Sheep Match". The objective is to clear a pile of tiles by selecting three matching tiles of the same type, which then get removed from a "dock". The game is lost if the dock becomes full.

The application is built using a modern frontend stack:

*   **Framework:** React
*   **Language:** TypeScript
*   **Build Tool:** Vite
*   **Styling:** Likely Tailwind CSS (inferred from class names like `min-h-screen`, `flex`, `font-bold`).

### Architecture

*   **`App.tsx`**: The main component that holds the entire game state, manages the game loop (win/loss conditions), and orchestrates interactions between the game board and the dock.
*   **`utils/gameLogic.ts`**: Contains the core, non-UI-related game logic:
    *   `generateLevel()`: Procedurally creates the stack of tiles for a new game.
    *   `isObscured()`: Calculates whether a tile is blocked by other tiles on higher layers.
    *   `processDockMatches()`: Checks the dock for three matching tiles and removes them.
*   **`components/`**: Contains the primary UI components:
    *   `GameBoard.tsx`: Renders the main playing area with all the interactive tiles. It determines which tiles are clickable based on the `isObscured` logic.
    *   `Dock.tsx`: Renders the area at the bottom where selected tiles are placed.
    *   `Tile.tsx`: Represents a single tile.
*   **`types.ts`**: Defines the core data structures for the game, such as `TileData` and `GameState`.

## Building and Running

### Prerequisites

*   Node.js and npm are installed.

### Running Locally

1.  **Install Dependencies:**
    ```bash
    npm install
    ```

2.  **Set Environment Variables:**
    The `README.md` and `vite.config.ts` indicate the need for a Gemini API key. Create a `.env.local` file in the root of the project and add your key:
    ```
    GEMINI_API_KEY=your_api_key_here
    ```
    *(Note: While the core game logic doesn't appear to use this API key directly, it's part of the project's setup.)*

3.  **Run the Development Server:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:3000`.

### Other Scripts

*   **Build for Production:**
    ```bash
    npm run build
    ```
*   **Preview Production Build:**
    ```bash
    npm run preview
    ```

## Development Conventions

*   The project uses functional React components with hooks (`useState`, `useEffect`, `useCallback`, `useMemo`).
*   State is managed locally within the `App.tsx` component.
*   Code is organized by feature/domain (`components`, `utils`).
*   The styling follows the utility-first approach of Tailwind CSS.
