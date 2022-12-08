import React, { useState } from "react";
import { Card, Alert, Button } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    setError("");
    try {
      await logout();
      navigate("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <strong>Hello:</strong> {currentUser && currentUser.email}
          <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
            Edit Account
          </Link>
          <div className="w-100 text-center mt-2">
            <Button className="w-100 btn btn-primary" onClick={handleLogout}>
              Log Out
            </Button>
          </div>
        </Card.Body>
      </Card>
    </>
  );
}
