import { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import StudentList from "./components/StudentList";
import "./App.css";

function App() {
  const [studentList, setStudentList] = useState([]);
  const [studentName, setStudentName] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [studentPhone, setStudentPhone] = useState("");
  const [studentId, setStudentId] = useState("");
  const [showAddStudent, setShowAddStudent] = useState(false);

  useEffect(() => {
    getStudents();
  }, []);

  const getStudents = () => {
    axios
      .get("http://localhost:8000/students")
      .then((response) => {
        setStudentList(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const cleanFields = () => {
    setStudentName("");
    setStudentEmail("");
    setStudentPhone("");
    setStudentId("");
    setShowAddStudent(false);
  };

  const createStudent = (student) => {
    axios
      .post("http://localhost:8000/students", student)
      .then((response) => {
        getStudents();
        alert("Student added successfully");
        cleanFields();
      })
      .catch((error) => {
        console.log(error.message);
        cleanFields();
      });
  };

  const updateStudent = (student) => {
    axios
      .put(`http://127.0.0.1:8000/students/${studentId}`, student)
      .then((response) => {
        getStudents();
        alert(`Student ${response?.data?.name} updated successfully!`);
        cleanFields();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addUpdateStudent = () => {
    const student = {
      student_name: studentName,
      student_email: studentEmail,
      student_phone: studentPhone,
    };
    if (studentId !== "") {
      updateStudent(student);
    } else {
      createStudent(student);
    }
  };

  const showAddComponents = () => {
    setShowAddStudent((currentState) => {
      return !currentState;
    });
  };

  return (
    <div className="container">
      <div
        className="text-center mt-3 list-group-item justify-content-center align-items-center"
        style={{ width: "80vw", backgroundColor: "#ffffff" }}
      >
        <h2 className="card text-white bg-primary pb-2">
          Students Management System
        </h2>
        <h6 className="card text-white bg-primary pb-1">Manage Students</h6>
        <div className="card-body">
          <h5
            className="card text-white bg-dark pb-1"
            onClick={() => {
              showAddComponents();
            }}
          >
            Add student
          </h5>
          {(showAddStudent || studentId) && (
            <span className="card-text">
              <input
                value={studentName}
                className="form-control stud-name"
                placeholder="Type a name"
                onChange={(event) => {
                  setStudentName(event.target.value);
                }}
              ></input>
              <input
                value={studentEmail}
                className="form-control stud-name"
                placeholder="Type an email"
                onChange={(event) => {
                  setStudentEmail(event.target.value);
                }}
              ></input>
              <input
                value={studentPhone}
                className="form-control stud-name"
                placeholder="Type a phone"
                onChange={(event) => {
                  setStudentPhone(event.target.value);
                }}
              ></input>

              <button
                className="btn btn-outline-primary mb-4"
                style={{ fontWeight: "bold" }}
                onClick={addUpdateStudent}
              >
                {`${studentId ? "Update" : "Add"} student`}
              </button>
            </span>
          )}
          <h5 className="card text-white bg-dark pb-1">Students list</h5>
          <div>
            <StudentList
              setStudentName={setStudentName}
              setStudentEmail={setStudentEmail}
              setStudentPhone={setStudentPhone}
              setStudentId={setStudentId}
              studentList={studentList}
              onGetStudents={getStudents}
              onUpdateStudent={addUpdateStudent}
            />
          </div>
        </div>
        <h6 className="card text-dark bg-warning pb-1">
          All rights reserved &copy; 2021
        </h6>
      </div>
    </div>
  );
}

export default App;
