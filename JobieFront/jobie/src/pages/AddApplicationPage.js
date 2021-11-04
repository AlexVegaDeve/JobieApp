import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Button, Card, Form, Container } from 'react-bootstrap';
import { useHistory, Link } from "react-router-dom";


const AddApplicationPage = () => {
    const { register, handleSubmit } = useForm();
    const history = useHistory();

    const onSubmit = (data) => {
        let user = JSON.parse(sessionStorage.getItem('userInfo'));

        let config = {
            headers: { 'Content-Type': 'application/json' },
            params: {
              username: user.username,
            }
        }

        axios.post(`${process.env.REACT_APP_API_ENDPOINT || ''}/api/applications`,{
            companyName: data.companyName,
            jobTitle: data.jobTitle,
            jobLocation: data.jobLocation,
            dateApplied: data.dateApplied,
            status: data.status,
            notes: data.notes,
        }, config).catch((error) => {
            console.log(error)
        })
        history.push('/');
    }
    
    function handleRedirect() {
        history.push('/');
    }
    
    return(
        <Container className="py-5">
            <Card sm={12} md={6} lg={4}>
                <Card.Header>Add Application</Card.Header>
                <Card.Body>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Form.Group className="mb-3">
                            <Form.Label>Company Name</Form.Label>
                            <Form.Control type="text" {...register('companyName', { required: true })}/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Job Title</Form.Label>
                            <Form.Control type="text" {...register('jobTitle', { required: true })}/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Job Location</Form.Label>
                            <Form.Control type="text" {...register('jobLocation', { required: true })}/>
                        </Form.Group>                        
                        <Form.Group className="mb-3">
                            <Form.Label>Date Applied</Form.Label>
                            <Form.Control type="date" {...register('dateApplied', { required: true })}/>                
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Status</Form.Label>
                            <Form.Control type="text" {...register('status', { required: true })}/>                
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Notes</Form.Label>
                            <Form.Control as="textarea" rows={3} {...register('notes', { required: true })}/>
                        </Form.Group>

                        <Button type="submit">Add Application</Button>   
                        <Button className="mx-3" onClick={handleRedirect}>Back to all applications</Button>             
                    </Form>
                    
  
                </Card.Body>
            </Card>
        </Container>
    
    )
}

export default AddApplicationPage;