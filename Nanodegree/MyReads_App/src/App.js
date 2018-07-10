import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route } from 'react-router-dom'
import SearchBooks from './SearchBooks';
import ListBooks from './ListBooks';
import { Component } from 'react';

class BooksApp extends Component {
  constructor(props) {
    super(props);
    this.changeShelf = this.changeShelf.bind(this);
    this.checkShelf = this.checkShelf.bind(this);
    this.state = {
      onShelf: [],
      current: [],
      want: [],
      read: [],
      query: [],
      
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
            checkShelf={ this.checkShelf }
            changeShelf={ this.changeShelf } 
            bookChecker={ this.bookChecker } />
          }/>
      </div>
    )
  }
}

export default BooksApp