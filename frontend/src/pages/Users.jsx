import React, { useEffect, useState } from "react";
import { Card, Col, Container, Row, Button, Form } from "react-bootstrap";
import {
  FaArrowAltCircleRight,
  FaMinus,
  FaPlus,
  FaAngleUp,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useQuery, useMutation, gql } from "@apollo/client";
import Spinner from "react-bootstrap/Spinner";

// GraphQL queries and mutations
const GET_USERS = gql`
  query GetUsers {
    getusers {
      success
      users {
        id
        email
        username
        password
      }
    }
  }
`;

const ADD_USER = gql`
  mutation AddUser(
    $email: String!
    $password: String!
    $confirm_pass: String!
    $username: String!
    $file: Upload!
  ) {
    addUser(
      email: $email
      password: $password
      confirm_pass: $confirm_pass
      username: $username
      file: $file
    ) {
      success
      message
      user {
        id
      }
      filename
    }
  }
`;

export default function Users() {
  const [adduser, setAddUser] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpass, setConfirmPass] = useState("");
  const [visible, setVisible] = useState(false);
  const [file, setFile] = useState(null);

  const navigate = useNavigate();

  const { loading, error, data, refetch } = useQuery(GET_USERS, {
    notifyOnNetworkStatusChange: true,
    fetchPolicy: "network-only",
  });

  const [addUser] = useMutation(ADD_USER, {
    onCompleted: () => {
      setAddUser(false);
      toast.success("User Added successfully!");
      refetch(); // Refetch the users query to get the updated list
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const topFunction = () => {
    if (
      document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20
    ) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  const handleInsert = async (e) => {
    e.preventDefault();

    if (!username || !email || !password || !confirmpass) {
      toast.error("Enter all fields");
      return;
    }

    if (confirmpass !== password) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      console.log(file);
      await addUser({
        variables: {
          email,
          password,
          confirm_pass: confirmpass,
          username,
          file,
        },
      });
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleClick = (e, element) => {
    e.preventDefault();
    navigate(`/users/${element.id}`, { state: element });
  };

  const handleCreate = (e) => {
    e.preventDefault();
    setAddUser(!adduser);
  };

  const getUsername = (e) => setUsername(e.target.value);
  const getEmail = (e) => setEmail(e.target.value);
  const getPassword = (e) => setPassword(e.target.value);
  const getConfirmPass = (e) => setConfirmPass(e.target.value);

  const getImage = (e) => {
    e.preventDefault();
    setFile(e.target.files[0]);
  };

  useEffect(() => {
    window.addEventListener("scroll", topFunction);
    return () => {
      window.removeEventListener("scroll", topFunction);
    };
  }, []);

  if (loading)
    return (
      <p>
        <Spinner className="m-4" animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </p>
    );
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <Container className="d-flex justify-content-center">
        <Row>
          <Button
            className="mt-4"
            onClick={handleCreate}
            style={{ backgroundColor: "#61B198", borderColor: "#61B198" }}
          >
            {!adduser ? <FaPlus /> : <FaMinus />}
          </Button>

          {adduser && (
            <Card className="mt-2">
              <Form className="p-3" onSubmit={handleInsert}>
                <input
                  type="text"
                  name="prevent_autofill"
                  id="prevent_autofill"
                  style={{ display: "none" }}
                  autoComplete="new-password"
                />
                <input
                  type="password"
                  name="prevent_autofill_password"
                  id="prevent_autofill_password"
                  style={{ display: "none" }}
                  autoComplete="new-password"
                />

                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={getEmail}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicUsername">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="@Username"
                    value={username}
                    onChange={getUsername}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={getPassword}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword2">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmpass}
                    onChange={getConfirmPass}
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

                <Button
                  variant="primary"
                  type="submit"
                  style={{ backgroundColor: "#61B198", borderColor: "#61B198" }}
                >
                  Insert
                </Button>
              </Form>
            </Card>
          )}

          {data.getusers.users.map((element) => (
            <Col md={12} key={element.id}>
              <Card className="mt-2">
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-center">
                    <Card.Text>
                      <span style={{ fontWeight: "bold" }}>User name: </span>{" "}
                      {element.username}
                    </Card.Text>
                    <div>
                      <Button
                        variant="primary"
                        size="sm"
                        className="me-2"
                        onClick={(e) => handleClick(e, element)}
                        style={{
                          backgroundColor: "#61B198",
                          borderColor: "#61B198",
                        }}
                      >
                        <FaArrowAltCircleRight />
                      </Button>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        <button
          style={{ display: visible ? "block" : "none" }}
          className="scroll-to-top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <FaAngleUp />
        </button>
      </Container>
      <ToastContainer position="top-right" />
    </>
  );
}
