import { useState, useEffect } from 'react'
import { BrowserRouter, Route, Routes, Navigate} from "react-router-dom"
// import { useNavigate } from 'react-router'
import Login from './components/Login'
import SignUp from './components/SignUp';
import Home from "./components/Home"
import ProtectedRoute from './components/ProtectedRoute'
import CarList from './components/Car/CarList';
import CarsRecordsList from './components/CarsRecords/CarsRecordsList';
import CarsRecordsForm from './components/CarsRecords/CarsRecordsForm';
import CarsRecordsDetails from './components/CarsRecords/CarsRecordsDetails';
import CarForm from './components/Car/CarForm';
import CarDetails from './components/Car/CarDetails';
import axios from 'axios';
import './App.css'


function App() {
  const [cars, setCars] = useState([])
  const [carsRecords, setCarsRecords] = useState([])
  const [trigger, setTrigger] = useState(false)
  // const navigate = useNavigate;

  const handleAddCar = async (formData) => {
    try {
      const token = localStorage.getItem("accessToken")
        if (token){
          const config = {
            headers:{
              "Authorization": `Bearer ${token}`
            }
          }
          const newCar = await axios.post("http://127.0.0.1:8000/cars/new/", formData, config)
          setCars([newCar.data, ...cars]);
          setTrigger(!trigger)
        }
    } catch (error) {
      console.error("Error creating car:", error);
    }
  };

  const handleAddCarsRecords = async (formData) => {
    try {
      const token = localStorage.getItem("accessToken")
        if (token){
          const config = {
            headers:{
              "Authorization": `Bearer ${token}`
            }
          }
          const newCarsRecords = await axios.post("http://127.0.0.1:8000/carsrecords/new/", formData, config)
          setCarsRecords([newCarsRecords.data, ...carsRecords]);
          setTrigger(!trigger)
        }
    } catch (error) {
      console.error("Error creating cars maintenance record:", error);
    }
  };

  const handleDeleteCarsRecords = async (carsRecordsId) => {
    const token = localStorage.getItem("accessToken")
    if (token){
      const config = {
        headers:{
          "Authorization": `Bearer ${token}`
        }
      }
      const deleteCarsRecords = await axios.delete(`http://127.0.0.1:8000/carsrecords/delete/${carsRecordsId}`, config)
      setCarsRecords(carsRecords.filter((carRec) => carRec.id !== deleteCarsRecords.id));
      setTrigger(!trigger)
    }
  };

  const handleDeleteCar = async (carId) => {
    const token = localStorage.getItem("accessToken")
    if (token){
      const config = {
        headers:{
          "Authorization": `Bearer ${token}`
        }
      }
      const deleteCar = await axios.delete(`http://127.0.0.1:8000/cars/delete/${carId}`, config)
      setCars(cars.filter((car) => car.id !== deleteCar.id));
      setTrigger(!trigger)
      // navigate(`/cars/`);
    }
    
  };

  const handleUpdateCar = async (carId, formData) => {
    try {
      const token = localStorage.getItem("accessToken")
        if (token){
          const config = {
            headers:{
              "Authorization": `Bearer ${token}`
            }
          }
          const updatedCar = await axios.put(`http://127.0.0.1:8000/cars/update/${carId}`, formData, config)
          setCars(cars.map((car) => (car.id === updatedCar.id ? updatedCar : car)));
        }
        // return <Navigate to={`/cars/${carId}`}/>
        
      } catch (error) {
        console.error("Error updating car:", error);
      }
  };


  const handleUpdateCarsRecords = async (carsRecordsId, formData) => {
    try {
      const token = localStorage.getItem("accessToken")
        if (token){
          const config = {
            headers:{
              "Authorization": `Bearer ${token}`
            }
          }
          const updatedCarsRecords = await axios.put(`http://127.0.0.1:8000/carsrecords/update/${carsRecordsId}`, formData, config)          
          setCarsRecords(carsRecords.map((CarsRecord) => (CarsRecord.id === updatedCarsRecords.id ? updatedCarsRecords : CarsRecord)));
          setTrigger(!trigger)
        }
        // return <Navigate to={`/cars/${carId}`}/>
      // navigateTo(`/cars/${carId}`);
      } catch (error) {
        console.error("Error updating car:", error);
      }
  };

  function Logout() {
    localStorage.clear()
    return <Navigate to="/login" />
  }

  function SignUpAndLogout() {
    localStorage.clear()
    return <SignUp />
  }

  useEffect(() => {
    const fetchAllCars = async () => {
        const token = localStorage.getItem("accessToken")
        if (token){
          const config = {
            headers:{
              "Authorization": `Bearer ${token}`
            }
          }
          
          const response = await axios.get("http://127.0.0.1:8000/cars/", config)
          if (response) {setCars(response.data);}
          
        }
        else{
          setCars([])
        }
    };

    const fetchAllCarmaintenance = async () => {

      const token = localStorage.getItem("accessToken")
      if (token){
        const config = {
          headers:{
            "Authorization": `Bearer ${token}`
          }
        }
        const response = await axios.get("http://127.0.0.1:8000/carsrecords/", config)
        
        
        if (response) {setCarsRecords(response.data);}
      }
      else{
        setCarsRecords([])
      }
  };
   fetchAllCars()
   fetchAllCarmaintenance()  
  },[trigger]);
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/'
          element={
            <ProtectedRoute>
              <Home/>
            </ProtectedRoute>
          }
        />
        <Route path="/cars/new/" element={<CarForm handleAddCar={handleAddCar}/>} />
        <Route path="/carsrecords/new/" element={<CarsRecordsForm cars={cars} handleAddCarsRecords={handleAddCarsRecords}/>} />
        <Route path='/cars/' element={<CarList cars={cars}/>}/>
        <Route path='/carsrecords/' element={<CarsRecordsList carsRecords={carsRecords}/>}/>
        <Route path="/cars/:carId" element={<CarDetails handleDeleteCar={handleDeleteCar} />} />
        <Route path="/carsrecords/:carsRecordsId/" element={<CarsRecordsDetails handleDeleteCarsRecords={handleDeleteCarsRecords} />} />
        <Route path="/cars/edit/:carId/" element={<CarForm handleUpdateCar={handleUpdateCar}/>} />
        <Route path="/carsrecords/edit/:carsRecordsId/" element={<CarsRecordsForm cars={cars} handleUpdateCarsRecords={handleUpdateCarsRecords}/>} />
        <Route path='/login' element={<Login/>}/>
        <Route path='/logout' element={<Logout/>}/>
        <Route path='/signup' element={<SignUpAndLogout/>}/>
      </Routes>
      
    </BrowserRouter>
  )
}

export default App
