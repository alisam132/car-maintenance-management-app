import React from 'react'
import { Link } from 'react-router';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';

function CarList(props) {
  return (
    <main>
        <div>
        <button><Link to='/cars/new'>Add Car</Link></button>
        </div>
        
        <br />
        <div>
            <button><Link to='/'>Back Home</Link></button>

        </div>
        
        <h1>Cars</h1>
        <ListGroup>
            {props.cars.map((car) => (
            <button>
                <Link key={car.id} to={`/cars/${car.id}`}>
                    <ListGroup.Item>
                        <h2>{car.car_make} - {car.car_model}</h2>
                    </ListGroup.Item>
                </Link>
            </button>
            ))}
        </ListGroup>
    </main>
  )
}

export default CarList