import React, { Component } from 'react';
import './styles/main.css';
import { WORDNIK_KEY } from './config';
import { GIFFY_KEY } from './config';


class PictureLoader extends Component {
  constructor(props){
    super(props);
    this.state = {
      value: '',
      randomWord: '',
      picturesLoaded: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.randomWord = this.randomWord.bind(this);
  }

  getGif(desiredPic){
    //const animalString = 'http://api.giphy.com/v1/gifs/search?q='+ animal + '&api_key=j377UshnNNHUz9PoJ2BJ2MwNYqQcYJhg';
  }

  // NEXT: 
  // Set initial picture to randome image
  // click on thummbnail adds to firebase array AND resets main picture
  // firebase array click on item and get popup / _____ other thing -- which asks to confirms
  // another button shows selection of mosaics
  // load / delete


  // game idea
  // load a list of words
  // pick one word from the list and add that gif
  // start a timer and the user plays until they ifnd it
  // add themes, ie tuemp gifs

  
  get25Gifs(animal){
    
    const animalString = 'http://api.giphy.com/v1/gifs/search?q='+ animal + '&api_key=' + GIFFY_KEY;

    return fetch(animalString)
      .then(results => {
        return results.json();
      })
      .then(dataObj => {
        const picturesLoaded = dataObj.data.map(pic => {
          return (
            <div key={pic.id} onClick={this.handleClick.bind(null, pic.id, pic.images, pic.title, pic.rating)}>
              <img src={pic.images.fixed_height_small.url} alt={pic.title}/>
            </div>
          )
        })

        this.setState({
          picturesLoaded
        });
      })
      .catch(err => {
        console.log("ERR", err)
      })
  }


  handleClick(id, images, title, rating){
    this.props.setLatestGif({id, images, title, rating})

    // add to firebase
    // remove from current array and reredner
    
  }



  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    console.log('A name was submitted: ' + this.state.value);
    event.preventDefault();
    this.get25Gifs(this.state.value);
    this.setState({value: ''});

  }

  
  randomWord() {
    const wordNikQuery = "http://api.wordnik.com/v4/words.json/randomWord?api_key=" + WORDNIK_KEY;

    return fetch(wordNikQuery)
    .then ( results => results.json())
    .then ( data => {
      this.setState({
        randomWord: data.word
      });

      // for now, call is usng get25gif, change this to update onlyt the main pic
      //  clik ON the thimbnail to set it to the maine pic AND this adds it to the array which is saved to firebase
      this.get25Gifs(data.word);

    })
    .catch ( err => console.log(err))

  }








  render() {

    return (
      <div>
        <p>Quiilt / Memory game / Invaders / ML</p>
        <h2> {this.state.randomWord.length ? this.state.randomWord : null}</h2>
       
        <img src='https://boygeniusreport.files.wordpress.com/2017/05/dog.jpg?quality=98&strip=all' alt='pooch' height='300px' wide='300px'/>

        <div>
          <button onClick={this.randomWord}>Random Word</button>
        </div>

        
        <form onSubmit={this.handleSubmit}>
          <label>
            Enter a word:
            <input type="text" value={this.state.value} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
        
        <button>Clear</button>
        <div className="topContainer">
          {this.state.picturesLoaded}
        </div>

      </div>
    );
  }

}

export default PictureLoader;
