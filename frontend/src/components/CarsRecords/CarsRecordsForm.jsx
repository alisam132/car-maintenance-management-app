import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";

function CarsRecordsForm(props) {    
    const { carsRecordsId } = useParams();
    const [formData, setFormData] = useState({
    record_name: "",
    issue_date: "",
    amount: "",
    shop_name: "",
    car_id: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCarRecord = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (token) {
          const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
          const response = await axios.get(
            `http://127.0.0.1:8000/carsrecords/edit/${carsRecordsId}`,
            config
          );
          setFormData(response.data);
        } else {
          setFormData(formData);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (carsRecordsId) fetchCarRecord();
    return () => {
      setFormData({
        record_name: "",
        issue_date: "",
        amount: "",
        shop_name: "",
        car_id: "",
      });
    };
  }, [carsRecordsId]);
  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (carsRecordsId) {
      props.handleUpdateCarsRecords(carsRecordsId, formData);
      navigate(`/carsrecords/${carsRecordsId}`);
    } else {
      props.handleAddCarsRecords(formData);
      navigate(`/carsrecords/`);
    }
  };
    
  return (
    <main>
      <h1>{carsRecordsId ? "Edit Car Record" : "Add New Car Record"}</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="record_name">Record No.:</label>
        <input
          type="text"
          id="record_name"
          name="record_name"
          value={formData.record_name}
          onChange={handleChange}
        />
        <label htmlFor="issue_date">Date:</label>
        <input
          type="date"
          id="issue_date"
          name="issue_date"
          value={formData.issue_date}
          onChange={handleChange}
        />
        <label htmlFor="amount">Amount:</label>
        <input
          type="number"
          id="amount"
          name="amount"
          min="0" 
          max="1000"
          step="0.01"
          value={formData.amount}
          onChange={handleChange}
        />
        <label htmlFor="shop_name">Shop Name:</label>
        <input
          type="text"
          id="shop_name"
          name="shop_name"
          value={formData.shop_name}
          onChange={handleChange}
        />
          <label htmlFor="car_id">Car:</label>
          <select
            id="car_id"
            name="car_id"
            value={formData.car_id}
            onChange={handleChange}
          >
       <option value="">Select Car</option>

            {props.cars.map((car) =>(

              <option key={car.id} value={car.id}>{car.car_model} - {car.car_make}</option>

            ))}
          </select>
        <button type="submit">{carsRecordsId ? "Update Car Record" : "Create Car Record"}</button>
      </form>
    </main>
  )
}

export default CarsRecordsForm