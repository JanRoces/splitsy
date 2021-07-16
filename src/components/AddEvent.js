import React, { Component } from "react";
import { v4 as uuid } from "uuid";

class AddEvent extends Component {
  state = { eventId: "", title: "", name: "", participants: [] };

  addParticipant = () => {
    let p = {
      id: uuid(),
      name: this.state.name,
    };

    this.setState({ participants: [...this.state.participants, p], name: "" });
  };

  showParticipants = () => {
    let p = this.state.participants;
    let len = p.length;
    let list = [];

    for (let i = 0; i < len; i++) {
      list.push(
        <div className="list-participant">
          <div className="label" key={p[i].id}>
            {p[i].name}
          </div>
          <div className="button-icon">
            <i
              className="delete icon"
              onClick={this.removeParticipant.bind(this, p[i].id)}></i>
          </div>
        </div>
      );
    }

    return list;
  };

  removeParticipant = (id) => {
    let p = this.state.participants;
    let len = p.length;

    for (let i = 0; i < len; i++) {
      if (p[i].id === id) {
        p.splice(i, 1);
        break;
      }
    }

    this.setState({ participants: p });
  };

  render() {
    return (
      <div className="container-add-event">
        <div className="card-add-event">
          <form>
            <div>
              <input className="card-title" placeholder="Insert Title"></input>
            </div>
            <div className="card-content">
              <div className="card-participant-input-container">
                <input
                  className="card-participant"
                  placeholder="Add Participant"
                  value={this.state.name}
                  onChange={(e) =>
                    this.setState({ name: e.target.value })
                  }></input>
                <button
                  className="icon-button"
                  type="button"
                  onClick={this.addParticipant}>
                  <i className="plus icon"></i>
                </button>
              </div>
              <div className="container-participant">
                {this.showParticipants()}
              </div>
              <button className="login-button">Create Event</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
export default AddEvent;
