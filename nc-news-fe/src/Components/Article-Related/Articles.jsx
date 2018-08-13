import React, { Component } from "react";
import "./Articles.css";
import { fetchArticles } from "../../Api";
import { Link, Redirect } from "react-router-dom";
import propTypes from "prop-types";

class Articles extends Component {
  state = {
    allArticles: [],
    errorCode: null,
    errorMSGS: "",
    isLoading: true
  };
  render() {
    const { errorCode, errorMSGS, allArticles } = this.state;
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
    return this.state.isLoading ? (
      <img
        className="TitleDiv"
        src="https://gifer.com/i/7TwJ.gif"
        alt="loader"
      />
    ) : (
      <div className="TitleDiv">
        <h1>Articles</h1>
        <section>
          {allArticles.map(article => {
            let user = this.props.allUsers.find(item => {
              return item._id === article.created_by;
            });
            if (!user) return null;
            return (
              <div key={article._id} className="commentAndSingArticle">
                <Link to={`/articles/${article._id}`}>
                  <p className="mapTitles">{article.title}</p>
                  <p>{`${article.votes}`}</p>
                  <p>{`${article.created_at.slice(0, 10)}`}</p>
                  <p>{`${article.created_at.slice(11, 16)}`}</p>
                  <p>{`${user.username}`}</p>
                </Link>
              </div>
            );
          })}
        </section>
      </div>
    );
  }
  
  componentDidMount() {
    fetchArticles()
      .then(response => {
        this.setState({
          isLoading: false,
          allArticles: response.data.all_articles
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

Articles.propTypes = {
  allUsers: propTypes.array.isRequired
}

export default Articles;
