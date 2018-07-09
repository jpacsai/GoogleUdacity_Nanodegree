import React from 'react'
import { Component } from 'react'

class BookShelf extends Component {
    render() {
        const {changeShelf, books, checkShelf} = this.props;
        return (
            <div className="bookshelf-books">
                <ol className="books-grid">
                    { books.map((book) => (
                        <li key={ book.id }>
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
                                <select onChange={(event) => changeShelf(event.target.value, book)} value={checkShelf(book)}>
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