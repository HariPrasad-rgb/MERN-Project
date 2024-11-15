import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Read() {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [history, setHistory] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState("");

  // Fetch user list
  const getData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/user/userlist");
      const result = await response.json();

      if (!response.ok) {
        setError(result.error);
      } else {
        setData(result.data);
        setError("");
      }
    } catch (error) {
      console.error("Error fetching user list:", error);
      setError("Failed to fetch user list.");
    }
  };

  // Delete user
  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/user/deleteuser/${id}`,
        {
          method: "DELETE",
        }
      );
      const result = await response.json();

      if (!response.ok) {
        setError(result.error);
      } else {
        setError("User deleted successfully.");
        setTimeout(() => {
          setError("");
          getData();
        }, 2000);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      setError("Failed to delete user.");
    }
  };

  // Fetch user version history
  const fetchHistory = async (id) => {
    setLoadingHistory(true);
    setSelectedUserId(id);

    try {
      const response = await fetch(
        `http://localhost:5000/api/user/userhistory/${id}`
      );
      const result = await response.json();

      if (response.ok) {
        setHistory(result.data);
        setShowModal(true);
      } else {
        setError(result.error || "Failed to fetch version history.");
      }
    } catch (error) {
      console.error("Error fetching version history:", error);
      setError("Failed to fetch version history.");
    } finally {
      setLoadingHistory(false);
    }
  };

  // Close the modal
  const closeModal = () => {
    setShowModal(false);
    setHistory([]);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="container my-4">
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <h2 className="text-center mb-4 text-white">User List</h2>

      <table className="table table-hover table-bordered">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((user, index) => (
            <tr key={user._id}>
              <th scope="row">{index + 1}</th>
              <td>{user?.name}</td>
              <td>{user?.email}</td>
              <td>{user?.age}</td>
              <td>
                <Link
                  to={`/update/${user?._id}`}
                  className="btn btn-sm btn-primary me-2"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(user?._id)}
                  className="btn btn-sm btn-danger me-2"
                >
                  Delete
                </button>
                <button
                  onClick={() => fetchHistory(user?._id)}
                  className="btn btn-sm btn-info"
                >
                  Versions
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Responsive Modal for Version History */}
      {showModal && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{ backdropFilter: "blur(5px)" }}
        >
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Version History</h5>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={closeModal}
                ></button>
              </div>
              <div
                className="modal-body"
                style={{ maxHeight: "70vh", overflowY: "auto" }}
              >
                {loadingHistory ? (
                  <p>Loading version history...</p>
                ) : history.length === 0 ? (
                  <p>No version history found.</p>
                ) : (
                  history.map((version, index) => (
                    <div key={index} className="card mb-3 shadow-sm">
                      <div className="card-body">
                        <h6 className="card-title text-primary">
                          Version {version.versionNumber}
                        </h6>
                        <ul className="list-group list-group-flush">
                          <li className="list-group-item">
                            <strong>Name:</strong> {version.data.name || "N/A"}
                          </li>
                          <li className="list-group-item">
                            <strong>Email:</strong>{" "}
                            {version.data.email || "N/A"}
                          </li>
                          <li className="list-group-item">
                            <strong>Age:</strong> {version.data.age || "N/A"}
                          </li>
                          <li className="list-group-item">
                            <strong>Deleted At:</strong>{" "}
                            {version.data.deletedAt
                              ? new Date(
                                  version.data.deletedAt
                                ).toLocaleString()
                              : "Not Deleted"}
                          </li>
                          <li className="list-group-item">
                            <strong>Created At:</strong>{" "}
                            {new Date(version.data.createdAt).toLocaleString()}
                          </li>
                          <li className="list-group-item">
                            <strong>Updated At:</strong>{" "}
                            {new Date(version.modifiedAt).toLocaleString()}
                          </li>
                        </ul>
                      </div>
                    </div>
                  ))
                )}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={closeModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Read;
