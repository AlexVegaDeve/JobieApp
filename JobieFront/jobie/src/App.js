import React, { useState, useEffect} from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Container } from 'react-bootstrap';
import NavBar from './components/NavBar';
import AddApplicationPage from './pages/AddApplicationPage';
import EditApplicationPage from './pages/EditApplicationPage';
import ApplicationsPage  from './pages/ApplicationsPage';
import ApplicationPage from './pages/ApplicationPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ErrorPage from './pages/ErrorPage';
import StatsPage from './pages/StatsPage';

const AppRouter = ()=> {
    const [userState, setUserState] = useState(false)

    useEffect(() => {
        let userSession = JSON.parse(sessionStorage.getItem('userInfo'));
        userSession && setUserState(true);
    }, [userState])

    return (
        <BrowserRouter>
            <div>

            <main className='py-5'>
                <NavBar />
                <Container fluid>
                    <Switch>
                        <Route path="/login" component={LoginPage} exact/>
                        <Route path="/register" component={RegisterPage} exact/>
                        <Route path="/addApplications" component={AddApplicationPage} exact/>
                        <Route path="/editApplication/:id" component={EditApplicationPage} exact/>
                        <Route path="/application/:id" component={ApplicationPage}/>
                        <Route path="/" component={ApplicationsPage} exact/>
                        <Route path="/stats" component={StatsPage} exact/>
                        <Route path="/search/:keyword" component={ApplicationsPage} exact/>
                        <Route path="/page/:pageNumber" component={ApplicationsPage} exact/>
                        <Route path="/search/:keyword/page/:pageNumber" component={ApplicationsPage} exact/>
                        <Route component={ErrorPage}/>
                    </Switch> 
                </Container>
            </main>

            </div>
        </BrowserRouter>    
    )
}

export default AppRouter;