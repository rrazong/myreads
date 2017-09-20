import React from 'react'
import { Route } from 'react-router-dom'
import ListBooks from './ListBooks'
import SearchPage from './SearchPage'
import * as BooksAPI from '../BooksAPI'
import '../App.css'


class BooksApp extends React.Component {

    state = {
        oneBook: {},
        shelfBooks: []
    }

    componentDidMount() {
        BooksAPI.getAll().then((shelfBooks) => {
            this.setState({shelfBooks})
        })
    }

    updateShelfApp = (event, book) => {
        book.shelf = event.target.value;

        //setState to trigger a re-render:
        this.setState({oneBook: book})

        //update database
        BooksAPI.update(book, book.shelf)
    }


    render () {

        return (

            <div className='app'>
                <Route exact path="/" render={ ( ) => (
                    <ListBooks
                        shelfBooks={this.state.shelfBooks}
                        updateShelfApp={this.updateShelfApp}
                    />
                )}/>

                <Route path='/search' render={ ( ) => (
                    <SearchPage
                        shelfBooks={this.state.shelfBooks}
                        updateShelfApp={this.updateShelfApp}
                    />
                )} />
            </div>
        )
    }
}

export default BooksApp