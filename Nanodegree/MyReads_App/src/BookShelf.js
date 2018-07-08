import React from 'react'
import { Component } from 'react'
import * as BooksAPI from './BooksAPI'

class BookShelf extends Component {
    
    render() {
        return (
            <div className="bookshelf-books">
                <ol className="books-grid">
                    { this.props.shelf.map((book) => (
                        <li key={'book.industryIdentifiers[0].identifier' }>
                        <div className="book">
                            <div className="book-top">
                            <div className="book-cover"
                                style={{ 
                                    width: 128,
                                    height: 193,
                                    backgroundImage: 'url("'+book.imageLinks.smallThumbnail+'")'
                                }}>
                            </div>
                            <div className="book-shelf-changer">
                                <select onChange={ (event) => this.shelfChange(event.target.value, book) }>
                                    <option value="move" disabled>Move to...</option>
                                    <option value="currentlyReading">Currently Reading</option>
                                    <option value="wantToRead">Want to Read</option>
                                    <option value="read">Read</option>
                                    <option value="none">None</option>
                                </select>
                            </div>
                            </div>
                            <div className="book-title">{book.title}</div>
                            <div className="book-authors">{book.authors}</div>
                        </div>
                        </li>
                    ))}
                </ol>
            </div>
        )
    }
}

export default BookShelf