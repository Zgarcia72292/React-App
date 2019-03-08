import React, { Component } from "react";
import FriendCard from "./components/FriendCard";
import Wrapper from "./components/Wrapper";
import Title from "./components/Title";
import friends from "./friends.json";

class App extends Component {
  // Setting this.state.friends to the friends json array
  state = {
    friends,
    score: 0,
    topscore: 0,
  };

//this is the restart function that will either give you win or lose message based on if 
  //all 12 cards were clicked correctly, and will restart the "thisclicked" property to false.
  //when the game is over, if the user score is higher than the top score, the top score will be set
  // to the user score, and the game will reset the user score to 0


  restart = () => {
    if (this.state.score > this.state.topscore) {
      this.setState({ topscore: this.state.score });
      this.state.friends.forEach(friend => {
        friend.thisclicked = false;
      });
       alert("You lose!");
        this.setState({ score: 0 });

        
  
    }


  }

  removeFriend = id => {
    //This code checks the "thisclicked" propery of the card clicked. If the value is 
    //false it will make it true and increment the users score, then randomize the friend cards.
    //If the clicked friend cards value for "thisclicked" is already true it will run the gameover function//
    this.state.friends.find((clicked, i) => {
      if (clicked.id === id) {
        if (friends[i].thisclicked === false) {
          friends[i].thisclicked = true;
          this.setState({ friends, score: this.state.score + 1 });
          friends.sort(() => Math.random() - 0.5);
          return true;
        }
        else {
          this.restart();
        }
      }
    })
    // this.state.score++;
    //     if (!this.state.clicked){


    //     // Set this.state.friends equal to the new friends array
    //     // this.setState({ friends, score: this.state.score +1 });
    //     this.setState({friends, clicked: true })
    //   }
    //   else {friends.forEach(friends => friends.setState({clicked:false}));
    //   this.setState({friends, score:0});
    // }
  }

  // Map over this.state.friends and render a FriendCard component for each friend object
  render() {
    return (
      <Wrapper>
        <Title>Friends List
          <br />
          Top Score: {this.state.topscore}
          <br />
          Score: {this.state.score}
        </Title>
        {this.state.friends.map(friend => (
          <FriendCard
            removeFriend={this.removeFriend}
            id={friend.id}
            key={friend.id}
            name={friend.name}
            image={friend.image}
            occupation={friend.occupation}
            location={friend.location}
          />
        ))}
      </Wrapper>
    );
  }
}

export default App;
