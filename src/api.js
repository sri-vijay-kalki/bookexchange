import { Route } from "react-router-dom";

const apiUrl = 'http://localhost:8080';
export const getAllUsers = async () => {
    const response = await fetch(`${apiUrl}/users`);
    return response.json();
};

export const getAllBooks = async () => {
    const response = await fetch(`${apiUrl}/books`);
    return response;
};

export const getAllExchangeRequests = async () => {
    const response = await fetch(`${apiUrl}/exchange-requests`);
    return response.json();
};

export const updateExchangeRequest = async (id, data) => {
    const response = await fetch(`${apiUrl}/exchange-requests/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    return response.json();
};

export const updateUserRole = async (id, data) => {
    const response = await fetch(`${apiUrl}/users/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    return response.json();
};

export const deleteUser = async (id) => {
    const response = await fetch(`${apiUrl}/users/${id}`, {
        method: 'DELETE'
    });
    return response.json();
};

export const addBook = async (book,token) => {
    const response = await fetch(`${apiUrl}/books`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${token}`
        },
        body: JSON.stringify(book)
    });
    return response;
};

export const createExchangeRequest = async (request) => {
    const response = await fetch(`${apiUrl}/exchange-requests`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request)
    });
    return response.json();
};

export const searchBooks = async (query,token) => {
    const response = await fetch(`${apiUrl}/books/search?${query}`,{
        method: 'GET',
        headers: { 
            'Authorization': `Basic ${token}`,
            'Content-Type': 'application/json'
        },
    });
    return response;
};

export const loginUser = async (username, password, role) => {
    const response = await fetch(`${apiUrl}/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password,role })
    });
    return response;
};

export const register = async (user) => {
    const response = await fetch(`${apiUrl}/users/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    });
    return response;
};

export const requestBook = async (bookId,token) => {
    const response = await fetch(`${apiUrl}/exchange-requests`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${token}`
        },
        body: JSON.stringify({ bookId })

    });
    return response;
}

export const getMyRequests = async (userId,token) => {

    const response = await fetch(`${apiUrl}/exchange-requests/by-requester/${userId}`, {
        method : 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${token}`
        }
    });

    return response;
}

export const getRequestsForMe = async(userId,token) => {
    const response = await fetch(`${apiUrl}/exchange-requests/by-owner/${userId}`, {
        method : 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${token}`
        }
    });

    return response;
}
export const updateRequestStatus = async (requestId,status,token) => {

    const response = await fetch(`${apiUrl}/exchange-requests/${requestId}`, {
        method : 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${token}`
        },
        body: JSON.stringify({status})
    });
    return response;

}

export const fetchMyBooks = async(token) => {
    const response = await fetch(`${apiUrl}/books`, {
        method : 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${token}`
        }
    });

    return response;
}

// Fetch book by ID
export const getBookById = async (id, token) => {
    return fetch(`http://localhost:8080/books/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${token}`
        }
    });
};

// Update book
export const updateBook = async (book, token) => {
    return fetch(`http://localhost:8080/books/${book.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${token}`
        },
        body: JSON.stringify(book)
    });
};

export const getAllUsersWithPostCount = async (token) => {
    return fetch(`http://localhost:8080/admin/users`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${token}`
        }
    });
}
export const getAllBookDetails = async (token) => {
    return fetch(`http://localhost:8080/admin/books`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${token}`
        }
    });
}