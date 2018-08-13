import React, { Component } from "react";
import { fetchTopicArticles } from "../../Api";
import { Link, Redirect } from "react-router-dom";

class Topic extends Component {
  state = {
    topics: [],
    errorCode: null,
    errorMSGS: ""
  };
  render() {
    const { errorCode, errorMSGS } = this.state;
    if (errorCode) {
      return <Redirect to={{
        pathname: `/error/${errorCode}`,
        state: { from: "articles", detailOnErr: errorMSGS }
      }} />
    }
    return (
      <div className="TitleDiv">
        <h1>{`${this.props.props.match.params.topicSlug} related articles`}</h1>
        <section className="topicPics">
          {this.state.topics.map(article => {
            let user = this.props.allUsers.find(item => {
              return item._id === article.created_by;
            });
            if (!user) return null;
            return <div key={article._id} className="commentAndSingArticle">
                <Link to={`/articles/${article._id}`}>
                  <p className="mapTitles">{article.title}</p>
                  <p>{`${article.votes}`}</p>
                  <p>{`${article.created_at.slice(0, 10)}`}</p>
                  <p>{`${article.created_at.slice(11, 16)}`}</p>
                  <p>{`${user.username}`}</p>
                </Link>
              </div>;
          })}
        </section>
      </div>
    );
  }
  componentDidMount() {
    const { topicSlug } = this.props.props.match.params;
    fetchTopicArticles(topicSlug)
      .then(({ data }) => {
        this.setState({
          topics: data.articles_by_topic
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

export default Topic;
