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
      read: []
    }
  }

  // fetch all books already on shelves on page load
  componentDidMount(){
    this.getShelf();
  }

  // fetch all books already on shelves (currently reading, want to read and read)
  // then check if each book has missing properties (image url, author)
  // sort books into relevant shelves in state
  getShelf() {
    BooksAPI.getAll().then((books) => {
      books.forEach((book) => this.bookChecker(book));
      this.sortBooks(books);
    });
  }

  // then check if each book has missing properties (image url, author)
  bookChecker(b){
    // if imageLink property is missing add a link for placeholder
    if (b.hasOwnProperty('imageLinks') === false) {
      b.imageLinks = 'url("https://i.imgur.com/OUAxmdN.png")'
    }
    // if author property is missing add text
    if (b.hasOwnProperty('authors') === false) {
      b.authors = ['unknown author']
    }
    return b;
  }

  // sort a book into it's relevant shelf based on it's in shelf property
  sortBooks(b) {
    const current = b.filter((book) => book.shelf === 'currentlyReading');
    const want = b.filter((book) => book.shelf === 'wantToRead');
    const read = b.filter((book) => book.shelf === 'read');
    // set it in state
    this.setState({
      onShelf: b,
      current,
      want,
      read
    })
  }

  // check if book is on shelf
  // return it's shelf value or 'none' if not on shelf
  checkShelf(b) {
    const result = this.state.onShelf.filter((s) => s.id === b.id);
    return result.length > 0 ? result[0].shelf : 'none';
  }

  // update a book's shelf property
  changeShelf(e, b) {
    // copy array of books on shelves to modify changed book's shelf property
    const updateShelf = this.state.onShelf.slice(0);
    // find book's index in the array
    const index = this.state.onShelf.findIndex((k) => k.title === b.title);
    // update the books's shelf property in array
    updateShelf[index].shelf = e;
    // sort updated array of books to shelves
    // and set it in state to reflect shelf change immediately
    this.sortBooks(updateShelf);
    BooksAPI.update(b, e);
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