// frontend/src/components/Survey.js

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css"; // You can style it your way

function Survey() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    studyHours: "",
    preferredTime: "",
    subjects: "",
    stressLevel: "Low",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Survey Data:", formData);
    // You can send this data to backend if needed
    navigate("/dashboard");
  };

  const handleSkip = () => {
    navigate("/dashboard");
  };

  return (
    <div className="survey-container">
      <h2>User Survey</h2>
      <form onSubmit={handleSubmit} className="survey-form">
        <label>How many hours do you study per day?</label>
        <input
          type="number"
          name="studyHours"
          value={formData.studyHours}
          onChange={handleChange}
          placeholder="e.g., 3"
          required
        />

        <label>What’s your preferred study time?</label>
        <input
          type="text"
          name="preferredTime"
          value={formData.preferredTime}
          onChange={handleChange}
          placeholder="e.g., Morning / Night"
          required
        />

        <label>Subjects you find difficult:</label>
        <input
          type="text"
          name="subjects"
          value={formData.subjects}
          onChange={handleChange}
          placeholder="e.g., Maths, Physics"
        />

        <label>Current Stress Level:</label>
        <select
          name="stressLevel"
          value={formData.stressLevel}
          onChange={handleChange}
        >
          <option value="Low">Low</option>
          <option value="Moderate">Moderate</option>
          <option value="High">High</option>
        </select>

        <div className="button-group">
          <button type="submit">Submit Survey</button>
          <button type="button" onClick={handleSkip} className="skip-button">
            Skip
          </button>
        </div>
      </form>
    </div>
  );
}

export default Survey;
