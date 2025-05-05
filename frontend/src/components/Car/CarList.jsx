import React from 'react'
import { Link } from 'react-router';

function CarList(props) {
  return (
    <main>
        <button><Link to='/cars/new'>Add Car</Link></button>
        <button><Link to='/'>Back Home</Link></button>
        <h1>Cars</h1>
        <div>
            {props.cars.map((car) => (
            <button>
                <Link key={car.id} to={`/cars/${car.id}`}>
                    <article>
                        <h2>{car.car_make} - {car.car_model}</h2>
                    </article>
                </Link>
            </button>
            ))}
        </div>
    </main>
  )
}

export default CarList