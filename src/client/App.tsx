import React from "react";
import axios from "axios";
import "./styles/style.css";

class App extends React.Component {
  public state = {
    message: ""
  };
  public componentDidMount() {
    axios
      .get("/api/say-hello")
      .then(res => res.data)
      .then(data => this.setState({ message: data.message }));
  }
  public render() {
    return (
      <div>
        <h1>Welcome to my boilerplate!</h1>
        <p>{this.state.message}</p>
      </div>
    );
  }
}

export default App;
