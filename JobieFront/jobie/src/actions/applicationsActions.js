import axios from 'axios';

export const listApplications = ( keyword = '', pageNumber = '') => async (dispatch) => {
    try {
        dispatch({ type: 'APPLICATION_LIST_REQUEST'})

        let user = JSON.parse(sessionStorage.getItem('userInfo'));
        
        let config = {
            headers: { 'Content-Type': 'application/json' },
            params: {
              username: user.username,
            }
        }

        const { data } = await axios.get(`/api/applications?keyword=${keyword}&pageNumber=${pageNumber}`, config);

        dispatch({
            type: 'APPLICATION_LIST_SUCCESS',
            payload: data
        })
    } catch (error) {
        dispatch({
            type: 'APPLICATION_LIST_FAILURE',
            payload: error.response && error.response.data.message
        })
    }
}

export const listApplicationDetails = ( id ) => async (dispatch) => {
    try {
        dispatch({ type: 'APPLICATION_DETAILS_REQUEST'})

        const { data } = await axios.get(`/api/applications/${id}`);

        dispatch({
            type: 'APPLICATION_DETAILS_SUCCESS',
            payload: data
        })
    } catch (error) {
        dispatch({
            type: 'APPLICATION_DETAILS_FAILURE',
            payload: error.response && error.response.data.message
        })
    }
}

export const updateApplication = (application) => async (dispatch, getState) => {
    try {
        dispatch({
            type: 'APPLICATION_UPDATE_REQUEST'
        })

        let user = JSON.parse(sessionStorage.getItem('userInfo'));
        
        let config = {
            headers: { 'Content-Type': 'application/json' },
            params: {
              username: user.username,
            }
        }

        const { data } = await axios.put(`/api/applications/${application._id}`, application, config);

        dispatch({ 
            type: 'APPLICATION_UPDATE_SUCCESS',
            payload: data,
        })       
    } catch ( error) {
        dispatch({
            type: 'APPLICATION_UPDATE_FAILURE',
            payload: 
                error.response && error.response.data.message
                ? error.response.data.message : error. message
        })
    }
}

export const applicationStats = () => async (dispatch) => {
    try {
        dispatch({
            type: 'APPLICATION_STATS_REQUEST'
        })

        let user = JSON.parse(sessionStorage.getItem('userInfo'));
        
        let config = {
            headers: { 'Content-Type': 'application/json' },
            params: {
              username: user.username,
            }
        }
        const { data } = await axios.get('/api/applications/stats', config);

        dispatch({
            type: 'APPLICATION_STATS_SUCCESS',
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: 'APPLICATION_STATS_FAILURE',
            payload: 
                error.response && error.response.data.message
                ? error.response.data.message : error. message
        })
    }
}