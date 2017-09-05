import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BooksGrid from './BooksGrid';


class SearchPage extends Component {

    state = {
        query: '',
        searchResults: []
    }

    updateQuery = (query) => {

        this.setState( { query: query.trim() })

        //get all books that match the input query

        if (query.length > 0) {

            BooksAPI.search(query).then((searchResults) => {
                this.setState({searchResults})
            })
        } else {
            this.clearQuery(query)
        }
    }


    clearQuery = (query) => {
        this.setState({query: ''})
    }


    // Not sure how to invoke this method from ListBooks or App.js instead of having to repeat the code

    updateShelf = (event, book) => {

        book.shelf = event.target.value;

        //setState to trigger a re-render:
        //this.setState({oneBook: book})

        //update database
        BooksAPI.update(book, book.shelf)
    }


    render() {

        let shelfBook, book;

        //set all shelves to 'none'
        for (book of this.state.searchResults) {
            book.shelf = 'none';
        }

        //set the matching shelves
        for (shelfBook of this.props.shelfBooks) {
            for (book of this.state.searchResults) {

                if (book.id === shelfBook.id) {
                    book.shelf = shelfBook.shelf;
                    continue
                }
            }
        }


        return (

            <div className="search-books">
                <div className="search-books-bar">
                    <Link
                        to="/"
                        onClick={ () => this.props.refresh(this.props.shelfBooks)}
                        className="close-search">
                        Close
                    </Link>
                    <div className="search-books-input-wrapper">

                        <input
                            className='search-contacts'
                            type='text'
                            placeholder='Search by title or author'
                            value={this.state.query}
                            onChange={(event) => this.updateQuery(event.target.value)}
                        />

                    </div>
                </div>

                <div className="search-books-results">
                    <ol className="books-grid">

                        <BooksGrid
                            books={this.state.searchResults}
                            onHandleChange={this.updateShelf}
                        />
                    </ol>
                </div>
            </div>
        )
    }
}


export default SearchPage


