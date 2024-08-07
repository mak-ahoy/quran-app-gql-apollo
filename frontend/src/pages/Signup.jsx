import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useMutation, gql } from "@apollo/client";

const ADD_USER = gql`
  mutation AddUser($email: String!, $password: String!, $confirm_pass: String!, $username: String!, $file: Upload!) {
    addUser(email: $email, password: $password, confirm_pass: $confirm_pass, username: $username, file: $file ) {
      success
      message
      user {
        id
      }
      filename
    }
  }
`;

function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPass, setConfirmPass] = useState();
  const [username, setUsername] = useState();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const [file, setFile] = useState(null);

  const [addUser] = useMutation(ADD_USER, {
    onCompleted: () => {
      toast.success("User Added successfully!");
      setTimeout(() => {
        navigate("/");
      }, 1000);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleSignup = async (e) => {
    e.preventDefault();

    console.log(file);

    if (!username || !email || !password || !confirmPass) {
      toast.error("Enter all fields");
      return;
    }

    if (emailRegex.test(email)) {
      toast.error("Enter valid email");
      return;
    }

    if (confirmPass !== password) {
      toast.error("Passwords do not match");
      return;
    }

    try {
       await addUser({
        variables: {
          email,
          password,
          confirm_pass: confirmPass,
          username,
          file,
        },
      });
    } catch (error) {
      console.error(error.message);
    }
  };

  const getEmail = (e) => {
    e.preventDefault();

    setEmail(e.target.value);
  };

  const getPassword = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
  };

  const getConfirmPassword = (e) => {
    e.preventDefault();
    setConfirmPass(e.target.value);
  };

  const getUsername = (e) => {
    e.preventDefault();
    setUsername(e.target.value);
  };

  const getImage = (e) => {
    e.preventDefault();
    setFile(e.target.files[0]);
  };

  return (
    <>
      <Container className="mx-auto mt-5 p-4 w-50 bg-light rounded">
        <h3 className="text-center">SIGN UP</h3>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={getEmail}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="@username"
              onChange={getUsername}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={getPassword}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={getConfirmPassword}
            />
          </Form.Group>

          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Upload profile image</Form.Label>
            <Form.Control
              type="file"
              accept="image/png, image/jpeg"
              name="avatar"
              onChange={getImage}
            />
          </Form.Group>

          <div className="d-flex justify-content-center mt-5">
            <Row>
              <Col sm={12} md={12}>
                <Form.Text className="text-muted">
                  <Link to="/" className="link-underline">
                    Already have an account? Login.
                  </Link>
                </Form.Text>
              </Col>

              <Col sm={12} md={12} className="mt-1">
                <Button variant="primary" type="submit" onClick={handleSignup}>
                  Signup
                </Button>
              </Col>
            </Row>
          </div>
        </Form>
      </Container>
      <ToastContainer position="top-right" />
    </>
  );
}

export default Signup;
