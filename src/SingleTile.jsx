import React, { Component } from 'react';
import imageChecker from './imageChecker'

class SingleTile extends Component {
  constructor(props){
    super(props)

  }



  render() {
    const { picturesLoaded } = this.props;

    console.log(picturesLoaded)

    let picturesToDisplay = <img src=""/>



    return (

      <div>
      Picture Tiles
      { picturesLoaded ? picturesLoaded : null }
      </div>
    );
  }
}

export default SingleTile;
