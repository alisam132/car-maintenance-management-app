import React from 'react'
import { Link } from 'react-router';

function CarRecordsList(props) {
  return (
    <main>
        <button><Link to='/'>Back Home</Link></button>
        <button><Link to='/carsrecords/new'>Add Car Maintenance Record</Link></button>
        <h1>Car Maintenance</h1>
        <div>
            {props.carsRecords.map((cardRecord) => (
            <button>
                <Link key={cardRecord.id} to={`/carsrecords/${cardRecord.id}`}>
                    <article>
                        <h2>{cardRecord.record_name} - {cardRecord.shop_name}</h2>
                    </article>
                </Link>
            </button>
            ))}
        </div>
    </main>
  )
}

export default CarRecordsList