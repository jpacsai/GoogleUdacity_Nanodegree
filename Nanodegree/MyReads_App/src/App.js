import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route } from 'react-router-dom'
import SearchBooks from './SearchBooks';
import ListBooks from './ListBooks';

class BooksApp extends React.Component {
  constructor(props) {
    super(props);
    this.changeShelf = this.changeShelf.bind(this);
    this.checkShelf = this.checkShelf.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      onShelf: [],
      current: [],
      want: [],
      read: [],
      query: [],
      matchCounter: ''
    }
  }

  checkShelf(b) {
    const result = this.state.onShelf.filter((s) => s.id === b.id);
    return result.length > 0 ? result[0].shelf : 'none';
  }

  sortBooks(b) {
    const current = b.filter((book) => book.shelf === 'currentlyReading');
    const want = b.filter((book) => book.shelf === 'wantToRead');
    const read = b.filter((book) => book.shelf === 'read');
    this.setState({
      onShelf: b,
      current,
      want,
      read
    })
  }

  changeShelf(e, b) {
    BooksAPI.update(b, e).then(this.getShelf());
  }

  getShelf() {
    BooksAPI.getAll().then((books) => {
      this.bookChecker(books);
      this.sortBooks(books);
    });
  }

  handleChange(expression) {
    BooksAPI.search(expression).then((results) => {
      const result = results && Array.isArray(results) ? results : [];
      let counterText = '';
      if (result.length > 0) {
        const matchCounter = result.length;
        counterText = matchCounter + " matching books";
        result.forEach((b => {
          this.bookChecker(b);
        }))
      }
      else if (result.length === 0 && expression.length > 0) {
        counterText = 'Sorry, no matching book found'
      }
      else {
        counterText = '';
      }
      this.setState({
        query: result,
        matchCounter: counterText
      })
    })
  }

  bookChecker(b){
    if (b.hasOwnProperty('imageLinks') === false) {
      b.imageLinks = 'url("https://i.imgur.com/OUAxmdN.png")'
    }
    if (b.hasOwnProperty('authors') === false) {
      b.authors = ['author unknown']
    }
    return b;
  }

  componentDidMount(){
    this.getShelf();
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={ () => 
          <ListBooks
            books={ this.state.onShelf }
            current={ this.state.current }
            want={ this.state.want }
            read={ this.state.read }
            checkShelf={ this.checkShelf }
            changeShelf={ this.changeShelf } /> 
          }/>

        <Route path='/search' render={ () => 
          <SearchBooks 
            books={ this.state.onShelf }
            current={ this.state.current }
            want={ this.state.want }
            read={ this.state.read }
            checkShelf={ this.checkShelf }
            changeShelf={ this.changeShelf } 
            handleChange={ this.handleChange }
            query={ this.state.query }
            matchCounter={ this.state.matchCounter }/> 
          }/>
      </div>
    )
  }
}

export default BooksApp