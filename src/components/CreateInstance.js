import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function CreateInstance() {
  const [year, setYear] = useState('');
  const [semester, setSemester] = useState('');
  const [courseId, setCourseId] = useState('');
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get('http://localhost:8080/api/courses');
      setCourses(response.data);
    } catch (error) {
      setError('Error fetching courses.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8080/api/instances', { year, semester, course: { id: courseId } })
      .then(() => {
        setYear('');
        setSemester('');
        setCourseId('');
      })
      .catch(error => console.error('Error creating instance:', error));
  };

  return (
    <div className="container mt-5 mb-5">
      <h2 className="mb-4">Create Course Instance</h2>
      {error && <div className="alert alert-danger" role="alert">{error}</div>}
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
    </div>
  );
}

export default CreateInstance;
