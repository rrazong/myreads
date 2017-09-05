import React from 'react'
import { Route } from 'react-router-dom'
import { Router } from 'react-router-dom'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import ListBooks from './ListBooks'
import SearchPage from './SearchPage'
import BooksGrid from './BooksGrid'
import * as BooksAPI from './BooksAPI'
import './App.css'


class BooksApp extends React.Component {

    state = {

        //oneBook: {},
        shelfBooks: []
    }

    componentDidMount() {

        BooksAPI.getAll().then((shelfBooks) => {
            this.setState({shelfBooks})
        })
    }


    //Not sure how to invoke it here from SearchPage and ListBooks:
    /*
    updateShelf = (event, book) => {

        book.shelf = event.target.value;

        //setState to trigger a re-render:
        this.setState({oneBook: book})

        //update database
        BooksAPI.update(book, book.shelf)
    }
    */


    render () {

        return (

            <div className='app'>

                <Route exact path="/" render={ ( { }) => (
                    <ListBooks
                        shelfBooks={this.state.shelfBooks}
                    />
                )}/>

                <Route path='/search' render= { ( ) => (
                    <SearchPage
                        shelfBooks={this.state.shelfBooks}
                    />
                )} />
            </div>
        )
    }
}

export default BooksApp

