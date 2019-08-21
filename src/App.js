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

const isSearched = searchTerm => 
  item => item.title.toLowerCase().includes(searchTerm.toLowerCase());

class App extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      list,
      searchTerm: ''
    }

    this.onSearchChange = this.onSearchChange.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
  }

  onSearchChange(event) {
    this.setState({searchTerm: event.target.value});
  }

  onDismiss(id) {
    const isNotId = item => item.objectID !== id;
    const updatedList = this.state.list.filter(isNotId);
    
    this.setState({list: updatedList});
  }

  render() {
    const { searchTerm, list } = this.state;
    return (
      <div className="App">
        <div className="list-area">
          <form>
            <label>Search by </label>
            <input type="text"
              onChange={this.onSearchChange} value={searchTerm}
              placeholder="term"/>
          </form>

        {list.filter(isSearched(searchTerm))
          .map(item =>
            
              <div className="author-list-area" key={item.objectID}>
                <div className="title">{item.title}</div>
                <div className="author">{item.author}</div>
                <div className="desc">comments: {item.num_comments}</div>
                <div>
                  <button onClick={() => this.onDismiss(item.objectID)}
                    type="button">Dismiss</button>
                </div>
              </div>
        )
      }
        </div>
      </div>
    );
  }
}

export default App;
