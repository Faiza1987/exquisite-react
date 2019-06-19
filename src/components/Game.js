import React, { Component } from 'react';
import './Game.css';
import PlayerSubmissionForm from './PlayerSubmissionForm';
import FinalPoem from './FinalPoem';
import RecentSubmission from './RecentSubmission';

class Game extends Component {

  constructor(props) {
    super(props);

    this.state = {
      // recentLine: 'I am a test!',
      recentLine: '',
      fullPoem: [],
      playerNumber: 1,
      display: false,
    }
  }
  addLine = ({adjective, noun, adverb, verb, adjective2, noun2}) => {
    // console.log(' I am addLine!');
    let currentLine = this.state.recentLine;
    // let playerTurn = this.state.playerNumber;

    let newLine = `The ${adjective} ${noun} ${adverb} ${verb} the ${adjective2} ${noun2}`;

    // console.log(newLine);

    currentLine = newLine;
    this.state.fullPoem.push(currentLine);

    // console.log(currentLine);

    this.setState({
      recentLine: currentLine,
      fullPoem: this.state.fullPoem,
      playerNumber: this.state.playerNumber + 1,
    });

    // console.log(this.state.recentLine);
    // console.log(this.state.fullPoem);
  }

  renderFinalPoem = () => {
    console.log(this.state.fullPoem);

    if (this.state.display !== false){
      return(
        < FinalPoem poem={this.state.fullPoem} />
      );
    }
  }

  toggleRevealPoemButton = () => {
    this.setState({
      display: !this.state.display,
    });
    
  }

  render() {

    const exampleFormat = FIELDS.map((field) => {
      if (field.key) {
        return field.placeholder;
      } else {
        return field;
      }
    }).join(" ");

    return (
      <div className="Game">
        <h2>Game</h2>

        <p>Each player should take turns filling out and submitting the form below. Each turn should be done individually and <em>in secret!</em> Take inspiration from the revealed recent submission. When all players are finished, click the final button on the bottom to reveal the entire poem.</p>

        <p>Please follow the following format for your poetry submission:</p>

        <p className="Game__format-example">
          { exampleFormat }
        </p>

        <RecentSubmission 
          mostRecentLine={this.state.recentLine}
        />

        <PlayerSubmissionForm 
          addLineCallback={this.addLine}
          playerNumber={this.state.playerNumber}
        />


         {/* Renders the Final Poem component by calling the function */}
          {this.renderFinalPoem()}

        <div className="FinalPoem__reveal-btn-container">
          <input type="button" value="We are finished: Reveal the Poem" className="FinalPoem__reveal-btn" onClick={this.toggleRevealPoemButton} />
        </div>

      </div>
    );
  }
}

const FIELDS = [
  "The",
  {
    key: 'adj1',
    placeholder: 'adjective',
  },
  {
    key: 'noun1',
    placeholder: 'noun',
  },
  {
    key: 'adv',
    placeholder: 'adverb',
  },
  {
    key: 'verb',
    placeholder: 'verb',
  },
  "the",
  {
    key: 'adj2',
    placeholder: 'adjective',
  },
  {
    key: 'noun2',
    placeholder: 'noun',
  },
  ".",
];

export default Game;
