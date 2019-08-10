import React, { Component } from "react";
import axios from "axios";
import "./App.css";

class App extends Component {
  state = {
    errors: {},
    polls: {},
  };

  componentDidMount() {
    this.getAllPolls();
  }

  getAllPolls = () => {
    axios
      .get("/api/polls")
      .then(res => {
        this.setState({ polls: res.data });
      })
      .catch(err => console.log(err));
  };
  render() {
    return <div>{JSON.stringify(this.state.polls)}</div>;
  }
}

export default App;
