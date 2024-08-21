import React, { useState } from 'react';
import { addBook } from '../api';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';

const BookForm = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [genre, setGenre] = useState('');
    const [bookCondition, setBookCondition] = useState('');
    const navigate = useNavigate();
    const { userId, token } = useAuth();
    const [error, setError] = useState('');

    const validateForm = () => {
        if (title.length > 100) {
            setError('Title cannot exceed 100 characters.');
            return false;
        }
        if (author.length > 50) {
            setError('Author cannot exceed 50 characters.');
            return false;
        }
        if (genre.length > 10) {
            setError('Genre cannot exceed 10 characters.');
            return false;
        }
        setError('');
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        
        const book = { title, author, genre, bookCondition, ownerId: userId };
        try {
            const resp = await addBook(book, token);
            if (resp.status === 401) {
                alert("Invalid credentials");
                navigate("/login");
            } else if (resp.status === 400) {
                alert("Invalid request");
            } else if (resp.status === 201) {
                const data = await resp.json();
                setTitle('');
                setAuthor('');
                setGenre('');
                setBookCondition('');
                alert("Successfully posted the book");
                navigate("/my-posting");
            } else {
                alert("Error posting the book");
            }
        } catch (error) {
            console.error("Error posting book:", error);
            setError('An error occurred while posting the book.');
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Add Book</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title:</label>
                    <input
                        type="text"
                        id="title"
                        className="form-control"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        maxLength="100"
                        required
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
                        maxLength="50"
                        required
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
                        maxLength="10"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="bookCondition" className="form-label">Condition:</label>
                    <select
                        id="bookCondition"
                        className="form-select"
                        value={bookCondition}
                        onChange={(e) => setBookCondition(e.target.value)}
                        required
                    >
                        <option value="">--Select Condition--</option>
                        <option value="NEW">New</option>
                        <option value="LIKE NEW">Like New</option>
                        <option value="USED">Used</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary w-100">Add Book</button>
            </form>
            {error && <div className="alert alert-danger mt-3">{error}</div>}
        </div>
    );
};

export default BookForm;
