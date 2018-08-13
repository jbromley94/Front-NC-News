import React, { Component } from "react";
import "./Heading.css";
import NavBar from "../Navbar/NavbarFloat";
import propTypes from "prop-types";

class Heading extends Component {
  render() {
    return (
      <div>
        <h1 className="Title">Northcoders News</h1>
        <NavBar handleLogout={this.props.handleLogout} />
      </div>
    );
  }
}

Heading.propTypes = {
  handleLogout: propTypes.func.isRequired
}

export default Heading;
