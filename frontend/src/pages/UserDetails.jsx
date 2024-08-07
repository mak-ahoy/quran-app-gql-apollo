import React, { useEffect, useState } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useMutation, gql } from "@apollo/client";
import { useAuth } from "../contexts/useAuth";
import { FaUser } from 'react-icons/fa';
import axios from 'axios';



const UPDATE_USER = gql`
  mutation UpdateUser($content: UpdateContent!) {
    updateuser(content: $content) {
      success
      message
      user {
        id
      }
    }
  }
`;

const DELETE_USER = gql`
  mutation DeleteUser($id: ID!) {
    deleteuser(id: $id) {
      success
      message
      user {
        id
      }
    }
  }
`;

export default function UserDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const content = location.state;
  const [edit, setEdit] = useState(false);
  const [userState, setUserState] = useState({ id: content.id });
  const [hover, setHover] = useState(false);
  const { user } = useAuth();
  const [profilePic, setProfilePic] = useState(null);


  const [updateUser] = useMutation(UPDATE_USER, {
    onCompleted: () => {
      toast.success("User updated successfully!");
      setEdit(false);
      // refetch(); // Refetch the users query to get the updated list
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const [deleteUser] = useMutation(DELETE_USER, {
    onCompleted: () => {
      toast.success("User deleted successfully!");
      setEdit(false);
      setTimeout(() => {
        navigate("/users");
      }, 2000);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleEdit = () => {
    edit ? setEdit(false) : setEdit(true);
  };

  const handleDelete = async (e) => {
    try {
      e.preventDefault();
      const confirmation = window.confirm(
        `Are you sure you want to delete user: ${content.username}?`
      );

      if (confirmation) {
        deleteUser({
          variables: { id: userState.id },
        });
      }
    } catch (error) {
      toast.error("Something went wrong.");
    }
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      await updateUser({
        variables: { content: userState },
      });
    } catch (error) {
      toast.error("Something went wrong.");
    }
  };

  const getUsername = (e) => {
    e.preventDefault();
    const { value } = e.target;
    setUserState({ ...userState, username: value });
  };

  const getEmail = (e) => {
    e.preventDefault();
    const { value } = e.target;
    setUserState({ ...userState, email: value });
  };

  const getPassword = (e) => {
    e.preventDefault();
    const { value } = e.target;
    setUserState({ ...userState, password: value });
  };




  const setProfile= async()=>{
    try {
      let para =  user.profile_img_uri
      const response = await axios.get(`http://localhost:9000/api/images/${para}`, { responseType: 'blob' });
      const blob = new Blob([response.data], { type: response.headers['content-type'] });
      const imageUrl = URL.createObjectURL(blob);
      setProfilePic(imageUrl);
    } catch (error) {
      console.error('Error fetching image:', error);
    }
  }
  

   


  useEffect(() => {
    setProfile();
    setUserState({ id: content.id });
  }, [content]); // Ensure useEffect runs when content changes

  return (
    <>
      <Container>
        <Card className="mt-2">
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <Card.Text>
                  <div className="d-flex justify-content-between">
                    <div>Username: {content.username} </div>
                    {/* <div className="mx-4">
                      {profilePic ? (
                        <img
                          src={profilePic}
                          alt="something"
                          className="profile-image rounded-circle"
                          width="40"
                          height="40"
                        />
                      ) : (
                        <div className="profile-pic">
                          <FaUser />
                        </div>
                      )}
                    </div> */}
                  </div>
                </Card.Text>

                <Card.Text>Email: {content.email}</Card.Text>
                <Card.Text className="text-wrap"
                  onMouseLeave={() => {
                    setHover(false);
                  }}
                  onMouseEnter={() => {
                    setHover(true);
                  }}

                  style={{maxWidth:"300px"}}
                >
                  Password: {hover ? content.password : <FaEye />}
                </Card.Text>
              </div>

              <div>
                <Button
                  variant="primary"
                  size="sm"
                  className="me-2"
                  onClick={handleEdit}
                  style={{ backgroundColor: "#61B198", borderColor: "#61B198" }}
                >
                  <FaEdit />
                </Button>
                <Button variant="danger" size="sm" onClick={handleDelete}>
                  <FaTrash />
                </Button>
              </div>
            </div>
          </Card.Body>
        </Card>
        {edit ? (
          <Card className="mt-2">
            <Form className="p-3" autoComplete="off">
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
                  placeholder={content.email}
                  onChange={getEmail}
                  autoComplete="new-email"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={content.username}
                  onChange={getUsername}
                  autoComplete="new-username"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="*****"
                  onChange={getPassword}
                  autoComplete="new-username"
                />
              </Form.Group>

              <Button
                variant="primary"
                type="submit"
                onClick={handleSubmit}
                style={{ backgroundColor: "#61B198", borderColor: "#61B198" }}
              >
                Update
              </Button>
            </Form>
          </Card>
        ) : null}
      </Container>
      <ToastContainer position="top-right" />
    </>
  );
}
