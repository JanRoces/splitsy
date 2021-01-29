import React, { Component } from "react";
import "./style/EventList.css";

class EventList extends Component {
  state = { events: ["LA Trip", "Boston Trip", "Philly Trip"] };

  render() {
    return (
      <div className="event-list-container">
        <div className="title">
          <h3>My Events</h3>
        </div>
        {this.showEvents()}
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
    events.push(<button className="event-button">+ New Event</button>);
    return <div className="event-list">{events}</div>;
  };
}

export default EventList;
