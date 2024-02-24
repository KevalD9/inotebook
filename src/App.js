import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import About from "./components/About.js";
import SignUp from "./components/SignUp";
import NoteState from "./context/NoteState";

function App() {
  return (
    <>
    <Router>
      <NoteState>
        <Navbar />
        <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<SignUp />} />
          </Routes>
      </NoteState>
    </Router>
    </>
  );
}

export default App;
