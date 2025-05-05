import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';

function SignUp() {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password1: "",
    password2: "",
    first_name: "",
    last_name: "",
  })
  const { username,email, password1, password2, first_name, last_name } = formData;

  const handleChange = (evt) => {
    setMessage('');
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    if(isLoading){
      return
    }

    setIsLoading(true)
    try {
      const response = await axios.post("http://127.0.0.1:8000/auth/signup/", formData)
      console.log(response)
      setMessage("Sign Up Successfully..!")
      navigate('/login')
    } catch (err) {
      setMessage(err.message);
    }
    finally{
      setIsLoading(false)
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h1>Sign Up</h1>
      <p>{message}</p>
      <Form.Group className="mb-3" controlId="username">
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" value={username}
            name='username'
            onChange={handleChange}
            required/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="first_name">
        <Form.Label>First Name</Form.Label>
        <Form.Control type="text" value={first_name}
            name='first_name'
            onChange={handleChange}
            required/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="last_name">
        <Form.Label>Last Name</Form.Label>
        <Form.Control type="text" value={last_name}
            name='last_name'
            onChange={handleChange}
            required/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="email">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" value={email}
            name='email'
            onChange={handleChange}
            required/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="password1">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" value={password1}
            name='password1'
            onChange={handleChange}
            required/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="password2">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control type="password" value={password2}
            name='password2'
            onChange={handleChange}
            required/>
      </Form.Group>
      <Button variant="primary" type="submit">
        Signup
      </Button>
      <p>If you have an account please login</p>
      <Button variant="primary" type="submit" onClick={() => navigate('/login')}>
        Login
      </Button>

    </Form>
  )
}

export default SignUp