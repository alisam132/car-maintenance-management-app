import { useParams, Link } from "react-router";
import { useEffect, useState } from "react"
import axios from "axios";


function CarsRecordsDetails(props) {

  const [carsRecord, setCarsRecord] = useState(null);
  const { carsRecordsId } = useParams();
  const [selectedCar, setSelectedCar] = useState(null);

  useEffect(() => {
    const fetchCarsRecords = async () => {
      const token = localStorage.getItem("accessToken")
      if (token){
        const config = {
          headers:{
            "Authorization": `Bearer ${token}`
          }
        } 
        const carData = await axios.get(`http://127.0.0.1:8000/carsrecords/edit/${carsRecordsId}`, config)
        const carID = carData.data.car_id        
        const selectedCar = await axios.get(`http://127.0.0.1:8000/cars/edit/${carID}`, config)
        
        setCarsRecord(carData.data);
        setSelectedCar(selectedCar.data)
      }
      
    };
    fetchCarsRecords();
  }, [carsRecordsId]);
  
  return (
    <main>
      {carsRecord ? (
        <>

            <div>
            <h1>Car Record Name:</h1>
            <h2>{carsRecord.record_name}</h2>
            </div>

            <div>
            <h1>Date:</h1>
            <h2>{carsRecord.issue_date}</h2>
            </div>

            <div>
            <h1>Amount:</h1>
            <h2>{carsRecord.amount}</h2>
            </div>

            <div>
            <h1>Shop Name:</h1>
            <h2>{carsRecord.shop_name}</h2>
            </div>

            <div>
            <h1>Car:</h1>
            <h2>{selectedCar.car_model}- {selectedCar.car_make}</h2>
            </div>
          <div>
            
            <button> <Link to={`/`}>Back Home</Link></button> 
            <button> <Link to={`/carsrecords/edit/${carsRecordsId}`}>Edit</Link></button> 
            <button onClick={() => props.handleDeleteCarsRecords(carsRecordsId)}>
            <Link to={`/carsrecords/`} > Delete</Link>
            </button>
            </div>
  
        </>
      ) : (
        <p>Loading...</p>
      )}
    </main>
  )
}

export default CarsRecordsDetails