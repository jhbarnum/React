import React, { Component } from "react";
import FriendCard from "./components/FriendCard";
import Wrapper from "./components/Wrapper";
import Title from "./components/Title";
import friends from "./friends.json";
import "./App.css";

class App extends Component {
  // Setting this.state.friends to the friends json array
  state = {
    score: 0,
    highscore: 0,
    clickedFriends: [],
    friends
  };



//  componentDidMount(){

//  };


  handleOnChange = (props) => {
    this.handleIncrement(props);
    this.handleOnClick(props.id)
    this.shuffleArray(this.state.friends)
  }

  handleIncrement = (props) => {
    console.log("points " + props);
    this.setState({ score: this.state.score + 1 });
  };

  // Fisher Yates Shuffle
  shuffleArray = array => {
    let i = array.length, temp, r;

      while (i) {
      r = Math.floor(Math.random() * (i --));
      temp = array[i];
      array[i] = array[r];
      array[r] = temp;
    }
    return array;
  }

  // Reset game if click is doubled
  handleOnClick = id => {
    if(this.state.clickedFriends.includes(id)) {
      this.setState({ score: 0, clickedFriends: [] })
      } else {
        if (this.state.score + 1 > this.state.highscore) {
          this.setState({
          highscore: this.state.score + 1
          
        })
      }
    this.state.clickedFriends.push(id);
    console.log("clicked Friends" + this.state.clickedFriends);
    this.setState({ score: this.state.score + 1});
  }
};


  // removeFriend = id => {
  //   // Filter this.state.friends for friends with an id not equal to the id being removed
  //   const friends = this.state.friends.filter(friend => friend.id !== id);
  //   // Set this.state.friends equal to the new friends array
  //   this.setState({ friends });
  // };

  // Map over this.state.friends and render a FriendCard component for each friend object
  render() {
    this.shuffleArray(this.state.friends);
    console.log(friends);
    
    return (
      <Wrapper>
        <p className="card-text">Points: {this.state.score} | High Score: {this.state.highscore}</p>
        <Title>Friends List</Title>
        {this.state.friends.map(friend => (
          <FriendCard
            handleOnChange={this.handleOnChange}
            handleIncrement={this.handleIncrement}
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
