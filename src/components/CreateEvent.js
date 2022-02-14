import React, { Component } from "react";
import "../styles/CreateEvent.css";

const BUTTON_COLORS = [
  "red",
  "orange",
  "yellow",
  "olive",
  "green",
  "teal",
  "blue",
  "violet",
  "purple",
  "pink",
  "brown",
];

class CreateEvent extends Component {
  state = {
    title: "",
    name: "",
    participants: [],
    error: false,
  };

  setTitle = (e) => {
    this.setState({ title: e.target.value });
  };

  setName = (e) => {
    this.setState({ name: e.target.value });
  };

  onFormComplete = (e) => {
    const { onSubmit } = this.props;

    if (this.state.title !== "" && this.state.participants.length >= 2) {
      onSubmit(this.state);
    } else {
      this.setState({ error: true });
    }
  };

  addParticipant = (e) => {
    if (this.state.name !== "") {
      this.setState({
        participants: [...this.state.participants, this.state.name],
        name: "",
      });
    }
  };

  removeParticipant = (name) => {
    var p = this.state.participants;
    var len = p.length;
    var i;

    for (i = 0; i < len; i++) {
      if (p[i] === name) {
        p.splice(i, 1);
        break;
      }
    }

    this.setState({ participants: p });
  };

  showParticipants = () => {
    var p = this.state.participants;
    var len = p.length;
    var list = [];
    var i;
    var j = 0;

    for (i = 0; i < len; i++) {
      j = j > 10 ? 0 : j;

      const name = p[i];
      const id = name + i;
      console.log("id :>> ", id);

      list.push(
        <div className={`ui ${BUTTON_COLORS[j]} basic label`} key={id}>
          {p[i]}{" "}
          <i
            className="delete icon"
            onClick={this.removeParticipant.bind(this, name)}></i>
        </div>
      );
      j++;
    }

    return (
      <div>
        <div className="container-label-participants">
          <label className="label-participants">Participants:</label>
        </div>
        <div className="ui large labels">{list}</div>
      </div>
    );
  };

  renderParticipants = () => {
    return (
      <div className="container-participants">
        {this.state.participants.length ? this.showParticipants() : ""}
      </div>
    );
  };

  render() {
    return (
      <div>
        <form
          className={`ui form ${this.state.error ? "error" : ""}`}
          onSubmit={this.onFormComplete}>
          <div>
            <div className="container-field">
              <div className="ui error message">
                <div className="header">Error</div>
                <p>Need a title and at least 2 participants</p>
              </div>
              <div className="field">
                <label>Event Name</label>
                <input
                  type="text"
                  placeholder="Event Name"
                  onChange={this.setTitle}></input>
              </div>
            </div>
            <div className="container-field">
              <div className="field">
                <label>Participant</label>
                <div className="ui action input">
                  <input
                    type="text"
                    placeholder="Participant"
                    value={this.state.name}
                    onChange={this.setName}></input>
                  <button
                    className="ui button"
                    type="button"
                    onClick={this.addParticipant}>
                    <i className="user plus icon"></i>
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>
          {this.renderParticipants()}
        </form>
        <div className="container-button-submit">
          <button className="ui primary button" onClick={this.onFormComplete}>
            Create
          </button>
        </div>
      </div>
    );
  }
}

export default CreateEvent;
