import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal, Button, Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function InstanceList() {
  const currentYear = new Date().getFullYear();
  const [instances, setInstances] = useState([]);
  const [year, setYear] = useState(currentYear);
  const [semester, setSemester] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedInstance, setSelectedInstance] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8080/api/instances/${year}/${semester}`)
      .then(response => setInstances(response.data))
      .catch(error => console.error('Error fetching instances:', error));
  }, [year, semester]);

  const deleteInstance = (id) => {
    axios.delete(`http://localhost:8080/api/instances/${year}/${semester}/${id}`)
      .then(() => setInstances(instances.filter(instance => instance.id !== id)))
      .catch(error => console.error('Error deleting instance:', error));
  };

  const handleShow = (instance) => {
    setSelectedInstance(instance);
    setShowModal(true);
  };

  const handleClose = () => setShowModal(false);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Instance List</h2>
      <div className="mb-4">
        <label className="me-2">Year:</label>
        <select value={year} onChange={(e) => setYear(e.target.value)} className="form-select d-inline w-auto">
          {Array.from({ length: 100 }, (_, index) => currentYear - index).map(y => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>
        <label className="ms-4 me-2">Semester:</label>
        <select value={semester} onChange={(e) => setSemester(Number(e.target.value))} className="form-select d-inline w-auto">
          {Array.from({ length: 12 }, (_, index) => index + 1).map(s => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>
      <table className="table table-hover table-bordered table-striped">
        <thead className="table-primary">
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Year-Sem</th>
            <th scope="col">Code</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {instances.map(instance => (
            <tr key={instance.id}>
              <td>{instance.course.title}</td>
              <td>{instance.year}-{instance.semester}</td>
              <td>{instance.course.courseCode}</td>
              <td>
                <Button 
                  onClick={() => handleShow(instance)} 
                  className="mx-2 btn btn-dark btn-sm me-2"
                >
                  <i className="fa-solid fa-magnifying-glass"></i>
                </Button>
                <Button 
                  onClick={() => deleteInstance(instance.id)} 
                  className="mx-2 btn btn-dark btn-sm"
                >
                  <i className="fas fa-trash-alt"></i>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for Instance Details */}
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Instance Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedInstance ? (
            <Table striped bordered hover variant="light">
              <tbody>
                <tr>
                  <td><strong>Title:</strong></td>
                  <td>{selectedInstance.course.title}</td>
                </tr>
                <tr>
                  <td><strong>Course Code:</strong></td>
                  <td>{selectedInstance.course.courseCode}</td>
                </tr>
                <tr>
                  <td><strong>Description:</strong></td>
                  <td>{selectedInstance.course.description}</td>
                </tr>
                <tr>
                  <td><strong>Semester:</strong></td>
                  <td>{selectedInstance.semester}</td>
                </tr>
                <tr>
                  <td><strong>Year:</strong></td>
                  <td>{selectedInstance.year}</td>
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
    </div>
  );
}

export default InstanceList;
