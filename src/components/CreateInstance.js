import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for toast

function CreateInstance() {
  const [year, setYear] = useState('');
  const [semester, setSemester] = useState('');
  const [courseId, setCourseId] = useState('');
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8080/api/courses');
      setCourses(response.data);
    } catch (error) {
      toast.error('Error fetching courses.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        await axios.post('http://localhost:8080/api/instances', { year, semester, course: { id: courseId } });
        setYear('');
        setSemester('');
        setCourseId('');
        toast.success('Course instance created successfully.');
    } catch (error) {
        if (error.response) {
            // Check if the response has a status code of 500
            if (error.response.status === 500) {
                // Extract error message from the response body
                const errorMessage = error.response.data.error || 'Internal server error. Please try again later.';
                toast.error(errorMessage);
            } else {
                toast.error('Error creating course instance.');
            }
        } else {
            toast.error('Error creating course instance.');
        }
    }
};


  return (
    <div className="container mt-5 mb-5">
      <h2 className="mb-4">Create Course Instance</h2>
      {loading ? (
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Year</label>
            <input 
              type="text" 
              className="form-control" 
              value={year} 
              onChange={(e) => setYear(e.target.value)} 
              required 
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Semester</label>
            <input 
              type="text" 
              className="form-control" 
              value={semester} 
              onChange={(e) => setSemester(e.target.value)} 
              required 
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Course</label>
            <select 
              className="form-select" 
              value={courseId} 
              onChange={(e) => setCourseId(e.target.value)} 
              required
            >
              <option value="">Select Course</option>
              {courses.map(course => (
                <option key={course.id} value={course.id}>{course.title}</option>
              ))}
            </select>
          </div>
          <button type="submit" className="btn btn-primary">Create Instance</button>
          <button onClick={fetchCourses} className="btn btn-primary ms-4">Refresh</button>
        </form>
      )}
      <ToastContainer /> {/* Add ToastContainer to your component */}
    </div>
  );
}

export default CreateInstance;
