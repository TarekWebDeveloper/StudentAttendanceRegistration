
import React from "react";

function StudentRow({ student, TrainingDays, onToggleAttendance }) {
  return (
    <tr>
      <td>{student.name}</td>
      <td>{student.father}</td>
      <td>{student.agent}</td>
      {TrainingDays.map((day) => (
        <td
          key={day}
          style={{
            background: student.attendance.includes(day)
              ? "#4caf50"
              : "#f44336",
            color: "white",
            cursor: "pointer",
          }}
          onClick={() => onToggleAttendance(student.id, day)}
        >
          {day}
        </td>
      ))}
    </tr>
  );
}

export default StudentRow;