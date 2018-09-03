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

  _handleKeyPress = e => {
    if (e.key === "Enter") {
      this.submitMessage;
    }
  };

  async submitMessage() {
    // Destructure the input value from the state
    // then check to see if it is a valid string
    const { input } = this.state;
    if (input === "") return;
    const message = new Message({
      id: 0,
      message: input
    });
    // passing in the new message to the array
    let messages = [...this.state.messages, message];

    this.setState({
      messages,
      input: ""
    });
    // The bot name and the value we are passing to it
    const response = await Interactions.send(
      "BookTripBotMOBILEHUB",
      input
    );

    // Take the response from the bot and create another new message
    // passing in an id of 1 and the reponse.message as the message
    const responseMessage = new Message({
      id: 1,
      message: response.message
    });
    messages = [...this.state.messages, responseMessage];
    this.setState({ messages });

    if (response.dialogState === "Fullfilled") {
      if (response.intentName === "BookTripBookHotel") {
        const {
          slots: {
            BookTripCheckInDate,
            BookTripLocation,
            BookTripNights,
            BookTripRoomTypeBookTripCheckInDate,
            BookTripLocation,
            BookTripNights,
            BookTripRoomType
          }
        } = response;
        const finalMessage = `Congratulations! Your trip to ${BookTripLocation}
        with a ${BookTripRoomType} room on ${BookTripCheckInDate}
          for ${BookTripNights} days have been booked!
        `;
        this.setState({ finalMessage });
      }
    }
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
        <header style={styles.header}>
          <p style={styles.headerTitle}>Travel Bot</p>
        </header>

        <div style={styles.messagesContainer}>
          <h2>{this.state.finalMessage}</h2>

          <ChatFeed
            messages={this.state.messages}
            hasInputField={false}
            bubbleStyles={styles.bubbleStyles}
          />

          <input
            onKeyPress={this._handleKeyPress}
            onChange={this.onChange.bind(this)}
            style={styles.input}
          />
        </div>
      </div>
    );
  }
}

const styles = {
  bubbleStyles: {
    text: {
      fontSize: 16
    },
    chatbubble: {
      borderRadius: 30,
      padding: 10
    }
  },
  headerTitle: {
    color: "white",
    fontSize: 22
  },
  header: {
    backgroundColor: "rgb(0, 132, 255)",
    padding: 20,
    borderTop: "12px solid rgb(204, 204, 204)"
  },
  messagesContainer: {
    display: "flex",
    flexDirection: "column",
    padding: 10,
    alignItems: "center"
  },
  input: {
    fontSize: 16,
    padding: 10,
    outline: "none",
    width: 350,
    border: "none",
    borderBottom: "2px solid rgb(0, 132, 255)"
  }
};

export default App;
