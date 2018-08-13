import React, { Component } from "react";
import "./App.css";
import LoginPage from "./Components/UtilitiesTab-Related/LoginPage";
import Heading from "./Components/Heading/Heading";
import { Route, Switch, Redirect } from "react-router-dom";
import Articles from "./Components/Article-Related/Articles";
import Article from "./Components/Article-Related/Article";
import Topics from "./Components/Topic-Related/Topics";
import Topic from "./Components/Topic-Related/Topic";
import Users from "./Components/User-Related/Users";
import User from "./Components/User-Related/User";
import Footer from "./Components/Footer/Footer"
import ErrorHandle from "./Components/ErrorHandle"

import Author from "./Components/UtilitiesTab-Related/Author";
import Credits from "./Components/UtilitiesTab-Related/Credits"
import { fetchUsers } from "./Api";

// import { fetchArticles } from "./Api";

class App extends Component {
  state = {
    currentUser: "cooljmessy",
    allUsers: [],
    existingUser: "",
    errorCode: null,
    errorMSGS: ""
  };
  render() {
    const { errorCode, errorMSGS } = this.state
    if (errorCode) {
      return (
        <Redirect
          to={{
            pathname: `/error/${errorCode}`,
            state: { from: "articles", detailOnErr: errorMSGS }
          }}
        />
      );
    }
    return (
      <div>
        {!this.state.currentUser && (
          <div className="LoginPage">
            <LoginPage
              users={this.state.allUsers}
              handleLogin={this.handleLogin}
              existingUser={this.state.existingUser}
              handleChangeUser={this.handleChangeUser}
            />
          </div>
        )}
        {this.state.currentUser && (
          <section>
            <header className="App">
              <Heading handleLogout={this.handleLogout}/>
            </header>

            <div className="underHeading">
              <Switch>
                <Route
                  path="/articles/:article_id"
                  render={props => (
                    <Article allUsers={this.state.allUsers} props={props} currentUser={this.state.currentUser} />
                  )}
                />
                <Route path="/topics/:topicSlug" render={props => (
                  <Topic allUsers={this.state.allUsers} props={props} />
                )} />
                <Route path="/users/:username" component={User} />
                <Route exact path="/author" component={Author} />
                <Route exact path="/credits" component={Credits} />
                <Route
                  exact
                  path="/articles"
                  render={props => <Articles props={props} allUsers={this.state.allUsers} />}
                />
                <Route
                  exact
                  path="/"
                  render={props => <Topics props={props} />}
                />
                <Route
                  exact
                  path="/users"
                  render={props => <Users allUsers={this.state.allUsers} />}
                />
                <Route path="/error/:code" component={ErrorHandle} />
              </Switch>
            </div>
          </section>
        )}
        <footer>
          <Footer />
          </footer>
      </div>
    );
  }
  componentDidMount() {
    fetchUsers().then(response => {
      this.setState({
        allUsers: response.data.all_users
      });
    })
      .catch(err => {
        this.setState({
          errorMSGS: err.response.data,
          errorCode: err.response.status
        });
      });
  }

  handleChangeUser = event => {
    this.setState({
      existingUser: event.target.value
    });
  };

  handleLogout = () =>{
    this.setState({
      currentUser : '',
    })
  }

  handleLogin = () => {
    this.state.allUsers.forEach((user, index) => {
      if (user.username === this.state.existingUser) {
        return this.setState({
          currentUser: user.username
        })
      }
    })
  };
}

export default App;
