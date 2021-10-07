import React from "react";
import axios from "axios";

const Student = (props) => {
  const deleteStudent = (studentId) => {
    axios
      .delete(`http://localhost:8000/students/${studentId}`)
      .then((response) => {
        alert(`Student  ${response.data.name} was deleted successfully!`);
        props.onGetStudents();
      })
      .catch((error) => console.log(error.message));
  };

  const editStudent = (student) => {
    props.setStudentId(student.id);
    props.setStudentName(student.name);
    props.setStudentEmail(student.email);
    props.setStudentPhone(student.phone);
  };

  return (
    <div>
      <p>
        <span className="mx-3 fw-bold">
          {props.student.name} : {props.student.email} : {props.student.phone}
        </span>
        <button
          onClick={() => editStudent(props.student)}
          className="mx-2 btn btn-warning"
        >
          Edit
        </button>
        <button
          onClick={() => deleteStudent(props.student.id)}
          className="btn btn-danger"
        >
          Remove
        </button>
      </p>
    </div>
  );
};

export default Student;
