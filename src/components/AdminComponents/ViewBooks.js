import React, { useState, useEffect } from 'react';
import { getAllBookDetails } from '../../api';
import { useAuth } from '../../AuthContext';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const ViewBooks = () => {
    const [books, setBooks] = useState([]);
    const {token} = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await getAllBookDetails(token);
                if(response.status == 200){
                    const data = await response.json();
                    setBooks(data);
                }else{
                    alert("some error occured please login again");
                    navigate("/login");
                }
            } catch (error) {
                console.error("Error fetching books:", error);
                navigate("/login");
            }
        };
        fetchBooks();
    }, []);

    return (
        <div className="container mt-5">
            <h2 className="mb-4">View Books</h2>
            {books.length === 0 ? (
                <div className="alert alert-info text-center">
                    <p className="mb-0">No books available.</p>
                </div>
            ) : (
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Owner Name</th>
                            <th>Condition</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.map(book => (
                            <tr key={book.id}>
                                <td>{book.id}</td>
                                <td>{book.title}</td>
                                <td>{book.author}</td>
                                <td>{book.ownerName}</td> 
                                <td>{book.bookCondition}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ViewBooks;
