import React from "react";

const ErrorHandle = props => {
  return (
    <div className="TitleDiv">
      <h1> 404 </h1>
      <img
        src="https://candycavalry.files.wordpress.com/2012/09/star_wars_droids_obi-wan_kenobi_obi_wan_movie_desktop_1920x1088_hd-wallpaper-30349.png"
        alt="skywalker no droids"
        className="errorImg"
      />
      <p>{props.location.state.detailOnErr.msg}</p>
      <p>{props.location.state.detailOnErr.NOT_FOUND}</p>
    </div>
  );
};

export default ErrorHandle;
