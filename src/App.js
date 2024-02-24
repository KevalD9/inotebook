import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import About from "./components/About";
import NoteState from "./context/NoteState";

function App() {
  return (
    <div className="App">
      <NoteState>
        <Navbar />
        <Router>
          <Switch>
          <Route exact path="/"> <Home /> </Route>
          <Route path="/about"> <About /> </Route>
        </Switch>
        </Router>
      </NoteState>
    </div>
  );
}

export default App;
