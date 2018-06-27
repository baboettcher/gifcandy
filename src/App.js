import React, { Component } from 'react';
import PictureLoader from './PictureLoader'
import Mosaic from './Mosaic'
import logo from './images/candy.svg';
import './styles/main.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentMosaic: []
    };

    this.addPictureToMosaic = this.addPictureToMosaic.bind(this);
  }

  addPictureToMosaic(tileObject){
    // change id, images, title, rating
    console.log("tileObject-->", tileObject);

    this.setState({
      currentMosaic : this.state.currentMosaic.concat([tileObject])
    })
  }


  
  render() {

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="candy-cane" />
          <h1 className="App-title">Gif Candy</h1>
        </header>

        <Mosaic currentMosaic = {this.state.currentMosaic}/>
        <PictureLoader addPictureToMosaic={this.addPictureToMosaic}/>

      </div>
    );
  }
}

export default App;

// peudo code / architec

// submit to gify and show result
// how to convert crat recat app to expres server

// or just add firebase data saving?e


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
