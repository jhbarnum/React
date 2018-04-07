import React, { Component } from "react";
import FriendCard from "./components/FriendCard";
import Wrapper from "./components/Wrapper";
import Navbar from "./components/Navbar";
import Title from "./components/Title";
import Body from "./components/Body";
import friends from "./friends.json";
import "./App.css";

class App extends Component {
  // Setting this.state.friends to the friends json array
  state = {
    score: 0,
    highscore: 0,
    clickedFriends: [],
    message: "Clicky Game",
    gameInfo: "Click on each face to earn points. Don't click the same one twice or you'll have to start over!",
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
      this.setState({ gameInfo: "Oooooops, start over."})
    } else if (this.state.score === 11) {
      this.setState({ score: 0, clickedFriends: [] })
      this.setState({ gameInfo: "You Win! Click on any face to start another round." })
      this.setState({ highscore: 12 })
    }
      
      else {
        if (this.state.score + 1 > this.state.highscore) { 
          this.setState({
          highscore: this.state.score + 1
          
          })
        }
        this.setState({ gameInfo: "Click on each face to earn points. Don't click the same one twice or you'll have to start over!"})
        this.state.clickedFriends.push(id);
        console.log("clicked Friends" + this.state.clickedFriends);
        this.setState({ score: this.state.score + 1});
        if (this.state.score === 11) {
          this.setState({ gameInfo: "You Win! Click on any face to start another round." })
        }
      console.log("points " + this.state.score);
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
        <Navbar className="score" score={this.state.score}  highscore={this.state.highscore} />
        <Title className="title" message={this.state.message} />
        <Body className="body" gameInfo={this.state.gameInfo} />
        {this.state.friends.map(friend => (
          <FriendCard
            handleOnChange={this.handleOnChange}
            handleIncrement={this.handleIncrement}
            id={friend.id}
            key={friend.id}
            name={friend.name}
            image={friend.image}
            
          />
        ))}
      </Wrapper>
    );

  }
}

export default App;
