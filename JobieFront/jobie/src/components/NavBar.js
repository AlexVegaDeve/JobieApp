import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { Container, Navbar, Nav, } from 'react-bootstrap';
import axios from 'axios';

const NavBar = () => {
    const [expanded, setExpanded] = useState(false);
    const history = useHistory();

    const logoutHandler = () => {
        axios.get('/api/v1/users/logout' )
        .catch((error) => {
            console.log(error);
        });
        sessionStorage.clear();   // clear user session from local storage
        localStorage.setItem('message', 'You have been logged out');
        history.push('/login')
        window.location.reload()
    }

    let userSession = JSON.parse(sessionStorage.getItem('userInfo'))
    // console.log(userSession);

        return(
            <div className="nav-cont py-3">
                <Navbar bg="light" expand="lg" fixed="top" className="my6" expanded={expanded} style={{ paddingBottom: 0 }}>
                <Container>                   
                    <NavLink className="navbar-brand" to="/" onClick={() => setExpanded(false)}> Appie </NavLink>                                        
                    <Navbar.Toggle aria-controls="basic-navbar-nav"  onClick={() => setExpanded(expanded ? false : "expanded")}/>
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                    <NavLink to="/" className="nav-link" activeClassName="active" onClick={() => setExpanded(false)}>View Applications </NavLink>
                    {userSession !== null && userSession.isAdmin && <NavLink to="/addProduct" className="nav-link create" activeClassName="active" onClick={() => setExpanded(false)}>Add Application </NavLink>}
                    </Nav>
                        <Nav className="justify-content">
                        {!userSession && <NavLink to="/register" className="nav-link" activeClassName="active" onClick={() => setExpanded(false)}> <i className="fa-solid fa-bars"/> Register </NavLink>}
                        {userSession && <NavLink to="/stats" className="nav-link" activeClassName="active" onClick={() => setExpanded(false)}> <i className="fa-solid fa-bars"/> Statistics </NavLink>}
                        <NavLink disabled to="/login"   className={userSession ? 'nav-link disabled': 'nav-link'} activeClassName="active" onClick={() => setExpanded(false)}><i className={userSession ? '' : 'fas fa-user'}/>{userSession ? `Hello, ${userSession.username}` : 'Login'}</NavLink>
                        {userSession && <Nav.Item onClick={logoutHandler} className="nav-link" >Logout</Nav.Item> }                                                                                             
                    </Nav>
                    </Navbar.Collapse>
                </Container>
                </Navbar>
            </div>
        )
    }

export default NavBar;