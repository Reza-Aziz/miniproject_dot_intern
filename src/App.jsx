import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Register from "./pages/register";
import Login from "./pages/login";
import MainMenu from "./pages/main_menu";
import Game from "./pages/game";
import "./index.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/menu" element={<MainMenu />} />
      <Route path="/game" element={<Game />} />
    </Routes>
  );
}

export default App;
