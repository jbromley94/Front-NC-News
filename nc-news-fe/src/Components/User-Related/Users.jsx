import React, { Component } from "react";
import "./Users.css";
import { Link } from "react-router-dom";


class Users extends Component {
  state = {
    avatars: [
      "http://images.rapgenius.com/fff0b09bfe08348e9b2821647943a9b9.1000x1000x1.jpg",
      "http://tristonrobinson.files.wordpress.com/2011/02/ludwig-van.png",
      "https://images.duckduckgo.com/iu/?u=http%3A%2F%2Fimg.abrakaba.com%2F0034CC8D-0%2FAbner-Jay-One-Man-Band-Format.jpg&f=1",
      "https://img.discogs.com/Gh6fOh2u_NUPeCdLKeEonmzKNn8=/fit-in/600x600/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-619088-1148048415.jpeg.jpg",
      "https://images.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.copertinedvd.org%2Fcopertine-cd-file%2FA%2Faqua_-_barbie_girl_-_front.jpg&f=1",
      "https://images.duckduckgo.com/iu/?u=http%3A%2F%2Fcdn.quotesgram.com%2Fimg%2F23%2F96%2F1432022622-gg-allin-freaks-patch-ip11_2_.jpg&f=1"
    ]
  };
  render() {
    return <div className="TitleDiv">
        {console.log(this.props.allUsers)}
        <h1>Users</h1>
        <section className="topicUserPics">
          {this.props.allUsers.map((user, index) => {
          return <div className="topicBlock">
                <Link to={`/users/${user.username}`}>
                  <img src={`${this.state.avatars[index]}`} className="image" alt={`user${index}s avatar`} />
                  <p key={user._id} className="mapTitles">
                    {user.username}
                  </p>
                </Link>
              </div>;
          })}
        </section>
      </div>;
  }
}

export default Users;
