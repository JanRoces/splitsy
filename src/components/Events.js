import React, { Component } from "react";
import AddEvent from "./AddEvent";
import "./style/Events.css";
class Events extends Component {
  state = { events: [] };
  render() {
    return (
      <div>
        <div className="event-title">{this.renderTitle()}</div>
        <AddEvent />
      </div>
    );
  }

  renderTitle = () => {
    // let msg = this.state.events === null ? "No Events" : "My Events";
    // console.log("msg: ", msg);
    // return msg;
    return this.state.events.length < 1 ? "You Have No Events" : "My Events:";
  };
}

export default Events;
