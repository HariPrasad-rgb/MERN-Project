import React from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <h3 className="navbar-brand">
          <NavLink to="/" className="nav-link" aria-current="page">
            MERN
          </NavLink>
        </h3>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink
                to="/create"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
                aria-current="page"
              >
                Create Post
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/userlist"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
                aria-current="page"
              >
                All Post
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/deletedRecords"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
                aria-current="page"
              >
                Deleted Records
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
