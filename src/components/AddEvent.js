import React, { Component } from "react";

class AddEvent extends Component {
  state = { participants: [] };
  render() {
    if (this.props.newEvent === true) {
      return (
        <form className="add-event-form">
          <div className="title-container">
            <input className="add-event-input" placeholder="Title"></input>
          </div>
          <div className="participant-container">
            <input
              className="add-event-input"
              placeholder="Participant"></input>
            <button
              className="add-event-button"
              type="button"
              onClick={this.addParticipant}>
              <i className="user plus icon"></i>
              Add Participant
            </button>
          </div>
          <button>Submit</button>
        </form>
      );
    } else {
      return <div>hello world</div>;
    }
  }

  addParticipant = () => {};
}

export default AddEvent;
