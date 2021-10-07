import React from "react";
import Student from "./Student";

const StudentList = (props) => {
  return (
    <div>
      <ul>
        {props.studentList.map((item) => (
          <Student
            setStudentName={props.setStudentName}
            setStudentEmail={props.setStudentEmail}
            setStudentPhone={props.setStudentPhone}
            setStudentId={props.setStudentId}
            key={item.id}
            student={item}
            onGetStudents={props.onGetStudents}
            onUpdateStudent={props.onUpdateStudent}
          />
        ))}
      </ul>
    </div>
  );
};

export default StudentList;
