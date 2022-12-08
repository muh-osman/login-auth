import { React, useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Button, Card, Form, Alert } from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Login = () => {


  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const redirectPath = location.state?.path || "/";

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      navigate(redirectPath, {replace: true});
    } catch {
      setError("Failed to login");
    }

    setLoading(false);
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Login</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-2">
              <Form.Label htmlFor="email">Email</Form.Label>
              <Form.Control type="email" id="email" required ref={emailRef} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label htmlFor="password">Password</Form.Label>
              <Form.Control type="password" id="password" required ref={passwordRef}/>
            </Form.Group>

            <Button className="w-100" variant="primary" type="submit" disabled={loading}>
              Login
            </Button>
          </Form>

          <div className="w100 text-center mt-3">
            <Link to="/forgot-password">Forgot password</Link>
          </div>
        </Card.Body>
      </Card>

      <div className="w-100 text-center mt-2">
        Or create new account? <Link to="/signup">SignUp</Link>
      </div>
    </>
  );
};

export default Login;
