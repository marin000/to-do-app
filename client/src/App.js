import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Home from './pages/home';
import Todo from './pages/todo';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/todo" element={<Todo />} />
      </Routes>
    </Router>
  );
}