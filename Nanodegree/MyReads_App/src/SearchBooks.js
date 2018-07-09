import React from 'react'
import { Component } from 'react'
import { Link } from 'react-router-dom'
import BookShelf from './BookShelf';
import * as BooksAPI from './BooksAPI'

class SearchBooks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: []
        }
    }

    handleChange(e) {
        BooksAPI.search(e).then((books) => {
            console.log(books);
            const result = books && Array.isArray(books) ? books : [];
            this.setState({
                query : result
            })
        })
    }

    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to='/'>
                        Close
                    </Link>
                    <div className="search-books-input-wrapper">
                        {/*
                        NOTES: The search from BooksAPI is limited to a particular set of search terms.
                        You can find these search terms here:
                        https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                        However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                        you don't find a specific author or title. Every search is limited by search terms.
                        */}
                        <input
                            type="text"
                            placeholder="Search by title or author"
                            onChange={(event) => this.handleChange(event.target.value)}
                        /> 
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        <BookShelf onShelf={this.props.books} books={this.state.query} changeShelf={this.props.changeShelf} checkShelf={this.props.checkShelf}/>
                    </ol>
                </div>
            </div>
        )
    }
}

export default SearchBooks