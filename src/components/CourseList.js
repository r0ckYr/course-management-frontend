import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal, Button, Table } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CourseList() {
  const [courses, setCourses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8080/api/courses')
      .then(response => setCourses(response.data))
      .catch(error => console.error('Error fetching courses:', error));
  }, []);

  const deleteCourse = (id) => {
    axios.delete(`http://localhost:8080/api/courses/${id}`)
      .then(() => {
        setCourses(courses.filter(course => course.id !== id));
      })
      .catch(error => {
        let errorMessage = 'An unexpected error occurred while deleting the course.';
        if (error.response && error.response.status === 500) {
          errorMessage = error.response.data.error || errorMessage;
        }
        toast.error(errorMessage, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      });
  };

  const handleShow = (course) => {
    setSelectedCourse(course);
    setShowModal(true);
  };

  const handleClose = () => setShowModal(false);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Course List</h2>

      <table className="table table-hover table-bordered table-striped">
        <thead className="table-primary text-light">
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Course Code</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {courses.map(course => (
            <tr key={course.id}>
              <td>{course.title}</td>
              <td>{course.courseCode}</td>
              <td>
                <Button 
                  onClick={() => handleShow(course)} 
                  className="mx-2 btn btn-dark btn-sm me-2"
                >
                  <i className="fa-solid fa-magnifying-glass"></i>
                </Button>
                <Button 
                  onClick={() => deleteCourse(course.id)} 
                  className="mx-2 btn btn-dark btn-sm"
                >
                  <i className="fas fa-trash-alt"></i>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for Course Details */}
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Course Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedCourse ? (
            <Table striped bordered hover variant="light">
              <tbody>
                <tr>
                  <td><strong>Title:</strong></td>
                  <td>{selectedCourse.title}</td>
                </tr>
                <tr>
                  <td><strong>Course Code:</strong></td>
                  <td>{selectedCourse.courseCode}</td>
                </tr>
                <tr>
                  <td><strong>Description:</strong></td>
                  <td>{selectedCourse.description}</td>
                </tr>
              </tbody>
            </Table>
          ) : (
            <p>Loading...</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Toast Container for Notifications */}
      <ToastContainer />
    </div>
  );
}

export default CourseList;
