import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import CourseSetup from "./pages/CourseSetup";
import Dashboard from "./pages/Dashboard";
import { v4 as uuidv4 } from "uuid";

function App() {

  // Student status
  const [students, setStudents] = useState([]);
  // Course days
  const [TrainingDays, setTrainingDays] = useState([]);
  
// Fetch the days from the database on first load
  useEffect(() => {
    fetch("http://localhost/driving-school/api/get_course_days.php")
      .then((res) => res.json())
      .then((data) => {
        if (data.days && data.days.length > 0) setTrainingDays(data.days);
      })
      .catch((err) => console.error("خطأ عند جلب الأيام:", err));
  }, []);
  
// Bring students on the first load
  useEffect(() => {
    fetch("http://localhost/driving-school/api/get_students.php")
      .then((res) => res.json())
      .then((data) => setStudents(data))
      .catch((err) => console.error("خطأ في جلب الطلاب:", err));
  }, []);
  
// Course setup: Generate days from the date and save them in the database
  const handleSetup = (TrainingDaysArray) => {
    setTrainingDays(TrainingDaysArray);
    setStudents([]);

    fetch("http://localhost/driving-school/api/add_course_days.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ days: TrainingDaysArray }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) console.error("خطأ عند حفظ الأيام:", data.error);
      })
      .catch((err) => console.error("خطأ في الاتصال بالخادم:", err));
  };

// Delete course and students
  const handleDeleteCourse = async () => {
    if (!window.confirm("هل أنت متأكد من حذف الدورة والطلاب؟")) return;

    try {
      const res = await fetch(
        "http://localhost/driving-school/api/delete_course_days.php",
        { method: "POST" }
      );
      const data = await res.json();

      if (data.status === "success") {
        setTrainingDays([]);
        setStudents([]);
      } else {
        alert("حدث خطأ أثناء حذف الدورة");
      }
    } catch (err) {
      console.error(err);
      alert("خطأ في الاتصال بالخادم");
    }
  };
// Add a new student
  const handleAddStudent = (student) => {
    const newStudent = { ...student, id: uuidv4(), attendance: [] };
    setStudents([...students, newStudent]);

    fetch("http://localhost/driving-school/api/add_student.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newStudent),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) console.error("خطأ عند حفظ الطالب:", data.error);
      })
      .catch((err) => console.error("خطأ في الاتصال بالخادم:", err));
  };


// Change student attendance status

  const handleToggleAttendance = (studentId, day) => {
    const student = students.find(s => s.id === studentId);

    if (!student) {
      console.error("الطالب غير موجود");
      return;
    }

    const isPresent = student.attendance.includes(day) ? 0 : 1;

    setStudents(prev =>
      prev.map(s =>
        s.id === studentId
          ? {
              ...s,
              attendance: isPresent
                ? [...s.attendance, day]
                : s.attendance.filter(d => d !== day),
            }
          : s
      )
    );

    fetch("http://localhost/driving-school/api/toggle_attendance.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        student_id: studentId, 
        day: day, 
        //Attendance (0 for absence, 1 for attendance)
        present: isPresent, 
      }),
    })
      .then(res => res.json())
      .then(data => {
        console.log("النتيجة من الخادم:", data);
        if (data.error) {
          console.error("حدث خطأ في التحديث:", data.error);
        }
      })
      .catch(err => console.error("خطأ في الاتصال بالخادم:", err));
  };











  return (
    <div>
      <Header />
      {TrainingDays.length === 0 ? (
        <CourseSetup onSetup={handleSetup} />
      ) : (
        <Dashboard
          students={students}
          TrainingDays={TrainingDays}
          onAddStudent={handleAddStudent}
          onToggleAttendance={handleToggleAttendance}
          onDeleteCourse={handleDeleteCourse}
        />
      )}
    </div>
  );
}

export default App; 
  
  
  
  
  
  
  
  
  
