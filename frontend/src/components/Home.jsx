import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';

function Home() {
  const [username, setUsername] = useState("")
  const [isLoggedIn, setLoggedIn] = useState(false)
  const navigate = useNavigate();

  useEffect(() => {
    const checkLoggedInUser = async () => {
      try {
        const token = localStorage.getItem("accessToken")
        if (token){
          const config = {
            headers:{
              "Authorization": `Bearer ${token}`
            }
          }
          const response = await axios.get("http://127.0.0.1:8000/auth/user/", config)
          setLoggedIn(true)
          setUsername(response.data.username)
        }
        else{
          setLoggedIn(false)
          setUsername("")
        }
      } catch {
        setLoggedIn(false)
          setUsername("")
      }
    }
    checkLoggedInUser()
  }, [])

  const handleLogout = async () => {
    try{
      const accessToken = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");

      if(accessToken && refreshToken) {
        const config = {
          headers: {
            "Authorization":`Bearer ${accessToken}`
          }
        };
        await axios.post("http://127.0.0.1:8000/auth/logout/", {"refresh":refreshToken}, config)
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        setLoggedIn(false);
        setUsername("");
        navigate("/login/")
      }
    }
    catch(error){
      console.error("Failed to logout", error.response?.data || error.message)
    }
  }

  return (
    <>
      <div>
        
        {isLoggedIn ? (
        <>
        <h2>Hi, {username}.</h2>
        <Button variant="primary" onClick={() => navigate('/cars/')}>
          My Cars
        </Button>
        <Button variant="primary" onClick={() => navigate('/carsrecords/')}>
          My Cars Maintenance Records
        </Button>
        <button onClick={handleLogout}>Logout</button>
        </>
      ):(
          <h2>If you have an account please Login</h2>
        )}
        
      </div>
    </>
    
  )
}

export default Home