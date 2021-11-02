import React, { useState, useEffect} from 'react';
import { Button, Card, Form, Container } from 'react-bootstrap';
import { useHistory, Link } from "react-router-dom";
import { listApplicationDetails, updateApplication } from '../actions/applicationsActions';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';

const EditApplicationPage = ({ match }) => {  
    const [companyName, setCompanyName] = useState('');
    const [jobTitle, setJobTitle] = useState('');
    const [jobLocation, setJobLocation] = useState('');
    const [dateApplied, setDateApplied] = useState('');
    const [status, setStatus] = useState('');
    const [notes, setNotes] = useState('');

    const history = useHistory();
    const id = match.params.id;

    const dispatch = useDispatch();
    const applicationDetails = useSelector((state) => state.applicationDetails);
    const { loading, error, application } = applicationDetails;

    const applicationEdit = useSelector((state) => state.applicationEdit);
    const { loading: loadingEdit, error: errorEdit, success: successEdit } = applicationEdit;

    useEffect(() => {
        if(successEdit) {
            dispatch({ type: 'APPLICATION_UPDATE_SUCCESS'});
            history.push(`${process.env.REACT_APP_API_ENDPOINT || ''}/application/${id}`);
            window.location.reload()
        } else {        
            if(!application.companyName || application._id !== id){
            dispatch(listApplicationDetails(id))
        }  else {   
            setCompanyName(application.companyName);
            setJobTitle(application.jobTitle);
            setJobLocation(application.jobLocation);
            setDateApplied(application.Date);
            setStatus(application.status);
            setNotes(application.notes);  
            }
        }
        // eslint-disable-next-line
    }, [dispatch, history, id, application, successEdit]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(updateApplication({
            _id: id,
            companyName,
            jobTitle,
            setJobLocation,
            dateApplied,
            status,
            notes
        }))
    }

    const handleRedirect = () => {
        history.push(`/application/${id}`);
    }

    return(
        <Container className="py-5">
            <Card sm={12} md={6} lg={4}>
                <Card.Header>Edit Application</Card.Header>
                {loadingEdit && <Loader />}
                {errorEdit && <Message variant='danger'>{errorEdit}</Message>}
                {loading? (
                    <Loader />
                ): error ? (
                    <Message variant='danger'>{error}</Message>
                ): (
                <Card.Body>
                    <Form onSubmit={submitHandler}>
                    <Form.Group className="mb-3">
                            <Form.Label>Company Name</Form.Label>
                            <Form.Control type="text" 
                            value={companyName}
                            onChange={e => setCompanyName(e.target.value)}/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Job Title</Form.Label>
                            <Form.Control type="text" 
                            value={jobTitle}
                            onChange={e => setJobTitle(e.target.value )}/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Job Location</Form.Label>
                            <Form.Control type="text"  
                            value={jobLocation}
                            onChange={e => setJobLocation(e.target.value )}/>
                        </Form.Group>                        
                        <Form.Group className="mb-3">
                            <Form.Label>Date Applied</Form.Label>
                            <Form.Control type="date"
                            value={dateApplied}
                            onChange={e => setDateApplied( e.target.value )}/>                
                        </Form.Group>
                        <Form.Group controlId='rating'>
                            <Form.Label>Rating</Form.Label>
                            <Form.Control className="mb-3" FormControl as='select' value={status} onChange={(e)=> setStatus(e.target.value)}>
                            <option value='Active'>Active </option>
                            <option value='Interviewing'>Interviewing</option>
                            <option value='Rejected'>Rejected</option>
                            <option value='Accepted'>Accepted</option>   
                        </Form.Control>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Notes</Form.Label>
                            <Form.Control as="textarea" rows={3} 
                            value={notes}
                            onChange={e => setNotes(e.target.value )}/>
                        </Form.Group>

                        <Button type="submit">Edit Application</Button>
                        <Button className="mx-3" onClick={handleRedirect}>Back to application</Button>             
                
                    </Form>  
                </Card.Body>
                )}
            </Card>
        </Container>
    
    )
}

export default EditApplicationPage;