/*jshint esversion: 6 */
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
    };

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
        <Search 
          value={searchTerm}
          onChange={this.onSearchChange}>
          Search by
        </Search>
        <Table
          list={list}
          pattern={searchTerm}
          onDismiss={this.onDismiss}/>
      </div>
    );
  }
}

class Search extends React.Component {
  render() {
    const { value, onChange, children } = this.props;

    return (
      <form>
        <div className="Input">
          {children}<input type="text"
          onChange={onChange} value={value}
          placeholder="term"/>
        </div>
      </form>
    );
  }
}

class Table extends React.Component {
  render() {
    const { list, pattern, onDismiss } = this.props;

    return (
      <div className="list-area">
        {list.filter(isSearched(pattern)).map(item => 
          <div className="author-list-area" key={item.objectID}>
            <div className="title">{item.title}</div>
            <div className="author">{item.author}</div>
            <div className="desc">comments: {item.num_comments}</div>
            <div>
              <button onClick={() => onDismiss(item.objectID)}
                type="button">Dismiss</button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default App;
