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
import Footer from "./Components/Footer/Footer";
import ErrorHandle from "./Components/ErrorHandle";
import Author from "./Components/UtilitiesTab-Related/Author";
import Credits from "./Components/UtilitiesTab-Related/Credits";
import Info from "./Components/UtilitiesTab-Related/Info";
import { fetchUsers } from "./Api";

class App extends Component {
  state = {
    currentUser: "cooljmessy",
    allUsers: [],
    existingUser: "",
    errorCode: null,
    errorMSGS: ""
  };
  render() {
    const {
      errorCode,
      errorMSGS,
      currentUser,
      allUsers,
      existingUser
    } = this.state;
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
    return <div>
        {!currentUser && <div className="LoginPage">
            <LoginPage users={allUsers} handleLogin={this.handleLogin} existingUser={existingUser} handleChangeUser={this.handleChangeUser} />
          </div>}
        {currentUser && <section>
            <header className="App">
              <Heading handleLogout={this.handleLogout} />
            </header>

            <div className="underHeading">
              <Switch>
                <Route path="/articles/:article_id" render={props => <Article allUsers={allUsers} props={props} currentUser={currentUser} />} />
                <Route path="/topics/:topicSlug" render={props => <Topic allUsers={allUsers} props={props} />} />
                <Route path="/users/:username" component={User} />
                <Route exact path="/author" component={Author} />
                <Route exact path="/credits" component={Credits} />
                <Route exact path="/info" component={Info} />
                <Route exact path="/articles" render={props => <Articles props={props} allUsers={allUsers} />} />
                <Route exact path="/" render={props => <Topics props={props} />} />
                <Route exact path="/users" render={props => <Users allUsers={allUsers} />} />
                <Route path="/error/:code" component={ErrorHandle} />
              </Switch>
            </div>
          </section>}
        <footer>
          <Footer />
        </footer>
      </div>;
  }
  
  componentDidMount() {
    fetchUsers()
      .then(response => {
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

  handleLogout = () => {
    this.setState({
      currentUser: ""
    });
  };

  handleLogin = () => {
    this.state.allUsers.forEach((user, index) => {
      if (user.username === this.state.existingUser) {
        return this.setState({
          currentUser: user.username
        });
      }
    });
  };
}

export default App;
