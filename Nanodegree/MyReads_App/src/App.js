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
    this.state = {
      books: [],
      current: [],
      want: [],
      read: []
    }
  }

  sortBooks(b) {
    //console.log(b);
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

  changeShelf(e, b) {
    BooksAPI.update(b, e).then(this.getShelf());
  }

  getShelf() {
    BooksAPI.getAll().then((books) => {
      console.log(books);
      this.sortBooks(books);
    });
  }

  componentDidMount(){
    this.getShelf();
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={ () => 
          <ListBooks
            books={this.state.books}
            current={this.state.current}
            want={this.state.want}
            read={this.state.read}
            changeShelf={this.changeShelf} /> 
          }/>

        <Route path='/search' render={ () => 
          <SearchBooks 
            books={this.state.books}
            current={this.state.current}
            want={this.state.want}
            read={this.state.read}
            changeShelf={this.changeShelf} /> 
          }/>
      </div>
    )
  }
}

export default BooksApp