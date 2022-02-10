import React, { Component } from "react";
import "../styles/CreateEvent.css";

class CreateEvent extends Component {
  state = { title: "", name: "", participants: [] };

  setTitle = (e) => {
    this.setState({ title: e.target.value });
  };

  setName = (e) => {
    this.setState({ name: e.target.value });
  };

  onFormComplete = (e) => {
    const { onSubmit } = this.props;
    if (this.state.title !== "" && this.state.participants !== []) {
      e.preventDefault();
      onSubmit(this.state);
    }
  };

  addParticipant = (e) => {
    console.log("Participant Name: ", this.state.name);
    if (this.state.name !== "") {
      this.setState({
        participants: [...this.state.participants, this.state.name],
        name: "",
      });
    }
  };

  removeParticipant = (name) => {
    console.log(name);
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
    var num;
    var name;

    for (i = 0; i < len; i++) {
      name = p[i];
      num = Math.floor(1000 + Math.random() * 9000);
      list.push(
        <div className="ui blue basic label" key={num}>
          {p[i]}{" "}
          <i
            className="delete icon"
            onClick={this.removeParticipant.bind(this, name)}></i>
        </div>
      );
    }

    return (
      <div>
        <div className="container-label">
          <label className="label-participants">Participants:</label>
        </div>
        <div className="ui large labels">{list}</div>
      </div>
    );
  };

  render() {
    return (
      <div>
        <form className="ui form" onSubmit={this.onFormComplete}>
          <div>
            <div className="container-field">
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
          <div>
            <div className="container-participants">
              {this.state.participants.length ? this.showParticipants() : ""}
            </div>
            <div className="container-button-submit">
              <button className="ui primary button">Create</button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default CreateEvent;
