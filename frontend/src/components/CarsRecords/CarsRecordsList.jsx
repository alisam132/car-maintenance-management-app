import React from 'react'
import { Link } from 'react-router';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';

function CarRecordsList(props) {
  return (
    <main>
        <button><Link to='/'>Back Home</Link></button>
        <button><Link to='/carsrecords/new'>Add Car Maintenance Record</Link></button>
        <h1>Car Maintenance</h1>
        <ListGroup>
            {props.carsRecords.map((cardRecord) => (
            <button>
                <Link key={cardRecord.id} to={`/carsrecords/${cardRecord.id}`}>
                <ListGroup.Item>
                        <h2>{cardRecord.record_name} - {cardRecord.shop_name}</h2>
                </ListGroup.Item>
                </Link>
            </button>
            ))}
        </ListGroup>
    </main>
  )
}

export default CarRecordsList