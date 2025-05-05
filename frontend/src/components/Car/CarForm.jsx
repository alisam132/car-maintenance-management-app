import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { Link } from "react-router";
import axios from "axios";

const CarForm = (props) => {
  const { carId } = useParams();
  const [formData, setFormData] = useState({
    car_make: "",
    car_model: "",
    car_model_year: "",
    car_type: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (token) {
          const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
          const response = await axios.get(
            `http://127.0.0.1:8000/cars/edit/${carId}`,
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
    if (carId) fetchCar();
    return () => {
      setFormData({
        car_make: "",
        car_model: "",
        car_model_year: "",
        car_type: "",
      });
    };
  }, [carId]);
  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (carId) {
      props.handleUpdateCar(carId, formData);
      navigate(`/cars/${carId}`);
    } else {
      props.handleAddCar(formData);
      navigate(`/cars/`);
    }
  };
  return (
    <main>
      <h1>{carId ? "Edit Car" : "Add New Car"}</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="car_make">Car Make:</label>
        <input
          type="text"
          id="car_make"
          name="car_make"
          value={formData.car_make}
          onChange={handleChange}
        />
        <label htmlFor="car_model">Car Model:</label>
        <input
          type="text"
          id="car_model"
          name="car_model"
          value={formData.car_model}
          onChange={handleChange}
        />
        <label htmlFor="car_model_year">Car Model Year:</label>
        <input
          type="text"
          id="car_model_year"
          name="car_model_year"
          value={formData.car_model_year}
          onChange={handleChange}
        />
        <label htmlFor="car_type">Car Type:</label>
        <select
          id="car_type"
          name="car_type"
          value={formData.car_type}
          onChange={handleChange}
        >
          <option value="">Select Type</option>
          <option value="suv">Suv</option>
          <option value="sed">Sedan</option>
          <option value="pic">Pickup</option>
        </select>
        <button type="submit">{carId ? "Update Car" : "Create Car"}</button>
      </form>
    </main>
  );
};
export default CarForm;
