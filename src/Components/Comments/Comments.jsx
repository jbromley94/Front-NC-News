import React, { Component } from "react";
import {
  fetchArticleComments,
  voteOnComment,
  deleteComment
} from "../../Api";

class Comments extends Component {
  state = {
    comments: [],
    voteCom: 0,
    voteUpCom: false,
    voteDownCom: false,

  };
  render() {
    const {
      comments
    } = this.state;

    return (
      <div>
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
      </div>
    );
  }

  componentDidMount() {
    console.log(this.props);
    const { articleId } = this.props;
    fetchArticleComments(articleId)
      .then(comments => {
        this.setState({
          comments: comments.data.comments_by_article
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
      fetchArticleComments(article_id).then(comments => {
        this.setState({
          comments: comments.data.comments_by_article,
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

export default Comments;
