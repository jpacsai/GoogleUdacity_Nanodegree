import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route } from 'react-router-dom'
import SearchBooks from './SearchBooks';
import ListBooks from './ListBooks';

class BooksApp extends React.Component {
  state = {
    books: [],
    current: [],
    want: [],
    read: []
  }

  sortBooks(b) {
    console.log(b);
    const current = b.filter((book) => book.shelf === 'currentlyReading');
    const want = b.filter((book) => book.shelf === 'wantToRead');
    const read = b.filter((book) => book.shelf === 'read');
    this.setState({
      current,
      want,
      read,
      books: b
    })
  }

  shelfChange(e, b) {
    BooksAPI.update(b, e);
  }

  componentDidMount(){
    BooksAPI.getAll().then((b) => {
      this.sortBooks(b);
    });
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={ () => 
          <ListBooks
            books={this.state.books}
            current={this.state.current}
            want={this.state.want}
            read={this.state.read} /> 
          }/>

        <Route path='/search' render={ () => 
          <SearchBooks 
            books={this.state.books}/> 
          }/>
      </div>
    )
  }
}

export default BooksApp