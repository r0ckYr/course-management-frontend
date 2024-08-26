import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for toast

function CreateCourse() {
  const [title, setTitle] = useState('');
  const [courseCode, setCourseCode] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/courses', { title, courseCode, description });
      // Clear form fields on success
      setTitle('');
      setCourseCode('');
      setDescription('');
      // Show success toast
      toast.success('Course created successfully.');
    } catch (error) {
      if (error.response) {
        // Check if the response has a status code of 500
        if (error.response.status === 500) {
          // Extract error message from the response body
          const errorMessage = error.response.data.error || 'Internal server error. Please try again later.';
          toast.error(errorMessage);
        } else {
          toast.error('Error creating course.');
        }
      } else {
        toast.error('Error creating course.');
      }
    }
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
      <ToastContainer /> {/* Add ToastContainer to your component */}
    </div>
  );
}

export default CreateCourse;
