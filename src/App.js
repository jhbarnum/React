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

  handleIncrement = (props) => {
    console.log("points" + props);
    // console.log(id);
    // We always use the setState method to update a component's state
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
  checkClicks = id => {
    if(this.state.clickedFriends.includes(id)) {
      this.setState({ score: 0, clicks: [] })
    } else {
      if (this.state.score + 1 > this.state.highscore) {
        this.setState({
          highscore: this.state.score + 1
          
        })
      }
    this.state.clicks.push(id)
    this.setState({ score: this.state.score + 1});
  }
};
// handleOnchange = (id) => {
//   this.checkClicks(id)
//   this.shuffleArray(this.state.friends)
// };


  removeFriend = id => {
    // Filter this.state.friends for friends with an id not equal to the id being removed
    const friends = this.state.friends.filter(friend => friend.id !== id);
    // Set this.state.friends equal to the new friends array
    this.setState({ friends });
  };

  // Map over this.state.friends and render a FriendCard component for each friend object
  render() {
    this.shuffleArray(this.state.friends);
    console.log(friends);
    
    return (
      <Wrapper>
        <p className="card-text">Click Count: {this.state.score}</p>
        <Title>Friends List</Title>
        {this.state.friends.map(friend => (
          <FriendCard
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
