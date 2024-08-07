import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLazyQuery, gql } from "@apollo/client";
import "../App.css"
import { useAuth } from '../contexts/useAuth';
import { useSelector, useDispatch } from 'react-redux'
import { loginUser } from '../redux/slices/authSlice';


const LOGIN = gql`
  query Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      success
      message
      token
      username
      profile_picture
    }
  }
`;

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isError, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const {login} = useAuth();
    const user = useSelector(state => state)
    const dispatch = useDispatch()





    const [getLogin, { error }] = useLazyQuery(LOGIN, {
        onCompleted: (data) => {
            if (data.login.success) {
                // localStorage.setItem("token", data.login.token);
                // localStorage.setItem("username", data.login.username);
                // localStorage.setItem("profile_img_uri", data.login.profile_picture)

                login({
                    token: data.login.token,
                    username: data.login.username,
                    profile_img_uri: data.login.profile_picture
                })

                dispatch(loginUser({
                    token: data.login.token,
                    username: data.login.username,
                    profile_picture: data.login.profile_picture,
                    success: data.login.success,
                    message: data.login.message
                }))

                setSuccess(true);
                setError(false);
                toast.success(data.login.message);
                setTimeout(() => {
                    navigate('/home');
                }, 2000);
            } else {
                notify();
                console.log(error);
                setSuccess(false);
                setError(true);
            }
        },
        onError: () => {
            notify();
            setSuccess(false);
            setError(true);
        }
    });

    const notify = () => toast.error("Invalid User Credentials");

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            alert("Please enter all fields");
            return;
        }
         getLogin({ variables: { email: email, password: password } });

    }

    const getEmail = (e) => setEmail(e.target.value);
    const getPassword = (e) => setPassword(e.target.value);

    return (
        <>  
     
            <Container className='mx-auto mt-5 p-5 w-75 bg-light rounded' style={{ maxWidth: "390px" }}>
                <h3 className='text-center'>LOGIN</h3>
                {success ? <h5 className='text-center text-success'>SUCCESS!</h5> : null}

                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            onChange={getEmail}
                            className={isError ? 'input-error' : ''}
                        />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            onChange={getPassword}
                            className={isError ? 'input-error' : ''}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Text className="text-muted">
                            <Link to = "/signup" className = "link-underline">
                                    Don't have an account? Signup. 
                            </Link>
                        </Form.Text>
                    </Form.Group>
                    <Button variant="primary" type="submit" className='mt-4' onClick={handleLogin}>
                        Login
                    </Button>
                </Form>
            </Container>

            <ToastContainer position="top-right" />
        </>
    );
}

export default Login;
