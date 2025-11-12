import React from "react";
import StudentForm from "../components/StudentForm";
import StudentList from "../components/StudentList";

function Dashboard({ students, TrainingDays, onAddStudent, onToggleAttendance ,onDeleteCourse}) {




  return (
    <>
    
    <div>
      <h2>لوحة التحكم للدورة</h2>

      <StudentForm onAddStudent={onAddStudent} />
    
     <StudentList students={students} TrainingDays={TrainingDays} onToggleAttendance={onToggleAttendance} />
    </div>


 

      <button  className="courDelete"  onClick={onDeleteCourse} style={{ background: "red", color: "white" }}>
        حذف الدورة بالكامل
      </button>



        </>

  );
}

export default Dashboard;