import React, { Component } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import propTypes from "prop-types";

class FixdNavbar extends Component {
  render() {
    return <div>
        <div className="left dropdown">
          <button className="dropbtn">Content</button>
          <div className="dropdown-content-left">
            <Link to="/articles">Articles</Link>
            <Link to="/">Topics</Link>
            <Link to="/users">Users</Link>
          </div>
        </div>
        <div className="right ">
        <Link to="/" onClick={() => this.props.handleLogout()}>
          <button className="dropbtn">Log Out</button>
            </Link>
        </div>
        <div className="right dropdown">
          <button className="dropbtn">Utilities</button>
          <div className="dropdown-content-right">
            <Link to="/author">Author</Link>
            <Link to="/info">Info</Link>
            <Link to="/credits">Credits</Link>
          </div>
        </div>
      </div>;
  }
}

FixdNavbar.propTypes = {
  handleLogout: propTypes.func.isRequired
};

export default FixdNavbar;
