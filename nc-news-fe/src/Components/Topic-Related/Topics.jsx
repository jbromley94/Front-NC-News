import React, { Component } from "react";
import "./Topics.css";
import { fetchTopics } from "../../Api";
// import Loader from "../Loader"
import { Link, Redirect } from "react-router-dom"


class Topics extends Component {
  state = {
    allTopics: [],
    topicImg: [
      "https://38.media.tumblr.com/dad81b4e3748edf3af4ca547e3873fd1/tumblr_n7up8vvakG1r83cqho1_r1_500.gif",
      "https://media.giphy.com/media/3ohhwGSpoz7U1SetWM/giphy-downsized-large.gif",
      "https://images.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia.giphy.com%2Fmedia%2Fhbd8nlok7kqnS%2Fgiphy.gif&f=1"
    ],

  };
  render() {
    const { errorCode, errorMSGS } = this.state
    if (errorCode) {
      return <Redirect to={{
        pathname: `/error/${errorCode}`,
        state: { from: "articles", detailOnErr: errorMSGS }
      }} />
    }
    return (
      <div className="TitleDiv">
        <h1>Topics</h1>
        <section className="topicUserPics">
          {this.state.allTopics.map((topic, index) => {
            return (
              <div key={topic._id} className="topicBlock">
                
                <Link to={`/topics/${topic.slug}`}>
                  <img
                    src={`${this.state.topicImg[index]}`}
                    className="image"
                    alt={`user${index}s avatar`}
                  />
                  <p className="mapTitles">{topic.title}</p>
                </Link>
              </div>
            );
          })}
        </section>
      </div>
    );
  }
  componentDidMount() {
    fetchTopics().then(response => {
      this.setState({
        allTopics: response.data.topics
      });
    })
      .catch((err) => {
        this.setState({
          errorMSGS: err.response.data,
          errorCode: err.response.status
        })
      })
  }
  
}

export default Topics;
