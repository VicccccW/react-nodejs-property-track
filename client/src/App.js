import React from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import About from "./components/About";
import PropertyMap from "./components/PropertyMap";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="app-container">
      <Router>
        <NavBar />
        <Switch>
          <Route path="/propertyMap" component={PropertyMap} />
        </Switch>
      </Router>
      <div>
        <About />
      </div>
    </div>
  );
}

export default App;
