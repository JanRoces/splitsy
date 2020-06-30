import React, { Component } from "react";
import "./EventName.css";
//import "./Display.css";

class EventName extends Component {
  state = { title: "", name: "", participants: [] };

  render() {
    return (
      <div className="form-container">
        <form className="ui form" onSubmit={this.handleOnSubmit}>
          <div className="field">
            <input
              type="text"
              placeholder="Event Name"
              onChange={(e) =>
                this.setState({ title: e.target.value })
              }></input>
          </div>
          <div className="field">
            <input
              type="text"
              placeholder="Participant"
              value={this.state.name}
              onChange={(e) => this.setState({ name: e.target.value })}></input>
          </div>
          <div>
            <div className="generic-container">
              <button
                className="ui button"
                type="button"
                onClick={this.addParticipant}>
                Add
              </button>
              <button
                className="ui button"
                type="button"
                onClick={this.removeParticipant}>
                Remove
              </button>
            </div>
            <br />
            <div className="generic-container">
              <h4>Participants: </h4>
              <br />
            </div>
            <div className="generic-container">
              <p>{this.state.participants.join(", ")}</p>
            </div>
            <br />
            <div className="generic-container">
              <button className="ui button">Create</button>
            </div>
          </div>
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
