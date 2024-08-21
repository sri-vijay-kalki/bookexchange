import React, { useEffect, useState } from 'react';
import { requestBook, searchBooks } from '../api';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';

const SearchBooks = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [genre, setGenre] = useState('');
    const [books, setBooks] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { token } = useAuth();

    const handleSearch = async (e) => {
        e.preventDefault();
        setError('');
        await handleFetch();
    };

    const handleFetch = async () => {
        let query = '';
        if (title) query += `title=${encodeURIComponent(title)}&`;
        if (author) query += `author=${encodeURIComponent(author)}&`;
        if (genre) query += `genre=${encodeURIComponent(genre)}&`;
    
        // Remove the trailing '&' if present
        query = query ? query.slice(0, -1) : '';
        try {
            const response = await searchBooks(query, token);
            if (response.status === 401) {
                alert("Invalid credentials");
                navigate("/login");
            } else {
                const data = await response.json();
                setBooks(data);
            }
        } catch (error) {
            console.error("Error fetching books:", error);
            setError('An error occurred while fetching books.');
        }
    };

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                await handleFetch();
            } catch (error) {
                console.error(error);
                setError('An error occurred while fetching books.');
            }
        };
        fetchBooks();
    }, [token, navigate]);

    const handleRequestBook = async (book) => {
        try {
            const response = await requestBook(book.bookId, token);
            if (response.status === 401) {
                alert("Invalid credentials");
                navigate("/login");
            } else if (response.status === 400) {
                alert("Invalid request");
            } else {
                // Update the specific book's userRequested attr to true
                setBooks((prevBooks) =>
                    prevBooks.map((b) =>
                        b.bookId === book.bookId ? { ...b, userRequested: true } : b
                    )
                );
            }
        } catch (error) {
            console.error("Error requesting book:", error);
            setError('An error occurred while requesting the book.');
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Search Books</h2>
            <form onSubmit={handleSearch} className="mb-4">
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title:</label>
                    <input
                        type="text"
                        id="title"
                        className="form-control"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="author" className="form-label">Author:</label>
                    <input
                        type="text"
                        id="author"
                        className="form-control"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="genre" className="form-label">Genre:</label>
                    <input
                        type="text"
                        id="genre"
                        className="form-control"
                        value={genre}
                        onChange={(e) => setGenre(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-primary w-100">Search</button>
            </form>
            {error && <div className="alert alert-danger">{error}</div>}
            {books.length === 0 ? (
                <p>No books available for exchange.</p>
            ) : (
                <ul className="list-group">
                    {books.map(book => (
                        <li key={book.bookId} className="list-group-item d-flex justify-content-between align-items-center">
                            <div>
                                <strong>{book.title}</strong> by {book.author} - {book.genre} - {book.bookCondition}
                            </div>
                            {book.userRequested ? (
                                <span className="badge bg-secondary">Requested</span>
                            ) : (
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={() => handleRequestBook(book)}
                                >
                                    Request
                                </button>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SearchBooks;
