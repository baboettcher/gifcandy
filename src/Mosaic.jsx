import React, { Component } from "react";
import _ from "lodash";
import "./styles/main.css";
import SingleTile from "./SingleTile";
import firebase from "./firebase.js"; // <--- add this line
import { CURRENT_USER, CURRENT_MOSAIC } from "./config";

// DO: TRY without super!?
class Mosaic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gifObjectWithKeys: {}, // this is NOT an array--change this later
      dropDownOpen: false
    };

    this.handleClickSingleItem = this.handleClickSingleItem.bind(this);
    this.handleClickMosaicItem = this.handleClickMosaicItem.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  componentDidMount() {
    // LATER: this "itemsRef" is repeated in componentDidMount/Update
    const itemsRef = firebase
      .database()
      .ref("users/" + CURRENT_USER + "/" + CURRENT_MOSAIC);

    itemsRef
      .once("value")
      .then(snapshot => snapshot.val())
      .then(rawGifDataNeedingKeys => {
        console.log("+++++++++HERE++++++", rawGifDataNeedingKeys);
        return rawGifDataNeedingKeys;
      })
      .then(gifObjectWithKeys => this.setState(() => ({ gifObjectWithKeys })))
      .then(() => console.log("state!!!", this.state.gifObjectWithKeys));
  }

  componentDidUpdate() {
    // add listener for change in firebase stuff
  }

  toggle() {
    this.setState(prevState => ({
      dropDownOpen: !prevState.dropDownOpen
    }));
  }

  // CLICK ITEM FROM MOSAIC
  handleClickSingleItem(id, images, title, rating) {
    console.log("BIG PICTURE CLICKED->", id, images, title, rating);
    console.log("REF-->", "users/" + CURRENT_USER + "/" + CURRENT_MOSAIC);

    // 1) Add to state - do this next
    console.log("STATE:", this.state.gifObjectWithKeys);

    // 2) Add to firebase
    const itemsRef = firebase // this is repeated in componentDidMount/Update
      .database()
      .ref("users/" + CURRENT_USER + "/" + CURRENT_MOSAIC);

    const item = {
      id,
      images,
      title,
      rating
    };

    // THE REAL PUSH
    itemsRef.push(item);

    // how do i get the damn key???

    // THE TEST PUSH
    const itemsRefTEST = firebase // this is repeated in componentDidMount/Update
      .database()
      .ref("users/" + CURRENT_USER + "/" + CURRENT_MOSAIC + "TEST");

    const itemTEST = {
      what: "ONCE_GG"
    };

    // THE TEST PUSH
    const newKey = itemsRefTEST.push(itemTEST).key;
    itemsRefTEST.push(itemTEST);

    const itemsRefTESTREMOVE = firebase // this is repeated in componentDidMount/Update
      .database()
      .ref("users/" + CURRENT_USER + "/" + CURRENT_MOSAIC + "TEST/" + newKey);

    itemsRefTESTREMOVE.remove();
  }

  // DELETE ITEM FROM MOSAIC
  handleClickMosaicItem(id, images, title, rating, firebaseKey) {
    //console.log("DELETE: MOSAIC iTEM CLICKED->", id, images, title, rating);
    console.log("DELETE: MOSAIC key-->>>???", firebaseKey);

    // LATER: this filters out ALL items  with this id, so if there is a duplicate, it is lost too
    const newLoadedGifObject = _.filter(this.state.gifObjectWithKeys, function(
      item,
      key
    ) {
      console.log("ITEMMMM->", key);
      return item.id !== id;
    });

    this.setState(prevState => ({
      gifObjectWithKeys: newLoadedGifObject
    }));

    // 2) delete in firebase--HERE!!!!!!!!
    const itemsRef = firebase // this is repeated in componentDidMount/Update
      .database()
      .ref("users/" + CURRENT_USER + "/" + CURRENT_MOSAIC + "/" + id);

    //itemsRef.push(item);
  }

  render() {
    let gifObjectWithKeysDisplay = [];
    const { gifObjectWithKeys } = this.state;

    if (gifObjectWithKeys) {
      gifObjectWithKeysDisplay = _.map(gifObjectWithKeys, imageData => {
        return (
          <SingleTile
            clickHandlerYouGaveMe={this.handleClickMosaicItem}
            imageData={imageData}
          />
        );
      });
    }

    //console.log("gifObjectWithKeysDisplay===>", gifObjectWithKeysDisplay);
    //console.log("gifObjectWithKeys===>", gifObjectWithKeys);

    const { latestGif } = this.props;
    const latestGifToRender = latestGif ? (
      <img
        src={latestGif.images.fixed_height_downsampled.url}
        onClick={this.handleClickSingleItem.bind(
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
        <div>
          <button>SHUFFLE - later</button>
        </div>
        <div className="topContainer">
          {gifObjectWithKeysDisplay ? gifObjectWithKeysDisplay : null}
          {latestGifToRender ? latestGifToRender : null}
        </div>
      </div>
    );
  }
}

export default Mosaic;
