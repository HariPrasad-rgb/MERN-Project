import React, { useEffect, useState } from "react";
import { FaTrashAlt, FaRecycle } from "react-icons/fa";
import "./deletedRecords.css";

const DeletedRecords = () => {
  const [deletedRecords, setDeletedRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchDeletedRecords = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/user/deleted-users"
      );
      const data = await response.json();
      setDeletedRecords(data.data || []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching deleted records:", error);
      setLoading(false);
    }
  };

  const handleRestore = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/user/restore-user/${id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.ok) {
        alert("User restored successfully!");
        fetchDeletedRecords(); // Refresh the list of deleted records
      } else {
        const errorData = await response.json();
        alert(
          `Failed to restore the user: ${errorData.error || "Unknown error"}`
        );
      }
    } catch (error) {
      console.error("Error restoring user:", error);
      alert("An error occurred while restoring the user. Please try again.");
    }
  };

  const handlePermanentDelete = async (id) => {
    // Confirm with the user before permanently deleting the record
    const userConfirmed = window.confirm(
      "Are you sure you want to permanently delete this record? This action cannot be undone."
    );

    if (!userConfirmed) {
      return; // Exit the function if the user cancels
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/user/permanently-delete/${id}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.ok) {
        alert("Record permanently deleted!");
        fetchDeletedRecords(); // Refresh the list of deleted records
      } else {
        const errorData = await response.json();
        alert(
          `Failed to delete the record: ${errorData.error || "Unknown error"}`
        );
      }
    } catch (error) {
      console.error("Error deleting record:", error);
      alert("An error occurred while deleting the record. Please try again.");
    }
  };

  useEffect(() => {
    fetchDeletedRecords();
  }, []);

  const filteredRecords = deletedRecords.filter((record) =>
    record.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return <p>Loading deleted records...</p>;

  return (
    <div className="deleted-records-container mt-4">
      <h2>Deleted Records</h2>
      <input
        type="text"
        placeholder="Search by name..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-input"
      />
      {filteredRecords.length === 0 ? (
        <p>No deleted records found.</p>
      ) : (
        <div className="cards-container">
          {filteredRecords.map((record) => (
            <div className="record-card" key={record._id}>
              <div className="card-content">
                <h3>{record.name}</h3>
                <p>
                  <strong>ID:</strong> {record._id}
                </p>
                <p>
                  <strong>Deleted At:</strong>{" "}
                  {new Date(record.deletedAt).toLocaleString()}
                </p>
              </div>
              <div className="card-actions">
                <button
                  className="restore-btn"
                  onClick={() => handleRestore(record._id)}
                >
                  <FaRecycle /> Restore
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handlePermanentDelete(record._id)}
                >
                  <FaTrashAlt /> Delete Permanently
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DeletedRecords;
