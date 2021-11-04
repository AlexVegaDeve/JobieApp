import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { applicationStats } from '../actions/applicationsActions';
import { Doughnut } from 'react-chartjs-2';
import { Container } from 'react-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';

const StatsPage = () => {
    const [activeApps, setActiveApps] = useState('');
    const [interviewingApps, setInterviewingApps] = useState('');
    const [rejectedApps, setRejectedApps] = useState('');
    const [acceptedApps, setAcceptedApps] = useState('');
    const [totalApps, setTotalApps] = useState('');

    const dispatch = useDispatch();
    const stats = useSelector((state) => state.applicationStats);
    const { loading, error,  statsData } = stats;

    const chartData = {
        labels: [ 'Active Applications', 'Interviewing', 'Rejected', 'Accepted'],
        datasets: [
            {
                label: '# of applications',
                data: [activeApps, interviewingApps, rejectedApps, acceptedApps],
                backgroundColor: [
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                ],
                borderColor: [
                    'rgba(153, 102, 255, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(75, 192, 192, 1)',
                ],
                borderWidth: 1,
            },
        ]
    }

    useEffect(() => {
        dispatch( applicationStats() );
        if(loading){
            return
        } else if (!statsData){
            return 
        } else {
            setActiveApps(statsData.activeApps);
            setInterviewingApps(statsData.interviewingApps);
            setRejectedApps(statsData.rejectedApps);
            setAcceptedApps(statsData.acceptedApps);
            setTotalApps(statsData.totalApps);   
        }
    }, [dispatch]);

    return (
    <Container>
        { loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
        <>
        <div className='header mt-5'>
          <h1 className='title'>All applications</h1>
          <h3>Total Apps: {totalApps} </h3>
        </div>
        <Container >
            <Doughnut data={chartData} />   
        </Container>
        
        </>
      )}
    </Container>
    )
}

export default StatsPage;