import React, { Component } from "react";
import AddEvent from "./AddEvent";
import "./style/EventList.css";

class EventList extends Component {
  state = {
    events: ["LA Trip", "Boston Trip", "Philly Trip"],
    newEvent: false,
  };

  render() {
    return (
      <div className="event-list-container">
        <div className="my-events-title">
          <h3>My Events</h3>
        </div>
        {this.showEvents()}
        <AddEvent newEvent={this.state.newEvent} />
      </div>
    );
  }

  showEvents = () => {
    var i;
    var e = this.state.events;
    console.log(e);
    var events = [];
    for (i = 0; i < e.length; i++) {
      events.push(
        <button className="event-button" key={i}>
          {e[i]}
        </button>
      );
    }
    events.push(
      <button className="event-button" onClick={this.addEvent}>
        <i class="plus icon"></i>
        New Event
      </button>
    );

    return <div className="event-list">{events}</div>;
  };

  addEvent = () => {
    this.setState({ newEvent: true });
    console.log("'+ New Event ' pressed");
  };
}

export default EventList;
