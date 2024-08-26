import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function InstanceDetails() {
  const { year, semester, id } = useParams();
  const [instance, setInstance] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8080/api/instances/${year}/${semester}/${id}`)
      .then(response => {
        setInstance(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError('Error fetching instance details.');
        setLoading(false);
      });
  }, [year, semester, id]);

  if (loading) return (
    <div className="container text-center mt-5">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <p>Loading...</p>
    </div>
  );

  if (error) return (
    <div className="container mt-5">
      <div className="alert alert-danger" role="alert">
        {error}
      </div>
    </div>
  );

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-header">
          <h5 className="card-title">Course Instance Details</h5>
        </div>
        <div className="card-body">
          <p className="card-text"><strong>Year:</strong> {instance.year}</p>
          <p className="card-text"><strong>Semester:</strong> {instance.semester}</p>
          <p className="card-text"><strong>Course:</strong> {instance.course.title}</p>
        </div>
      </div>
    </div>
  );
}

export default InstanceDetails;
