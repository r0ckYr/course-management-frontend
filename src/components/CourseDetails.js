import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function CourseDetails() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8080/api/courses/${id}`)
      .then(response => setCourse(response.data))
      .catch(error => console.error('Error fetching course details:', error));
  }, [id]);

  if (!course) return <div>Loading...</div>;

  return (
    <div>
      <h2>{course.title}</h2>
      <p><strong>Course Code:</strong> {course.courseCode}</p>
      <p><strong>Description:</strong> {course.description}</p>
    </div>
  );
}

export default CourseDetails;
