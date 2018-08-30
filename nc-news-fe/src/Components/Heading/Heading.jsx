import React, { Component } from "react";
import "./Heading.css";
import NavBar from "../Navbar/NavbarFloat";
import propTypes from "prop-types";
import { Link, Redirect } from "react-router-dom";


class Heading extends Component {
  render() {
    return (
      <div>
        <Link to={`/`} > <button className="Title">Northcoders News</button>
</Link>
        <NavBar handleLogout={this.props.handleLogout} />
      </div>
    );
  }
}

Heading.propTypes = {
  handleLogout: propTypes.func.isRequired
}

export default Heading;
