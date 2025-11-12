import React, { useState } from "react";
import "../styles/CourseSetup.css"; 

function CourseSetup({ onSetup }) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!startDate || !endDate){
       return alert("اختر تاريخ بداية ونهاية الدورة!");
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (start > end) {
      return alert("تاريخ البداية لا يمكن أن يكون بعد تاريخ النهاية!");
    }

    // توليد الأيام بين التاريخين
    const TrainingDays = [];
    const current = new Date(start);
    while (current <= end) {
      TrainingDays.push(current.toISOString().split("T")[0]); //  in YYYY-MM-DD format
      current.setDate(current.getDate() + 1);
    }

    //Passing the days for the father
    onSetup(TrainingDays);
  };

  return (
    <div>
      <h2 className="Myheder">إعداد الدورة</h2>
      <form onSubmit={handleSubmit} className="course-setup">
        <label>تاريخ بداية الدورة :</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <br></br> 
        <label>تاريخ نهاية الدورة :</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
                <br></br> 

        <button type="submit">ابدأ الدورة</button>
      </form>
    </div>
  );
}

export default CourseSetup;