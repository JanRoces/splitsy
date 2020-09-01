import React, { Component } from "react";
import "./EventName.css";

class EventName extends Component {
  state = { title: "", name: "", participants: [] };

  render() {
    return (
      <div className="form-container">
        <form className="ui form" onSubmit={this.handleOnSubmit}>
          <div>
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
                onChange={(e) =>
                  this.setState({ name: e.target.value })
                }></input>
            </div>
            <div className="field">
              <button
                className="ui button"
                type="button"
                onClick={this.addParticipant}>
                <i className="user plus icon"></i>
                Add
              </button>
            </div>
          </div>
          <div>
            <br />
            <div className="generic-container">
              <div className="ui large labels">{this.showParticipants()}</div>
            </div>
            <br />
            <div className="generic-container">
              <button className="ui primary button">Create</button>
            </div>
          </div>
        </form>
      </div>
    );
  }

  handleOnSubmit = (e) => {
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

    return list;
  };
}

export default EventName;
