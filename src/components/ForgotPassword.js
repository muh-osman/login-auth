import { React, useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";

const ForgotPassword = () => {



  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setMessage("");
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage("Please check your inbox to complete the reset");
    } catch {
      setError("Failed to reset password");
    }

    setLoading(false);
  }


  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Reset Password</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {message && <Alert variant="warning">{message}</Alert>}
          <Form onSubmit={handleSubmit}>

            <Form.Group className="mb-2">
              <Form.Label htmlFor="email">Email</Form.Label>
              <Form.Control type="email" id="email" ref={emailRef} required />
            </Form.Group>

            <Button className="w-100" variant="primary" type="submit" disabled={loading}>
              Reset Password
            </Button>

          </Form>
        </Card.Body>
      </Card>

      <div className="w-100 text-center mt-2">
        Remembered password? <Link to="/login">Login</Link>
      </div>
    </>
  );
};

export default ForgotPassword;
