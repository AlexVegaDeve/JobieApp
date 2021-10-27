import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { listApplicationDetails } from '../actions/applicationsActions';
import {Container, Row, Col, ListGroup, ListGroupItem, Modal, Button} from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import Loader from '../components/Loader';
import Message from '../components/Message';


const ApplicationPage = ({ match }) => {
    const [show, setShow ] =useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const id = match.params.id;
    const dispatch = useDispatch();
    const history = useHistory();

    const applicationDetails = useSelector(state => state.applicationDetails);
    const { application, loading, error } = applicationDetails;

    useEffect(() => {
        dispatch(listApplicationDetails(id))
    }, [match, dispatch])

    const handleDelete = () => {
        axios.delete(`/api/applications/${id}`);
        history.push('/');
    }

    function handleEdit(){
        history.push(`/editApplication/${id}`)
    }

    return (
        <Container  >
            <h1 className="mt-5">Application Details</h1>            
            <Row>
                <Col md={3}><Link className='btn btn-light my-3' to='/'>Back to all applications</Link></Col>
                <Col md={3}><Button className='btn btn-light my-3' onClick={handleShow}>Delete Application</Button></Col>
                <Col md={3}><Button className='btn btn-light my-3' onClick={handleEdit}>Edit Application</Button></Col>
            </Row>
            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>

                <Modal.Header closeButton>
                    <Modal.Title>Delete</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>Are you sure you want to delete this item?</p>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                    <Button onClick={handleDelete} variant="danger">Delete item</Button>
                </Modal.Footer>

            </Modal>

            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                <ListGroup>
                    <ListGroupItem>
                        <h3>Company:</h3> <p>{application.companyName}</p>
                    </ListGroupItem>
                    <ListGroupItem>
                        <h3>Position:</h3> <p>{application.jobTitle}</p>
                    </ListGroupItem>
                    <ListGroupItem>
                        <h3>Location:</h3> <p>{application.jobLocation}</p>
                    </ListGroupItem>
                    <ListGroupItem>
                        <h3>Application status:</h3> <p>{application.status}</p>
                    </ListGroupItem>
                    <ListGroupItem>
                        <h3>Date applied: </h3><p>{application.dateApplied}</p>
                    </ListGroupItem>
                    <ListGroupItem>
                        <h3>Notes: </h3><p>{application.notes}</p>
                    </ListGroupItem>
                </ListGroup>
            )}

        </ Container>
    )
}

export default ApplicationPage;