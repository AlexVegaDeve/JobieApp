import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listApplications } from '../actions/applicationsActions';
import {Container, Row, Col, Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Application from '../components/Application';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import SearchBar from '../components/SearchBar';

const ApplicationsPage = ({ match }) => {
    const keyword = match.params.keyword;
    const pageNumber = match.params.pageNumber || 1;

    const dispatch = useDispatch();

    const applicationList = useSelector(state => state.applicationList);
    const { loading, error, applications, pages, page } = applicationList;

    let user = JSON.parse(sessionStorage.getItem('userInfo'));

    useEffect(() => {
        dispatch(listApplications(keyword, pageNumber))
    }, [dispatch, keyword, pageNumber])

    return (
        <Container  >
            {user &&
                <>
                <h1 className="mt-5">All Applications</h1>
                <SearchBar />
                <Paginate pages={pages} page={page} keyword={keyword ? keyword : ''}/>
                <Col md={3}><Button className='btn btn-light my-3 px-0'><Link to='/addApplications'><h3 className="link">Add Application</h3></Link></Button></Col>
                </>
            }       
            <Row>
            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                <Container>
                    {user && applications ? applications.map((application) => (
                        <Col key={application._id}>
                            <Application application={application} />
                        </Col>
                    )) :
                    <>
                        <h2 className="mt-5">Login to view and add applications</h2>
                        <Link to='/login'>Login</Link>
                    </>
                    }
                </Container>
            )}
            </Row>
            <Paginate pages={pages} page={page} keyword={keyword ? keyword : ''}/>
        </ Container>
    )
}

export default ApplicationsPage;