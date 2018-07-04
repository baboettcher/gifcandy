import React, { Component } from 'react';
import './styles/main.css';

import firebase from './firebase.js'; // <--- add this line

import { CURRENT_USER, CURRENT_MOSAIC } from './config'

class Mosaic extends Component {
  constructor(props){
    super(props);

    this.state = {
      loadedMosaicFull: [],
      dropDownOpen: false
    }
    
    this.handleClick = this.handleClick.bind(this);
    this.toggle = this.toggle.bind(this);
    
  }
  

  
  toggle(){
    this.setState( prevState => ({
      dropDownOpen: !prevState.dropDownOpen
    }));
  }
  
  
  handleClick(id, images, title, rating){
    // change this to erase

    console.log("MOSAIC-->", id, images, title, rating);

    const itemsRef = firebase.database().ref('users/' + CURRENT_USER + "/" + CURRENT_MOSAIC);


    const item = {
      id, 
      images, 
      title, 
      rating
    }

    itemsRef.push(item);

  }
  

  render() {

    const { latestGif } = this.props;
    const latestGifToRender = latestGif ? <img src={latestGif.images.fixed_height_downsampled.url} onClick={this.handleClick.bind(null, latestGif.id, latestGif.images, latestGif.title, latestGif.rating)}/> : null;

 


    console.log("latestGif----->->", latestGif)

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
          {latestGifToRender ? latestGifToRender : null }
        </div>
      </div> 


    );
  }
}

export default Mosaic;
