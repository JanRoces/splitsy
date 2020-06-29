import React, { Component } from "react";
import "./Display.css";

class EventName extends Component {
  state = { title: "", name: "", participants: [] };

  render() {
    return (
      <div>
        <form className="create-event-form" onSubmit={this.handleOnSubmit}>
          <input
            type="text"
            placeholder="Event Name"
            onChange={(e) => this.setState({ title: e.target.value })}></input>
          <br />
          <div>
            <input
              type="text"
              placeholder="Participant"
              value={this.state.name}
              onChange={(e) => this.setState({ name: e.target.value })}></input>

            <button type="button" onClick={this.addParticipant}>
              +
            </button>
            <button type="button" onClick={this.removeParticipant}>
              -
            </button>
          </div>
          <br />
          <div className="participants-display">
            <h4>Participants: </h4>
          </div>
          <div>
            <p>{this.state.participants.join(", ")}</p>
          </div>
          <br />
          <button>Create</button>
        </form>
      </div>
    );
  }

  onInputChange = (e) => {
    console.log(e.target.value);
  };

  handleOnSubmit = (e) => {
    const { onSubmit } = this.props;
    if (this.state.title !== "" && this.state.participants !== []) {
      e.preventDefault();
      onSubmit(this.state);
    }
  };

  addParticipant = (e) => {
    console.log("name: ", this.state.name);
    if (this.state.name !== "") {
      this.setState({
        participants: [...this.state.participants, this.state.name],
        name: "",
      });
    }
  };

  removeParticipant = () => {
    if (this.state.participants !== []) {
      let arr = this.state.participants;
      arr.pop();
      this.setState({ participants: arr });
    }
  };
}

export default EventName;
