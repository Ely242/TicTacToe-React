# Tic Tac Toe

A Tic Tac Toe game built with React, TypeScript, and Vite.

## Tech Stack

- React 19
- TypeScript
- Vite
- CSS (styling and animations)

## Getting Started

### 1) Install dependencies

```bash
npm install
```

### 2) Run in development

```bash
npm run dev
```

### 3) Build for production

```bash
npm run build
```

### 4) Preview production build

```bash
npm run preview
```

## Scripts

- `npm run dev` - start local dev server
- `npm run build` - type-check and create production build
- `npm run preview` - preview built app locally
- `npm run lint` - run ESLint

## Project Structure

```text
src/
  Components/
    Board.tsx
    GameStatus.tsx
    ResetButton.tsx
    Square.tsx
  utils/
    gameLogic.ts
  App.tsx
  index.css
  main.tsx
```

## Gameplay Notes

- Starting player is chosen randomly.
- A winner is declared when 3 matching marks align in a row, column, or diagonal.
- If all squares are filled with no winner, the game is a draw.

## License

This project is for personal/portfolio use.
