import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import CourseSetup from "./pages/CourseSetup";
import Dashboard from "./pages/Dashboard";
import { v4 as uuidv4 } from "uuid";

function App() {
  // حالة الطلاب
  const [students, setStudents] = useState([]);
  // أيام الدورة
  const [TrainingDays, setTrainingDays] = useState([]);

  // جلب الأيام من قاعدة البيانات عند أول تحميل
  useEffect(() => {
    fetch("http://localhost/driving-school/api/get_course_days.php")
      .then((res) => res.json())
      .then((data) => {
        if (data.days && data.days.length > 0) setTrainingDays(data.days);
      })
      .catch((err) => console.error("خطأ عند جلب الأيام:", err));
  }, []);

  // جلب الطلاب عند أول تحميل
  useEffect(() => {
    fetch("http://localhost/driving-school/api/get_students.php")
      .then((res) => res.json())
      .then((data) => setStudents(data))
      .catch((err) => console.error("خطأ في جلب الطلاب:", err));
  }, []);

  // إعداد الدورة: توليد الأيام من التاريخ وحفظها في قاعدة البيانات
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

  // حذف الدورة والطلاب
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

  // إضافة طالب جديد
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




  // تغيير حالة الحضور للطلاب
  const handleToggleAttendance = (studentId, day) => {
    // البحث عن الطالب باستخدام studentId
    const student = students.find(s => s.id === studentId);

    if (!student) {
      console.error("الطالب غير موجود");
      return;
    }

    // تحديد حالة الحضور
    const isPresent = student.attendance.includes(day) ? 0 : 1;

    // تحديث الحضور في الواجهة الأمامية مباشرة
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
console.log("إرسال البيانات:", { student_id: studentId, day: day, present: isPresent });

    // إرسال البيانات إلى الخادم
    fetch("http://localhost/driving-school/api/toggle_attendance.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        student_id: studentId, // استخدام ID الطالب الموجود في React
        day: day, // اليوم
        present: isPresent, // الحضور (0 للغياب، 1 للحضور)
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
      {/* إذا لم يتم تحديد الأيام بعد، نعرض CourseSetup */}
      {TrainingDays.length === 0 ? (
        <CourseSetup onSetup={handleSetup} />
      ) : (
        // بعد تحديد الأيام، نعرض Dashboard
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

export default App; // تأكد من أن هذه هي نهاية الكود وتصدير الكومبوننت
  
  
  
  
  
  
  
  
  