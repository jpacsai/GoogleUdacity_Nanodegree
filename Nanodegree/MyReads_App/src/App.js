import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route } from 'react-router-dom'
import SearchBooks from './SearchBooks';
import ListBooks from './ListBooks';

class BooksApp extends React.Component {
  state = {
    books: []
  }

  onShelf() {
    BooksAPI.getAll().then((b) => {
      this.setState({ books: b})
      console.log(this.state.books);
    });
  }

  shelfChange(e, b) {
    console.log(e);
    BooksAPI.update(b, e);
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' component={ ListBooks } bookList = {this.onShelf()}/>
        <Route path='/search' component={ SearchBooks } />
      </div>
    )
  }
}

export default BooksApp