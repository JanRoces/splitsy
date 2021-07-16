import React, { Component } from "react";
import AddEvent from "./AddEvent";
import "./style/Events.css";
class Events extends Component {
  state = { events: [] };
  render() {
    return (
      <div>
        <div className="title-event">{this.renderTitle()}</div>
        <AddEvent />
      </div>
    );
  }

  renderTitle = () => {
    return this.state.events.length < 1 ? "You Have No Events" : "My Events:";
  };
}

export default Events;
