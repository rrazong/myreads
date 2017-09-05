import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import BooksGrid from './BooksGrid'
import * as BooksAPI from './BooksAPI'
import './App.css'


class ListBooks extends React.Component {

    state = {
        oneBook: {}
    }

    static propTypes = {
        shelfBooks: PropTypes.array.isRequired
    }

    // Not sure how to invoke this method from SearchPage or App.js instead of having to repeat the code
    updateShelf = (event, book) => {

        book.shelf = event.target.value;

        //setState to trigger a re-render:
        this.setState({oneBook: book})

        //update database
        BooksAPI.update(book, book.shelf)
    }


    render() {

        let currentlyReading = this.props.shelfBooks.filter((book) => book.shelf === 'currentlyReading')
        let wantToRead = this.props.shelfBooks.filter((book) => book.shelf === 'wantToRead')
        let read = this.props.shelfBooks.filter((book) => book.shelf === 'read')

        return (

            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Currently Reading</h2>
                            <div className="bookshelf-books">

                                <BooksGrid
                                    books={currentlyReading}
                                    onHandleChange={this.updateShelf}
                                />

                            </div>
                        </div>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Want to Read</h2>
                            <div className="bookshelf-books">

                                <BooksGrid
                                    books={wantToRead}
                                    onHandleChange={this.updateShelf}
                                />

                            </div>
                        </div>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Read</h2>
                            <div className="bookshelf-books">

                                <BooksGrid
                                    books={read}
                                    onHandleChange={this.updateShelf}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="open-search">
                    <Link
                        to="/search"
                        onClick={ () => this.props.refresh(this.props.shelfBooks)}>
                        Add a Book
                    </Link>
                </div>
            </div>
        )
    }
}

export default ListBooks
