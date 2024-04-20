import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/home';
import Todo from './pages/todo';
import { ThemeProvider } from '@mui/material/styles';
import { darkTheme } from "./themes/dark";
import { lightTheme } from "./themes/light";

export default function App() {
  const [currentTheme, setCurrentTheme] = useState(localStorage.getItem('theme') === 'light' ? lightTheme : darkTheme);

  useEffect(() => {
    localStorage.setItem('theme', currentTheme === lightTheme ? 'light' : 'dark');
  }, [currentTheme]);

  const toggleTheme = () => {
    setCurrentTheme((prevTheme) => (prevTheme === darkTheme ? lightTheme : darkTheme));
  };

  return (
    <ThemeProvider theme={currentTheme}>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home toggleTheme={toggleTheme} />} />
          <Route path="/todo" element={<Todo />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}
