/*jshint esversion: 6 */
import React from 'react';
import './App.css';

const DEFAULT_QUERY = 'redux';
const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
// const url = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${DEFAULT_QUERY}`;

const isSearched = searchTerm => 
  item => item.title.toLowerCase().includes(searchTerm.toLowerCase());

class App extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      result: null,
      searchTerm: DEFAULT_QUERY
    };

    this.searchTopStories = this.setSearchTopStories.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
  }

  componentDidMount() {
    const { searchTerm } = this.state;

    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}`)
      .then(response => response.json())
      .then(result => this.setSearchTopStories(result))
      .catch(error => error);
  }

  setSearchTopStories(result) {
    this.setState({ result });
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
    const { searchTerm, result } = this.state;
    if (!result) { return null; }
    
    return (
      <div className="App">
        <Search
          value={searchTerm}
          onChange={this.onSearchChange}>Search by</Search>
        <Table
          list={result.hits}
          pattern={searchTerm}
          onDismiss={this.onDismiss}/>
      </div>
    );
  }
}

const Search = ({ value, onChange, children }) => {
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

const Table = ({ list, pattern, onDismiss }) => {
  return (
    <div className="list-area">
      {list.filter(isSearched(pattern)).map(item => 
        <div className="author-list-area" key={item.objectID}>
          <div className="author">{item.author}</div>
          <div className="list-body">
            <a href={item.url} target="_blank" className="title">{item.title}</a>
            <div className="desc">comments: {item.num_comments}</div>
          </div>
          <div className="btnGroup">
            <Button onClick={() => onDismiss(item.objectID)}>Dismiss</Button>
          </div>
        </div>
      )}
    </div>
  );
}

const Button = ({onClick,className = '',children}) => {
  return (
    <button type="button"
        className={className}
        onClick={onClick}>{children}</button>
  );
}


export default App;
