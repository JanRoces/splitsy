import React, { Component } from "react";
import { v4 as uuid } from "uuid";

class AddEvent extends Component {
  state = { eventId: "", title: "", name: "", participants: [] };
  render() {
    return (
      <div className="add-event-container">
        <div className="add-event-card">
          <form>
            <div>
              <input className="card-title" placeholder="Title"></input>
            </div>
            <div className="card-content">
              <div className="card-participant-input-container">
                <input
                  className="card-participant"
                  placeholder="Participant"
                  value={this.state.name}
                  onChange={(e) =>
                    this.setState({ name: e.target.value })
                  }></input>
                <button
                  className="icon-button"
                  type="button"
                  onClick={this.addParticipant}>
                  <i className="user plus icon"></i>
                </button>
              </div>
              <div className="participant-container">
                {this.showParticipants()}
              </div>
              <button>Create</button>
            </div>
          </form>
        </div>
      </div>
    );
  }

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
        <div className="participant-list">
          <div className="label" key={p[i].id}>
            {p[i].name}
          </div>
          <div className="icon-button">
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
}

export default AddEvent;
