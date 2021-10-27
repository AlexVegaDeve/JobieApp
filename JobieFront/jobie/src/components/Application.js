import React from 'react';
import { Card } from 'react-bootstrap';
import {Link} from 'react-router-dom'

const Application = (props) => {
    return (
    <Link to={`/application/${props.application._id}`} className="card-link" style={{ textDecoration: 'none' }}>
            
        <Card  className={
        props.application.status === 'Rejected' ? 'border-danger d-flex my-3 rounded indexCard' 
        : props.application.status === 'Interviewing' ? 'border-warning d-flex my-3 rounded indexCard'
        : props.application.status === 'Accepted' ? 'border-success d-flex my-3 rounded indexCard' 
        : 'd-flex my-3 rounded indexCard' } style={{ borderWidth: 5 }}>
            
            <Card.Header as='div' className="d-flex flex-column align-items-center justify-content-end zoom">
                <h4>{props.application.companyName}</h4>
            </Card.Header>
            <Card.Body className="d-flex flex-column align-items-center justify-content-end">
                <Card.Title as='div'>
                    <strong>Job Title:</strong> {props.application.jobTitle}
                </Card.Title>
                <Card.Text as='div'>
                <strong>Applied on:</strong> {props.application.dateApplied}
                </Card.Text>

                <Card.Text as='div'>
                <strong>Current Status:</strong> {props.application.status}
                </Card.Text>
            </Card.Body>  
        </Card></Link>
    )
}

export default Application;