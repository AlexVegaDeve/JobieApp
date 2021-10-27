import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
        return(
        <div class="row mt-5">
            <div class="col-6 offset-3">
                <h1 className="text-center"> Error </h1>
                <h4 class="alert alert-danger text-center" role="alert">
                    404 - Page not found
                </h4>
                <h4><Link to="/" className="nav-link text-center" activeClassName="active" >Return to Applications </Link></h4>
            </div>
        </div>
        )
    }

export default ErrorPage;