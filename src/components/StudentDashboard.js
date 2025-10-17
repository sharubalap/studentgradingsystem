import React, { useState, useEffect } from 'react';
import './StudentDashboard.css';

function StudentDashboard() {
  const [marks, setMarks] = useState(0);
  const [grade, setGrade] = useState('N/A');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMarks = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await fetch('/api/marks/student', {
          headers: { Authorization: token },
        });
        const data = await res.json();
        if (res.ok) {
          setMarks(data.marks);
          setGrade(data.grade);
        } else {
          setError(data.message || 'Failed to fetch marks');
        }
      } catch (err) {
        setError('Server error');
      }
    };
    fetchMarks();
  }, []);

  return (
    <div className="student-dashboard">
      <h2>Student Dashboard</h2>
      <div className="marks-display">
        <h3>Your Marks: {marks}</h3>
        <h3>Your Grade: {grade}</h3>
      </div>
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default StudentDashboard;
