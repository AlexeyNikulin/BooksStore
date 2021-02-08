import React, {Component} from 'react';
import BookListItem from '../book-list-item';
import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withBookstoreService} from '../hoc';
import {fetchBooks, bookAddedToCart} from '../../actions';
import {compose} from '../../utils';
import './book-list.css';

const BookList = ({ books, onAddedToCart }) => {
    return (
        <ul className="book-list">
            {
                books.map(book => {
                    return (
                        <li key={book.id}>
                            <BookListItem 
                                book={book}
                                onAddedToCart={() => onAddedToCart(book.id) }/>
                        </li>
                    )
                })
            }
        </ul>
    );
};

class BookListContainer extends Component {

    componentDidMount() {
        const { fetchBooks } = this.props;
        fetchBooks();
    };
    
    render() {
        const { books, loading, error, onAddedToCart } = this.props;
        if (loading) {
            return <Spinner/>;
        }
        if (error) {
            return <ErrorIndicator/>;
        }
        return <BookList books={books} onAddedToCart={onAddedToCart}/>;
    };
};

const mapStateToProps = ({bookList: {books, loading, error}}) => {
    return { books, loading, error }
};

const mapDispatchToProps = (dispatch, {bookstoreService}) => {
    return bindActionCreators({
        fetchBooks: fetchBooks(bookstoreService),
        onAddedToCart: bookAddedToCart
    }, dispatch);
};

export default compose(
    withBookstoreService(),
    connect(mapStateToProps, mapDispatchToProps)
)(BookListContainer);

// const mapDispatchToProps = (dispatch, {bookstoreService}) => {
//     return {
//         fetchBooks: () => dispatch(fetchBooks(bookstoreService)()),
//         onAddedToCart: (id) => dispatch(bookAddedToCart(id))
//     };
// };

// const mapDispatchToProps = (dispatch, {bookstoreService}) => {
//     return {
//         fetchBooks: fetchBooks(bookstoreService, dispatch),
//         onAddedToCart: (id) => dispatch(bookAddedToCart(id))
//     };
// };
// const mapDispatchToProps = {
//     booksLoaded,
//     booksRequested,
//     booksError
// };

// const mapDispatchToProps = (dispatch) => {
//     return bindActionCreators({
//         booksLoaded
//     }, dispatch)
// };

// const mapDispatchToProps = (dispatch) => {
//     return {
//         booksLoaded: (newBooks) => {
//             dispatch(booksLoaded(newBooks))
//         }
//     }
// };

// const mapDispatchToProps = (dispatch) => {
//     return {
//         booksLoaded: (newBooks) => {
//             dispatch({
//                 type: 'BOOKS_LOADED',
//                 payload: newBooks
//             })
//         }
//     }
// };