'use client';

import { useState, useEffect } from 'react';

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [changes, setChanges] = useState({});

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/users');
        if (response.ok) {
          const data = await response.json();
          setUsers(data);
          const initialChanges = data.reduce((acc, user) => {
            acc[user.user_id] = user.can_edit;
            return acc;
          }, {});
          setChanges(initialChanges);
        } else {
          console.error('Failed to fetch users');
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleCheckboxChange = (user_id) => {
    setChanges((prevChanges) => ({
      ...prevChanges,
      [user_id]: !prevChanges[user_id]
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/users', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(changes),
      });

      if (response.ok) {
        alert('Users updated successfully');
      } else {
        console.error('Failed to update users');
        alert('Failed to update users');
      }
    } catch (error) {
      console.error('Error updating users:', error);
      alert('Error updating users');
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-12 p-8 bg-gradient-to-r from-violet-100 via-white to-violet-100 shadow-2xl rounded-xl">
      <h1 className="text-4xl font-extrabold mb-10 text-violet-900">Users</h1>
      <ul className="space-y-4">
        {users.map((user) => (
          <li key={user.user_id} className="flex justify-between items-center p-4 border border-gray-300 rounded-lg shadow-md bg-white">
            <div>
              <p className="text-lg font-semibold text-gray-700">User ID: {user.user_id}</p>
              <p className="text-gray-600">Username: {user.username}</p>
            </div>
            <input
              type="checkbox"
              className="w-5 h-5 text-violet-600 border-gray-300 rounded focus:ring-violet-500"
              checked={changes[user.user_id] || false}
              onChange={() => handleCheckboxChange(user.user_id)}
            />
          </li>
        ))}
      </ul>
      <button 
        onClick={handleSubmit} 
        className="mt-8 w-full bg-violet-600 text-white py-3 rounded-lg shadow-lg hover:bg-violet-700 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        Update Users
      </button>
    </div>
  );
}

