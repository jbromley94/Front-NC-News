import React, { Component } from "react";
class LoginPage extends Component {
  render() {
    return (
      <div>
        <header className="App">
          <h1 className="Title">Northcoders News</h1>
        </header>
        <div className="TitleDiv underLogHeading">
          <h1>Login</h1>
          <p> Please login below</p>
          Username
          <div className="logBox">
          <input
            type="text"
            name="uName"
            value={this.props.existingUser}
            onChange={this.props.handleChangeUser}
          />
          <button type="submit" className="submitBut" onClick={this.props.handleLogin}>
            Submit
          </button>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginPage;
