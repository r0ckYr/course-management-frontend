import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

import CourseList from './components/CourseList';
import CreateCourse from './components/CreateCourse';
import CreateInstance from './components/CreateInstance';
import InstanceList from './components/InstanceList';

function App() {
  return (
    <Router>
      <div className="container mt-4">
        <h1 className="mb-4">Course Management</h1>
        <div className="mb-3">
          <Link to="/" className="btn btn-primary me-2">Create</Link>
          <Link to="/courses" className="btn btn-primary me-2">Courses</Link>
          <Link to="/instances" className="btn btn-primary">Instances</Link>
        </div>
        <Routes>
          <Route path="/" element={
            <div className="row border justify-content-center">
            <div className="col-md-5">
              <div className="p-3 mb-3">
                <CreateCourse />
              </div>
            </div>
            <div className="col-md-5">
              <div className="p-3 mb-3">
                <CreateInstance />
              </div>
            </div>
          </div>
          } />
          <Route path="/courses" element={<CourseList />} />
          <Route path="/instances" element={<InstanceList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
