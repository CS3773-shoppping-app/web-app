'use client';

import { useState, useEffect } from 'react';

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [changes, setChanges] = useState({}); 

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/Api/users');
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
      const response = await fetch('/Api/Users', {
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
    <div>
      <h1>Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.user_id}>
            {user.user_id}: {user.username}
            <input
              type="checkbox"
              checked={changes[user.user_id] || false}
              onChange={() => handleCheckboxChange(user.user_id)}
            />
          </li>
        ))}
      </ul>
      <button onClick={handleSubmit}>Update Users</button>
    </div>
  );
}
