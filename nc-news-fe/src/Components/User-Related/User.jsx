import React, { Component } from "react";
import { fetchArticlesByUser } from "../../Api";
import { Link, Redirect } from "react-router-dom";

class User extends Component {
  state = {
    userInfo: [],
    errorCode: null,
    errorMSGS: ""
  };
  render() {
    const { errorCode, errorMSGS } = this.state;
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
      <div className="TitleDiv">
        <h1> {`${this.props.match.params.username}`} </h1>
        <section className="userPics">
          {this.state.userInfo.map(article => {
            return <div key={article._id} className="commentAndSingArticle">
                <Link to={`/articles/${article._id}`}>
                  <p className="mapTitles">{article.title}</p>
                  <p>{`${article.votes}`}</p>
                  <p>{`${article.created_at.slice(0, 10)}`}</p>
                  <p>{`${article.created_at.slice(11, 16)}`}</p>
                </Link>
              </div>;
          })}
        </section>
      </div>
    );
  }
  componentDidMount() {
    const { username } = this.props.match.params;
    fetchArticlesByUser(username)
      .then(({ data }) => {
        this.setState({
          userInfo: data.all_articles
        });
      })
      .catch(err => {
        this.setState({
          errorMSGS: err.response.data,
          errorCode: err.response.status
        });
      });
  }
}

export default User;
