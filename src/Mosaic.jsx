import React, { Component } from "react";
import _ from "lodash";
import "./styles/main.css";

import firebase from "./firebase.js"; // <--- add this line

import { CURRENT_USER, CURRENT_MOSAIC } from "./config";

// TRY without super!?
class Mosaic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadedGifArray: [],
      dropDownOpen: false
    };

    this.handleClick = this.handleClick.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  componentDidMount() {
    // this is repeated in componentDidMount/Update
    const itemsRef = firebase
      .database()
      .ref("users/" + CURRENT_USER + "/" + CURRENT_MOSAIC);

    itemsRef
      .once("value")
      .then(snapshot => snapshot.val())
      .then(loadedGifArray => this.setState(() => ({ loadedGifArray })))
      .then(() => console.log("state!!!", this.state.loadedGifArray));
  }

  componentDidUpdate() {
    // add listerner
  }

  toggle() {
    this.setState(prevState => ({
      dropDownOpen: !prevState.dropDownOpen
    }));
  }

  handleClick(id, images, title, rating) {
    console.log("MOSAIC CLICKED-->", id, images, title, rating);

    // this is repeated in componentDidMount/Update
    const itemsRef = firebase
      .database()
      .ref("users/" + CURRENT_USER + "/" + CURRENT_MOSAIC);

    const item = {
      id,
      images,
      title,
      rating
    };

    itemsRef.push(item);
  }

  render() {
    let loadedGifArrayDisplay = [];
    const { loadedGifArray } = this.state;

    if (loadedGifArray) {
      console.log("YYYYES HERE");

      loadedGifArrayDisplay = _.map(loadedGifArray, item => {
        return <img src={item.images.fixed_height_small.url} />;
      });

      console.log("OOOOOOOOO", loadedGifArrayDisplay);
    }

    //console.log("loadedGifArrayDisplay===>", loadedGifArrayDisplay);
    //console.log("loadedGifArray===>", loadedGifArray);

    const { latestGif } = this.props;
    const latestGifToRender = latestGif ? (
      <img
        src={latestGif.images.fixed_height_downsampled.url}
        onClick={this.handleClick.bind(
          null,
          latestGif.id,
          latestGif.images,
          latestGif.title,
          latestGif.rating
        )}
      />
    ) : null;

    //console.log("latestGif----->->", latestGif);

    // this needs to come from firebase
    // const currentMosaicToRender = currentMosaic.map(pic => {
    //   return (
    //      <div key={pic.id} onClick={this.handleClick.bind(null, pic.id, pic.images, pic.title, pic.rating)}>
    //       <img src={pic.images.fixed_height_small.url} alt={pic.title} />
    //     </div>
    //   )
    // })

    return (
      <div>
        <div className="topContainer">
          {loadedGifArrayDisplay ? loadedGifArrayDisplay : null}
          {latestGifToRender ? latestGifToRender : null}
        </div>
      </div>
    );
  }
}

export default Mosaic;
