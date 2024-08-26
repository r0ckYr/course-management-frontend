import React from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
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
          <NavLink
            to="/"
            className={({ isActive }) => 
              isActive ? "btn btn-dark me-2 active-link" : "btn btn-primary me-2"
            }
          >
            Create
          </NavLink>
          <NavLink
            to="/courses"
            className={({ isActive }) => 
              isActive ? "btn btn-dark me-2 active-link" : "btn btn-primary me-2"
            }
          >
            Courses
          </NavLink>
          <NavLink
            to="/instances"
            className={({ isActive }) => 
              isActive ? "btn btn-dark active-link" : "btn btn-primary"
            }
          >
            Instances
          </NavLink>
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
