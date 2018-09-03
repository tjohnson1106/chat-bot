import React, { Component } from "react";
import { ChatBot } from "aws-amplify-react";

import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  handleComplete(err, confirmation) {
    if (err) {
      alert("Bot conversation failed");
      return;
    }

    alert("Success " + JSON.stringify(confirmation, null, 2));
    return "Reservation booked. Thank you. What would you like next?";
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to
          reload.
        </p>
      </div>
    );
  }
}

export default App;
