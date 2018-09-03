import React, { Component } from "react";
import { ChatBot } from "aws-amplify-react";
import { Interactions } from "aws-amplify";
import { ChatFeed, Message } from "react-chat-ui";

import "./App.css";

class App extends Component {
  state = {
    input: "",
    finalMessage: "",
    messages: [
      new Message({
        id: 1,
        message: "Hello, can I help you today?"
      })
    ]
  };

  onChange(e) {
    const input = e.target.value;
    this.setState({
      input
    });
  }

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
        <ChatBot
          title="React Bot"
          botName=""
          welcomeMessage="Welcome, how can I help you today?"
          onComplete={this.handleComplete.bind(this)}
          clearOnComplete={true}
        />
      </div>
    );
  }
}

export default App;
