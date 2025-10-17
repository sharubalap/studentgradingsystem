import React, { useState, useEffect } from 'react';
import './TeacherDashboard.css';

function TeacherDashboard() {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState('');
  const [editing, setEditing] = useState(null);
  const [editMarks, setEditMarks] = useState('');
  const [editGrade, setEditGrade] = useState('');

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await fetch('/api/marks/students', {
        headers: { Authorization: token },
      });
      const data = await res.json();
      if (res.ok) {
        setStudents(data);
      } else {
        setError(data.message || 'Failed to fetch students');
      }
    } catch (err) {
      setError('Server error');
    }
  };

  const handleEdit = (student) => {
    setEditing(student._id);
    setEditMarks(student.marks);
    setEditGrade(student.grade);
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
        fetchStudents();
        setEditing(null);
      } else {
        setError('Failed to update marks');
      }
    } catch (err) {
      setError('Server error');
    }
  };

  return (
    <div className="teacher-dashboard">
      <h2>Teacher Dashboard</h2>
      <div className="update-section">
        <h3>Update Student Marks</h3>
        {students.map((student) => (
          <div key={student._id} className="student-item">
            <span>{student.username}</span>
            {editing === student._id ? (
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
                <button onClick={() => handleSave(student._id)}>Save</button>
                <button onClick={() => setEditing(null)}>Cancel</button>
              </div>
            ) : (
              <div>
                <span>Marks: {student.marks}, Grade: {student.grade}</span>
                <button onClick={() => handleEdit(student)}>Edit</button>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="view-section">
        <h3>All Student Marks</h3>
        <ul>
          {students.map((student) => (
            <li key={student._id}>
              {student.username}: Marks - {student.marks}, Grade - {student.grade}
            </li>
          ))}
        </ul>
      </div>
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default TeacherDashboard;
