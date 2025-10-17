import React, { useState, useEffect } from 'react';
import './AdminDashboard.css';

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [editing, setEditing] = useState(null);
  const [editMarks, setEditMarks] = useState('');
  const [editGrade, setEditGrade] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await fetch('/api/marks/students', {
        headers: { Authorization: token },
      });
      const data = await res.json();
      if (res.ok) {
        setUsers(data);
      } else {
        setError(data.message || 'Failed to fetch users');
      }
    } catch (err) {
      setError('Server error');
    }
  };

  const handleEdit = (user) => {
    setEditing(user._id);
    setEditMarks(user.marks);
    setEditGrade(user.grade);
  };

  const handleSave = async (id) => {
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`/api/marks/student/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify({ marks: editMarks, grade: editGrade }),
      });
      if (res.ok) {
        fetchUsers();
        setEditing(null);
      } else {
        setError('Failed to update marks');
      }
    } catch (err) {
      setError('Server error');
    }
  };

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      <div className="manage-section">
        <h3>Manage All Users</h3>
        {users.map((user) => (
          <div key={user._id} className="user-item">
            <span>{user.username} ({user.role})</span>
            {user.role === 'student' && (
              editing === user._id ? (
                <div>
                  <input
                    type="number"
                    value={editMarks}
                    onChange={(e) => setEditMarks(e.target.value)}
                  />
                  <input
                    type="text"
                    value={editGrade}
                    onChange={(e) => setEditGrade(e.target.value)}
                  />
                  <button onClick={() => handleSave(user._id)}>Save</button>
                  <button onClick={() => setEditing(null)}>Cancel</button>
                </div>
              ) : (
                <div>
                  <span>Marks: {user.marks}, Grade: {user.grade}</span>
                  <button onClick={() => handleEdit(user)}>Edit</button>
                </div>
              )
            )}
          </div>
        ))}
      </div>
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default AdminDashboard;
