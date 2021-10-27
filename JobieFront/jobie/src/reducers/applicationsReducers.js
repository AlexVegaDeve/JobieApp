export const applicationListReducer = (state = { applications: [] }, action) => {
    switch(action.type) {
        case 'APPLICATION_LIST_REQUEST':
            return { loading: true, applications: []}
        case 'APPLICATION_LIST_SUCCESS':
            return { loading: false, applications: action.payload.applications, pages: action.payload.pages, page: action.payload.page }
        case 'APPLICATION_LIST_FAILURE':
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const applicationDetailsReducer = (state = { application: {} }, action) => {
    switch(action.type) {
        case 'APPLICATION_DETAILS_REQUEST':
            return { loading: true, ...state }
        case 'APPLICATION_DETAILS_SUCCESS':
            return { loading: false, application: action.payload }
        case 'APPLICATION_DETAILS_FAILURE':
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const applicationEditReducer = (state = { application: {} }, action) => {
    switch(action.type){
        case 'APPLICATION_UPDATE_REQUEST':
            return { loading: true }
        case 'APPLICATION_UPDATE_SUCCESS':
            return { loading: false, success: true, application: action.payload }
        case 'APPLICATION_UPDATE_FAILURE':
            return { loading: false, error: action.payload }
        case 'PRODUCT_UPDATE_RESET': 
            return { product: {} }
        default:
            return state
    }
}

export const applicationStatsReducer = (state = { applicationStatus: { } }, action) => {
    switch(action.type){
        case 'APPLICATION_STATS_REQUEST':
            return {loading : true}
        case 'APPLICATION_STATS_SUCCESS':
            return {loading: false, statsData: action.payload }
        case 'APPLICATION_STATS_FAILURE':
            return {loading: false, error: action.payload }
        default:
            return state
    }
}
