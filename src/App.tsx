import React from "react";
import "tailwindcss/tailwind.css";
import "./App.css";
// import Home from "./pages/home/index";
import { LoginForm } from "./pages/Login/LoginForm";

function App() {
  return (
    <div className="App h-screen w-screen overflow-hidden">
      <LoginForm />
    </div>
  );
}

export default App;
