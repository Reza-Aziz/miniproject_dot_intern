# Mini Project DOT Intern - Quiz App

A premium, fast, and responsive Quiz Application built with React, Redux, and Tailwind CSS.
Designed with a "Linear-like" aesthetic, featuring smooth micro-interactions and a clean Zinc/Neutral color palette.

🔗 **Live Demo:** [https://miniproject-dot-intern.vercel.app/](https://miniproject-dot-intern.vercel.app/)

## ✨ Features

- **Premium UI/UX**: Minimalist design system using Zinc palette, subtle borders, and smooth transitions.
- **Dynamic Quiz Engine**: Fetches questions from OpenTDB API with fallback mechanisms.
- **State Management**: Powered by Redux Toolkit for seamless user and game state handling.
- **Persistent Progress**: Resume your game session even after refreshing the browser.
- **Responsive Design**: Fully optimized for Desktop, Tablet, and Mobile.
- **Game Mechanics**:
  - Timer-based scoring.
  - Interactive feedback (Validations).
  - Detailed Game Summary & Scorecard.

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite
- **Styling**: Tailwind CSS 3.4
- **State**: Redux Toolkit, React-Redux
- **Routing**: React Router DOM 7
- **Icons**: Heroicons (SVG)

## 🚀 Getting Started

1.  **Clone the repository**

    ```bash
    git clone https://github.com/your-username/miniproject-dot-intern.git
    cd miniproject-dot-intern
    ```

2.  **Install dependencies**

    ```bash
    npm install
    ```

3.  **Run the development server**

    ```bash
    npm run dev
    ```

4.  **Build for production**
    ```bash
    npm run build
    ```

## 📂 Project Structure

```
src/
├── components/       # Reusable UI components
│   └── game/         # Game-specific components (Timer, Cards, etc.)
├── pages/            # Application pages (Login, Register, Game, Menu)
├── store/            # Redux store and slices
├── App.jsx           # Main application entry
└── index.css         # Global styles & Tailwind directives
```

## 🎨 Design System

The application uses a custom "Zinc" theme to ensure a premium feel:

- **Backgrounds**: `bg-zinc-50` (Canvas), `bg-white` (Cards)
- **Borders**: `border-zinc-200` (Subtle separation)
- **Typography**: Inter font family with tighter tracking for headings.
- **Interactions**: `hover:bg-zinc-50`, `active:scale-[0.98]` button presses.
