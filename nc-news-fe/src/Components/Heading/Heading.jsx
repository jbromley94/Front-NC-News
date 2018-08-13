import React, { Component } from 'react';
import "./Heading.css"
import NavBar from "../Navbar/NavbarFloat"

class Heading extends Component {
  render() {
    return <div id="heading">
        <h1 className="Title">Northcoders News</h1>
          <NavBar handleLogout={this.props.handleLogout}/>
      </div>;
  }
}

export default Heading;