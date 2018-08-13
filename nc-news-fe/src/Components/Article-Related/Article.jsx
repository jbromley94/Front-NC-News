import React, { Component } from "react";
import "./Article.css";
import {
  fetchArticle,
  fetchArticleComments,
  voteOnArticle,
  voteOnComment,
  postComment,
  deleteComment
} from "../../Api";
import { Redirect } from "react-router-dom";
import propTypes from "prop-types";

class Article extends Component {
  state = {
    article: {},
    comments: [],
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
      comments
    } = this.state;
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
        <section className="allCommentsBoxes">
          {comments.map(comment => {
            let comUser = this.props.allUsers.find(item => {
              return item._id === comment.created_by;
            });
            if (!comUser) return null;
            return (
              <div
                key={comment._id}
                className="commentAndSingArticle commentBox"
              >
                <p className="mapTitles">{comment.body}</p>
                <p className="mapVotes">{comment.votes}</p>
                <div className="createdInfo">
                  <p>{`${comment.created_at.slice(0, 10)}`}</p>
                  <p>{`${comment.created_at.slice(11, 16)}`}</p>
                </div>
                <p className="creator">{`${comUser.username}`}</p>
                <button
                  className="voteAndDelete"
                  onClick={() => this.handleUpCom(comment._id)}
                >
                  <i className="fas fa-arrow-alt-circle-up" />
                </button>
                <button
                  className="voteAndDelete"
                  onClick={() => this.handleDownCom(comment._id)}
                >
                  <i className="fas fa-arrow-alt-circle-down" />
                </button>
                <button
                  className="voteAndDelete"
                  onClick={() => this.handleDelete(comment._id)}
                >
                  <i className="fas fa-times" />
                </button>
              </div>
            );
          })}
        </section>
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
    return Promise.all([
      fetchArticle(article_id),
      fetchArticleComments(article_id)
    ])
      .then(([res1, res2]) => {
        this.setState({
          article: res1.data.article,
          comments: res2.data.comments_by_article
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
      ]).then(([res1, res2]) => {
        this.setState({
          article: res1.data.article,
          comments: res2.data.comments_by_article,
          needToUpdate: false
        });
      });
    }
  }

  handleDelete = id => {
    deleteComment(id).then(response => {
      this.setState({
        needToUpdate: true
      });
    });
  };

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

  handleUpCom = comment_id => {
    if (this.state.voteCom < 1 && this.state.voteUpCom === false) {
      voteOnComment(comment_id, "up").then(response => {
        this.setState({
          voteCom: this.state.voteCom + 1,
          voteUpCom: true,
          voteDownCom: false,
          needToUpdate: true
        });
      });
    } else {
      alert(`You've voted enough on that comment`);
    }
  };

  handleDownCom = comment_id => {
    if (this.state.voteCom > -1 && this.state.voteDownCom === false) {
      voteOnComment(comment_id, "down").then(response => {
        this.setState({
          voteCom: this.state.voteCom - 1,
          voteUpCom: false,
          voteDownCom: true,
          needToUpdate: true
        });
      });
    } else {
      alert(`You've voted enough on that comment`);
    }
  };
}

Article.propTypes = {
  allUsers: propTypes.array.isRequired,
  currentUser: propTypes.string.isRequired
}


export default Article;
