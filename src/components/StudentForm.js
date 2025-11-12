import React, { useState } from "react";

function StudentForm({ onAddStudent }) {
  const [name, setName] = useState("");
  const [father, setFather] = useState("");
  const [agent, setAgent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !father || !agent) return alert("الرجاء ملء جميع الحقول!");
    onAddStudent({ name, father, agent });
    setName("");
    setFather("");
    setAgent("");
  };

  return (
    <>
    <form onSubmit={handleSubmit} className="student-form">
      <input
        type="text"
        placeholder="اسم الطالب"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="اسم الأب"
        value={father}
        onChange={(e) => setFather(e.target.value)}
      />
      <input
        type="text"
        placeholder=" الكنية"
        value={agent}
        onChange={(e) => setAgent(e.target.value)}
      />
    
     <button className="sub" type="submit">➕ إضافة</button>




      
       
    </form>


</>
  );
}

export default StudentForm;