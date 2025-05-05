import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';

function Login() {
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",

  })
  const {email, password} = formData

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
      const response = await axios.post("http://127.0.0.1:8000/auth/login/", formData)
      setMessage("login Successfully..!")
      localStorage.setItem("accessToken", response.data.tokens.access)
      localStorage.setItem("refreshToken", response.data.tokens.refresh)
      navigate('/')
    } catch (err) {
      setMessage(err.message);
    }
    finally{
      setIsLoading(false)
    }
  };
  return (
    <Form onSubmit={handleSubmit}>
      <h1>Login</h1>
      <p>{message}</p>
      <Form.Group className="mb-3" controlId="email">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" value={email}
            name='email'
            onChange={handleChange}
            required/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" value={password}
            name='password'
            onChange={handleChange}
            required/>
      </Form.Group>
      <Button variant="primary" type="submit">
        Login
      </Button>
      <p>If you don't have an account please signup</p>
      <Button variant="primary" type="submit" onClick={() => navigate('/signup')}>
        Signup
      </Button>
    </Form>
  )
}

export default Login