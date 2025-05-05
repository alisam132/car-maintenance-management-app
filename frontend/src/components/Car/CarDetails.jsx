import { useParams, Link } from "react-router";
import { useEffect, useState } from "react"
import axios from "axios";
const CarDetails = (props) => {
  const [car, setCar] = useState(null);
  const { carId } = useParams();
  useEffect(() => {
    const fetchCar = async () => {
      const token = localStorage.getItem("accessToken")
      if (token){
        const config = {
          headers:{
            "Authorization": `Bearer ${token}`
          }
        } 
        const carData = await axios.get(`http://127.0.0.1:8000/cars/edit/${carId}`, config)
        setCar(carData.data);
      }
      
    };
    fetchCar();
  }, [carId]);
  
  return (
    <main>
      {car ? (
        <>

            <div>
            <h1>Car Make:</h1>
            <h2>{car.car_make}</h2>
            </div>

            <div>
            <h1>Car Model:</h1>
            <h2>{car.car_model}</h2>
            </div>

            <div>
            <h1>Car Model Year:</h1>
            <h2>{car.car_model_year}</h2>
            </div>

            <div>
            <h1>Car Type:</h1>
            <h2>{car.car_type}</h2>
            </div>
          <div>
            
            <button> <Link to={`/`}>Back Home</Link></button> 
            <button> <Link to={`/cars/edit/${carId}`}>Edit</Link></button> 
            <button onClick={() => props.handleDeleteCar(carId)}>
            <Link to={`/cars/`} > Delete</Link>
            </button>
            </div>
  
        </>
      ) : (
        <p>Loading...</p>
      )}
    </main>
  );
};

export default CarDetails;
