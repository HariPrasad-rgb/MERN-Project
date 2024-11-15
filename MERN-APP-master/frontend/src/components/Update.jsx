import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Update() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState(0);
  const [error, setError] = useState("");
  const [response, setResponse] = useState("");
  const [userData, setUserData] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();

  const getUserData = async () => {
    const response = await fetch(
      `http://localhost:5000/api/user/userdetails/${id}`,
      { method: "GET" }
    );
    const result = await response.json();

    if (!response.ok) {
      console.error(result.error);
      setError(result.error);
    }
    if (response.ok) {
      setUserData(result.data);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  useEffect(() => {
    if (userData) {
      setName(userData.name);
      setEmail(userData.email);
      setAge(userData.age);
    }
  }, [userData]);

  const handleEdit = async (event) => {
    event.preventDefault();

    const updateUser = { name, email, age };
    const response = await fetch(
      `http://localhost:5000/api/user/updateuser/${id}`,
      {
        method: "PATCH",
        body: JSON.stringify(updateUser),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const result = await response.json();

    if (!response.ok) {
      setError(result.error);
    }
    if (response.ok) {
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
      <div
        className="p-4 rounded shadow-lg"
        style={{
          maxWidth: "500px",
          width: "100%",
          backgroundColor: "#f8f9fa",
          borderRadius: "10px",
        }}
      >
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}
        {response && (
          <div className="alert alert-success" role="alert">
            {response}
          </div>
        )}

        <h2 className="text-center mb-4" style={{ color: "#495057" }}>
          Edit the Data
        </h2>

        <form onSubmit={handleEdit}>
          <div className="mb-3">
            <label className="form-label" style={{ color: "#495057" }}>
              Name
            </label>
            <input
              name="name"
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{
                border: "1px solid #ced4da",
                borderRadius: "5px",
                padding: "10px",
              }}
            />
          </div>
          <div className="mb-3">
            <label className="form-label" style={{ color: "#495057" }}>
              Email address
            </label>
            <input
              name="email"
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                border: "1px solid #ced4da",
                borderRadius: "5px",
                padding: "10px",
              }}
            />
          </div>
          <div className="mb-3">
            <label className="form-label" style={{ color: "#495057" }}>
              Age
            </label>
            <input
              name="age"
              type="number"
              className="form-control"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              style={{
                border: "1px solid #ced4da",
                borderRadius: "5px",
                padding: "10px",
              }}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100"
            style={{
              backgroundColor: "#007bff",
              borderColor: "#007bff",
              padding: "10px",
              fontSize: "16px",
            }}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Update;
