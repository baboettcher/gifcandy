import React, { Component } from 'react';
import './styles/main.css';
import firebase from 'firebase';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { DB_CONFIG } from './config'

class Mosaic extends Component {
  constructor(props){
    super(props);

    this.state = {
      loadedMosaicFull: [],
      dropDownOpen: false
    }
    
    this.app = firebase.initializeApp(DB_CONFIG);
    this.database = this.app.database().ref().child('HERE_NEXT');
    this.handleClick = this.handleClick.bind(this);
    this.toggle = this.toggle.bind(this);

  }

  toggle(){
    this.setState( prevState => ({
      dropDownOpen: !prevState.dropDownOpen
    }));
  }
  
  handleClick(){
    console.log("CLICK HEARD");
  }



  render() {
    const { currentMosaic } = this.props;
    const currentMosaicToRender = currentMosaic.map(pic => {
      return (
         <div key={pic.id} onClick={this.handleClick.bind(null, pic.id, pic.images, pic.title, pic.rating)}>
          <img src={pic.images.fixed_height_small.url} alt={pic.title} />
        </div>

      )
    })
    return (

      <div>
        <div className="topContainer">
          {currentMosaicToRender}
        </div>
      </div>
    );
  }
}

export default Mosaic;
