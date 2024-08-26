import React, { useState } from 'react';
import axios from 'axios';

function CreateCourse() {
  const [title, setTitle] = useState('');
  const [courseCode, setCourseCode] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8080/api/courses', { title, courseCode, description })
      .then(() => {
        setTitle('');
        setCourseCode('');
        setDescription('');
      })
      .catch(error => console.error('Error creating course:', error));
  };

  return (
    <div className="container mt-5 mb-5">
      <h2 className="mb-4">Create Course</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Title:</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Course Code:</label>
          <input
            type="text"
            className="form-control"
            value={courseCode}
            onChange={(e) => setCourseCode(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description:</label>
          <textarea
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Create Course</button>
      </form>
    </div>
  );
}

export default CreateCourse;
