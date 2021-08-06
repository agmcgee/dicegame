import React from 'react';
import './App.css';
import ButtonComponents from './components/ButtonComponents';
import ReactDice from 'react-dice-complete'
import 'react-dice-complete/dist/react-dice-complete.css'
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      totalPlayer: 0,
      totalComputer: 0,
      playerScore: 0,
      playerState: '',
      computerScore: 0,
      compState: '',
      currentRoll: 0,
      lastCompRoll: false,
      playerTurn: true,
      compTurn: false,
      matchOver: false  
    }
  }

  rollAll(dieVals) {
    this.reactDice.rollAll(dieVals)
  }

  sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }

  reset() {
    this.setState ({
      playerScore: 0,
      playerState: '',
      computerScore: 0,
      compState: '',
      currentRoll: 0,
      lastCompRoll: false,
      playerTurn: true,
      compTurn: false,
      finalComScore: 0
    })
  }

  matchReset() {
    this.setState ({
      totalPlayer: 0,
      totalComputer: 0,
      playerScore: 0,
      playerState: '',
      computerScore: 0,
      compState: '',
      currentRoll: 0,
      lastCompRoll: false,
      playerTurn: true,
      compTurn: false,
      matchOver: false  
    })
  }
 
  rollDoneCallback = (num) => {
    this.setState ({
      currentRoll: num
    })
    var curScore = 0
    if (this.state.playerTurn) {
    curScore = this.state.playerScore + this.state.currentRoll
      if(curScore > 11) {
        this.setState({
          playerScore: curScore,
          playerTurn: false,
          lastCompRoll: true,
          compTurn: false
        })
      }
      else {
        this.setState ({
          playerScore: curScore
        })
      }
    }
    else {
      var curCompScore = 0
      curCompScore = this.state.computerScore + this.state.currentRoll

      if (this.state.computerScore < this.state.playerScore) {
        this.setState({
          computerScore: curCompScore,
        })
        if (this.state.computerScore >= this.state.playerScore) {
          this.setState({
            compTurn: false
          })
        }
      }

      if (curCompScore >= this.state.playerScore) {
        this.setState({
          compTurn: false,
        })
      }
      this.setState({
        computerScore: curCompScore
      })
  }


    if (!this.state.playerTurn & !this.state.compTurn){
      if (this.state.playerScore > 11) {
        this.setState({
          playerState: "You bust!",
          compState: "Computer wins",
          totalComputer: this.state.totalComputer + 1
        })
      }
      else if(this.state.computerScore > 11) {
        this.setState({
          playerState: "You win!",
          compState: "Computer bust!",
          totalPlayer: this.state.totalPlayer + 1
        })
      }
      else if(this.state.playerScore > this.state.computerScore) {
        this.setState({
          playerState: "You win!",
          totalPlayer: this.state.totalPlayer + 1
        })
      }
      else if(this.state.playerScore < this.state.computerScore) {
        this.setState({
          compState: "Computer wins",
          totalComputer: this.state.totalComputer + 1
        })
      }
      else {
        this.setState({
          compState: "Tie!"
        })
      }
    }

    if (this.state.totalPlayer === 3 || this.state.totalComputer === 3 ){
      this.setState({
        matchOver: true
      })
    }

    console.log(`You rolled a ${num}`)
    return num
  }
  
  onClick = (button) => {
    if (!this.state.matchOver) {
      if (button === "roll") {
        if(this.state.playerTurn !== true) {
          this.reset()
        }
        this.rollAll()
      }
      else if (button === "stay") {
          this.setState ({
            playerTurn: false,
            compTurn: true
          }, function() {
            var compScore = 0
            var roll = 0
            var scoreList = []
            while (compScore < this.state.playerScore) {
              roll = (Math.floor(Math.random()*6)+1);
              scoreList.push(roll)
              compScore += roll;
              }
            for (var i = 0; i < scoreList.length; i++) {
              this.rollAll([scoreList[i]]);
            }
          });
      }
    }
    if (button === "play again") {
      this.matchReset()
    }
  };

  render() {
    if (this.state.compTurn) {
      this.sleep(500);
    }
    return (
      <div className="App container-fluid">
        <header className="App-header">
          Dice Game!
        </header>
        <div className="game-table">
          <div className="game-board col-md-3 h-65 w-50 mx-auto" align="center">
            <p>Player Score (Game: {this.state.playerScore}  Match: {this.state.totalPlayer})</p>
            <p>Computer Score (Game: {this.state.computerScore} Match: {this.state.totalComputer})</p>
            {/* <div> */}
              <ReactDice
                numDice={1}
                rollTime={1}
                rollDone={this.rollDoneCallback}
                disableIndividual="true"
                ref={dice => this.reactDice = dice}/>
            {/* </div> */}
            <div className="winner-panel container">
              <p>{this.state.playerState}</p>
              <p>{this.state.compState}</p>
              <ButtonComponents ref="btn" onClick={this.onClick}/>
            </div>          
          </div>
        </div>
      </div>
    );
  }
}

export default App;
