import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getBookById, updateBook } from '../api';
import { useAuth } from '../AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';

const UpdateBookForm = () => {
    const { id } = useParams(); // Get book ID from URL params
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [genre, setGenre] = useState('');
    const [bookCondition, setBookCondition] = useState('');
    const [ownerId, setOwnerId] = useState('');
    const navigate = useNavigate();
    const { userId, token } = useAuth();
    const [error, setError] = useState('');

    // Fetch book details on component mount
    useEffect(() => {
        const fetchBookDetails = async () => {
            const resp = await getBookById(id, token);
            if (resp.status === 200) {
                const data = await resp.json();
                setTitle(data.title);
                setAuthor(data.author);
                setGenre(data.genre);
                setOwnerId(data.ownerId);
                setBookCondition(data.bookCondition);
            } else {
                alert('Error fetching book details');
                navigate('/my-posting');
            }
        };
        fetchBookDetails();
    }, [id, token, navigate]);

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
        
        const updatedBook = { id, title, author, genre, bookCondition, ownerId };
        const resp = await updateBook(updatedBook, token);
        if (resp.status === 401) {
            alert('Invalid credentials');
            navigate('/login');
        } else if (resp.status === 400) {
            alert('Invalid request');
        } else if (resp.status === 200) {
            alert('Successfully updated the book');
            navigate('/my-posting');
        } else {
            alert('Error updating the book');
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Update Book</h2>
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
                        <option value="LIKE_NEW">Like New</option>
                        <option value="USED">Used</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary w-100">Update Book</button>
            </form>
            {error && <div className="alert alert-danger mt-3">{error}</div>}
        </div>
    );
};

export default UpdateBookForm;
