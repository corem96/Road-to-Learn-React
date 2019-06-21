import React from 'react';
import './App.css';

const list = [{
  title: 'react',
  url: 'https://reactjs.org',
  author: 'Jordan Walke',
  num_comments: '3',
  points: 4,
  objectID: 0
}, {
  title: 'redux',
  url: 'https://redux.js.org',
  author: 'Dan Abramov, Andrew Clark',
  num_comments: 2,
  points: 5,
  objectID: 1
}];

class App extends React.Component {
  render() {
    let welcome = 'Welcome my friend to the Road to learn React';
    return (
      <div className="App">
        <h2>{welcome}</h2>
      </div>
    );
  }
}

export default App;
