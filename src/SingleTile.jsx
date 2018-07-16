import React, { Component } from "react";
//  import imageChecker from "./imageChecker"; // make sure image is valid size, or add user filters here
class SingleTile extends Component {
  render() {
    const { imageData, clickHandlerYouGaveMe } = this.props;
    //console.log("IMAGEDATA", imageData);

    //return <div>{picturesLoaded ? picturesLoaded : null}</div>;
    return (
      <div>
        <img
          src={imageData.images.fixed_height_small.url}
          alt={imageData.title}
          onClick={clickHandlerYouGaveMe.bind(null, imageData.id)}
        />
      </div>
    );
  }
}

export default SingleTile;
