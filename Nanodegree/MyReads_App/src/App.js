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

  shelfChange(e, b) {
    BooksAPI.update(b, e);
  }

  componentDidMount(){
    BooksAPI.getAll().then((b) => {
      this.setState({
        books: b
      })
    });
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={ () => <ListBooks books={this.state.books}/> }/>
        <Route path='/search' render={ () => <SearchBooks books={this.state.books}/> }/>
      </div>
    )
  }
}

export default BooksApp