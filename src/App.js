/*jshint esversion: 6 */
import React from 'react';
import './App.css';

const DEFAULT_QUERY = '';
const DEFAULT_HPP = '100';

const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const PARAM_PAGE = `page=`;
const PARAM_HPP = `hitsPerPage=`;

class App extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      results: null,
      searchKey: '',
      searchTerm: DEFAULT_QUERY
    };

    this.setSearchTopStories = this.setSearchTopStories.bind(this);
    this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
  }

  componentDidMount() {
    const { searchTerm } = this.state;
    this.setState({ searchKey: searchTerm });
    this.fetchSearchTopStories(searchTerm);
  }

  fetchSearchTopStories(searchTerm, page = 0) {
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`)
      .then(response => response.json())
      .then(result => this.setSearchTopStories(result))
      .catch(error => error);
  }

  setSearchTopStories(result) {
    const { hits, page } = result;
    const { searchKey, results } = this.state;

    const oldHits = results && results[searchKey]
      ? results[searchKey].hits
      : [];

    const updatedHits = [
      ...oldHits,
      ...hits
    ];

    this.setState({
      results: {
        ...results,
        [searchKey]: { hits: updatedHits, page }
      }
    });
  }

  onSearchSubmit(event) {
    const { searchTerm } = this.state;
    this.setState({ searchKey: searchTerm });
    this.fetchSearchTopStories(searchTerm);
    event.preventDefault();
  }

  onSearchChange(event) {
    this.setState({searchTerm: event.target.value});
  }

  onDismiss(id) {
    const { searchKey, results } = this.state;
    const { hits, page } = results[searchKey];

    const isNotId = item => item.objectID !== id;
    const updatedHits = hits.filter(isNotId);
    
    this.setState({
      results: {
        ...this.state.result,
        [searchKey]: { hits: updatedHits, page }
      }
    });
    console.log(this.state.result);
  }

  render() {
    const { searchTerm, results, searchKey } = this.state;
    const page = (results && results[searchKey] && results[searchKey].page) || 0;
    const list = (results && results[searchKey] && results[searchKey].hits) || [];
    if (!results) { return null; }
    
    return (
      <div className="App">
        <Search
          value={searchTerm}
          onChange={this.onSearchChange}
          onSubmit={this.onSearchSubmit}>Search</Search>
        { results
          &&
          <Table
            list={list}
            onDismiss={this.onDismiss}/>
        }
        <div className="interactions">
          <button onClick={() => this.fetchSearchTopStories(searchKey, page + 1)}>More</button>
        </div>
      </div>
    );
  }
}

const Search = ({ value, onChange, onSubmit, children }) => {
  return (
      <form onSubmit={onSubmit}>
        <div className="Input">
          {children}<input type="text"
          value={value}
          onChange={onChange}
          placeholder="term"/>
          <button type="submit">{children}</button>
        </div>
      </form>
    );
  }

const Table = ({ list, onDismiss }) => {
  return (
    <div className="list-area">
      <div className="results-count">
        <span>{list.length} results</span>
      </div>
      {list.map(item => 
        <div className="author-list-area" key={item.objectID}>
          <div className="author">{item.author}</div>
          <div className="list-body">
            <a href={item.url} target="_blank"
              className="title"
              rel="noopener noreferrer">{item.title}</a>
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
