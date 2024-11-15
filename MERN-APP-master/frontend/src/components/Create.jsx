import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import "./Create.css"; // Optional CSS file for additional styles

function Create() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState(0);
  const [error, setError] = useState("");
  const [response, setResponse] = useState("");
  const navigate = useNavigate();

  // Initialize AOS for animations
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    const addUser = { name, email, age };
    const response = await fetch("http://localhost:5000/api/user/createuser", {
      method: "POST",
      body: JSON.stringify(addUser),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();

    if (!response.ok) {
      console.error(result.error);
      setError(result.error);
    } else {
      console.log(result);
      setResponse(result.message);
      setError("");
      setName("");
      setEmail("");
      setAge(0);
      navigate("/userlist");
    }
  };

  return (
    <div className="container my-5 d-flex justify-content-center">
      <div className="p-4 rounded shadow-lg form-container" data-aos="fade-up">
        {error && (
          <div className="alert alert-danger" role="alert" data-aos="fade-down">
            {error}
          </div>
        )}
        {response && (
          <div
            className="alert alert-success"
            role="alert"
            data-aos="fade-down"
          >
            {response}
          </div>
        )}

        <h2 className="text-center mb-4 form-title">Enter the Data</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3" data-aos="fade-right">
            <label className="form-label">Name</label>
            <input
              name="name"
              type="text"
              className="form-control input-animate"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-3" data-aos="fade-right" data-aos-delay="200">
            <label className="form-label">Email Address</label>
            <input
              name="email"
              type="email"
              className="form-control input-animate"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3" data-aos="fade-right" data-aos-delay="400">
            <label className="form-label">Age</label>
            <input
              name="age"
              type="number"
              className="form-control input-animate"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100 btn-animate"
            data-aos="zoom-in"
            data-aos-delay="600"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Create;
