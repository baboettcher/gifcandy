import React, { Component } from 'react';
import PictureLoader from './PictureLoader'
import Mosaic from './Mosaic'
import logo from './images/candy.svg';
import './styles/main.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentMosaic: [],
      latestGif: null
    };

    this.setLatestGif = this.setLatestGif.bind(this);
  }

  setLatestGif(tileObject){
    // change id, images, title, rating
    // console.log("tileObject-->", tileObject);

    this.setState({
      latestGif : tileObject
    })

  }


  
  render() {
    console.log("===>", this.state.latestGif);

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="candy-cane" />
          <h1 className="App-title">Gif Candy</h1>
        </header>

        <Mosaic latestGif = {this.state.latestGif}/>
        <PictureLoader setLatestGif={this.setLatestGif}/>
        
      </div>
    );
  }
}

export default App;




// submit go to onclicj function that calls giphy
// IF TIME: add button which gets random word -- later chage this to  WordNik
// use promises to get gipgy and diplay to screen 
// FIRBASE IF TIME:
// this value os also store to firebase 
  // instal firebase data / call
  // write to db - will an id be generated? 
  // Sabes as: ID : {name, giphy}
  // console.log this growing list of isd
  // ADD React Router
  // add button to toggle between main pain and stroed values
  // screen is a list of clickable names and and "X" to delete
  // LATER LATER:
  // add user input option to give each giphy a comment, save this to db also


  // misc
  // make them dance / lineup / etc - like danc party?
  // invaders


