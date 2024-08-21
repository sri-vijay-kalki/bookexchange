import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import AdminDashboard from './components/AdminDashboard';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import BookForm from './components/BookForm';
import SearchBooks from './components/SearchBooks';
import MyRequests from './components/MyRequests';
import RequestsForMe from './components/RequestsForMe';
import MyBooks from './components/MyBooks';
import Logout from './components/Logout';
import UpdateBookForm from './components/UpdateBookForm';
import PrivateRoute from './PrivateRoute';
import { AuthProvider } from './AuthContext';
import HomePage from './components/HomePage';
import DefaultNav from './components/DefaultNav';

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <div>
                    <Routes>
                        <Route path="/" element={<DefaultNav><HomePage /></DefaultNav>} />
                        <Route path="/register" element={<DefaultNav><RegisterForm /></DefaultNav>} />
                        <Route path="/login" element={<DefaultNav><LoginForm /></DefaultNav>} />
                        <Route path="/add-book" element={<PrivateRoute element={<BookForm />} />} />
                        <Route path="/my-posting" element={<PrivateRoute element={<MyBooks />} />} />
                        <Route path="/search-books" element={<PrivateRoute element={<SearchBooks />} />} />
                        <Route path="/my-requests" element={<PrivateRoute element={<MyRequests />} />} />
                        <Route path="/requests-for-me" element={<PrivateRoute element={<RequestsForMe />} />} />
                        <Route path="/update-book/:id" element={<PrivateRoute element={<UpdateBookForm />} />} />
                        <Route path="/logout" element={<Logout />} />
                        <Route path="/admin" element={<AdminDashboard />} />
                    </Routes>
                </div>
            </Router>
        </AuthProvider>
    );
};

export default App;
