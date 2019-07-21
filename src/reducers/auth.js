import * as ROLES from '../constants/roles'

const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    role:null,
    isLoading: true,
    user: null,
    errors: {},
};

const rolesHelper = (category) => {
    if (category == "1"){
        return ROLES.JOBSEEKER
    }
    else if (category == "2"){
        return ROLES.EMPLOYER
    }
    return null
}


export default function auth(state=initialState, action) {

    switch (action.type) {
        case 'USER_LOADING':
            return {...state, isLoading: true};

        case 'USER_LOADED':
            console.log('hello')
            console.log(rolesHelper(action.user.category))
            return {...state, isAuthenticated: true, role: rolesHelper(action.user.category), isLoading: false, user: action.user};

        case 'LOGIN_SUCCESSFUL':
        case 'REGISTRATION_SUCCESSFUL':
            localStorage.setItem("token", action.data.token);
            return {...state, ...action.data, isAuthenticated: true, role: rolesHelper(action.data.user.category), isLoading: false, errors: null};

        case 'AUTHENTICATION_ERROR':
            return{errors:action.data}
        case 'LOGIN_FAILED':
            return{errors:action.data}

        case 'REGISTRATION_FAILED':
        case 'LOGOUT_SUCCESSFUL':
            localStorage.removeItem("token");
            return {...state, errors: action.data, token: null, user: null, role:null,
                isAuthenticated: false, isLoading: false};

        default:
            return state;
    }
}