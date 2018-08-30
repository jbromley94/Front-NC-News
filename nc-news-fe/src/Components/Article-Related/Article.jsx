import React, { Component } from "react";
import "./Article.css";
import {
  fetchArticle,
  fetchArticleComments,
  voteOnArticle,
  postComment,
} from "../../Api";
import { Redirect } from "react-router-dom";
import propTypes from "prop-types";

import Comments from "../Comments/Comments";

class Article extends Component {
  state = {
    article: {},
    voteChangeArt: 0,
    voteCom: 0,
    voteUpCom: false,
    voteDownCom: false,
    newMsg: "",
    errorCode: null,
    errorMSGS: ""
  };
  render() {
    const {
      article,
      voteChangeArt,
      newMsg,
      errorCode,
      errorMSGS,
    } = this.state;
    const users = this.props.allUsers;
    const { article_id } = this.props.props.match.params;
    const user = this.props.allUsers.find(item => {
      return item._id === article.created_by;
    });
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
    if (!user) return null;
    return (
      <div className="TitleDiv">
        <h1>{`${article.title}`}</h1>
        <div className="articBox">
          <p>{`${article.body}`}</p>
          <p>{`${article.votes + voteChangeArt}`}</p>
          <div className="createdInfo">
            <p>{`${article.created_at.slice(0, 10)}`}</p>
            <p>{`${article.created_at.slice(11, 16)}`}</p>
          </div>
          <p className="creator">{`${user.username}`}</p>
          <div className="voteButtons">
            <button
              className="voteAndDelete"
              onClick={() => this.handleVote("up", "article", article._id)}
            >
              vote up
              <i className="fas fa-arrow-alt-circle-up" />
              vote up
            </button>
            <button
              className="voteAndDelete"
              onClick={() => this.handleVote("down", "article", article._id)}
            >
              <i className="fas fa-arrow-alt-circle-down" />
            </button>
          </div>
        </div>
        <Comments articleId={article_id} allUsers={users} />
        <input
          className="messagebox"
          value={newMsg}
          placeholder="Type comment and press ENTER to submit"
          onKeyUp={this.handleKeyUp}
          onChange={this.handleChange}
        />
      </div>
    );
  }

  componentDidMount() {
    const { article_id } = this.props.props.match.params;
    fetchArticle(article_id)
      .then(articles => {
        this.setState({
          article: articles.data.article
        });
      })
      .catch(err => {
        this.setState({
          errorMSGS: err.response.data,
          errorCode: err.response.status
        });
      });
  }

  componentDidUpdate() {
    if (this.state.needToUpdate === true) {
      const { article_id } = this.props.props.match.params;
      return Promise.all([
        fetchArticle(article_id),
        fetchArticleComments(article_id)
      ]).then(([articles, comments]) => {
        this.setState({
          article: articles.data.article,
          comments: comments.data.comments_by_article,
          needToUpdate: false
        });
      });
    }
  }

  handleChange = text => {
    this.setState({ newMsg: text.target.value });
  };

  handleKeyUp = e => {
    if (e.key === "Enter") {
      let id = "";
      this.props.allUsers.forEach(item => {
        if (item.username === this.props.currentUser) {
          id = item._id;
        }
      });
      const sentText = {
        body: this.state.newMsg,
        belongs_to: this.state.article.belongs_to,
        created_by: id
      };

      postComment(this.state.article._id, sentText)
        .then(() => {
          this.setState({ newMsg: "", needToUpdate: true });
        })
        .catch(err => {
          this.setState({
            errorMSGS: err.response.data,
            errorCode: err.response.status
          });
        });
    }
  };

  handleVote = (direction, type, id) => {
    if (type === "article") {
      if (
        (this.state.voteChangeArt !== 1 && direction === "up") ||
        (this.state.voteChangeArt !== -1 && direction === "down")
      ) {
        voteOnArticle(id, direction).then(response => {
          this.setState({
            voteChangeArt:
              direction === "up" ? 1 : direction === "down" ? -1 : 0
          });
        });
      } else {
        alert(`I'm afraid you've have voted enough on the article`);
      }
    }
  };
}

Article.propTypes = {
  allUsers: propTypes.array.isRequired,
  currentUser: propTypes.string.isRequired
};

export default Article;
