import React, { useState, useEffect } from 'react';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';
import { fetchMyBooks } from '../api';
import 'bootstrap/dist/css/bootstrap.min.css';

const MyBooks = () => {
    const [books, setBooks] = useState([]);
    const { token } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBooks = async () => {
            const response = await fetchMyBooks(token);
            if (response.status === 401) {
                alert("Invalid credentials");
                navigate("/login");
            } else if (response.status === 200) {
                const data = await response.json();
                setBooks(data);
            } else {
                alert("An error occurred");
            }
        };
        fetchBooks();
    }, [token, navigate]);

    const handleUpdate = (bookId) => {
        navigate(`/update-book/${bookId}`);
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">My Books</h1>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Genre</th>
                        <th>Condition</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {books.length > 0 ? (
                        books.map(book => (
                            <tr key={book.bookId}>
                                <td>{book.title}</td>
                                <td>{book.author}</td>
                                <td>{book.genre}</td>
                                <td>{book.bookCondition}</td>
                                <td>
                                    <button 
                                        className="btn btn-primary btn-sm" 
                                        onClick={() => handleUpdate(book.id)}
                                    >
                                        Update
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="text-center">
                                No books available
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default MyBooks;
