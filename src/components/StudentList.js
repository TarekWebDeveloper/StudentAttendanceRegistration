import React from "react";
import StudentRow from "./StudentRow";
import "../styles/StudentList.css"; 

const numberDays = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];

function StudentList({ students, TrainingDays, onToggleAttendance }) {
  return (
    <table border="1" width="100%" style={{ marginTop: "20px" }}>
      <thead>
        <tr>
    <th>الاسم</th>
          <th>اسم الأب</th>
          <th>الوكيل</th>

          {numberDays.map((day) => (
            <th key={day}>{day}</th>
          ))}
  
        </tr>
      </thead>
      <tbody>
        {students.map((student) => (
          <StudentRow
            key={student.id}
            student={student}
            TrainingDays={TrainingDays}
            onToggleAttendance={onToggleAttendance}
          />
        ))}
      </tbody>
    </table>
  );
}

export default StudentList;