import * as ROLES from '../constants/roles'

const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: false,
    role:null,
    isLoading: true,
    user: null,
    errors: {},
    next:null
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

        case 'NEW_USER':
            return {...state, isLoading: false};

        case 'USER_LOADED':
            return {...state, isAuthenticated: true, role: rolesHelper(action.user.category), isLoading: false, user: action.user};

        case 'LOGIN_SUCCESSFUL':
            localStorage.setItem("token", action.data.key);
            return {...state, user:action.data.user, token:action.data.key, isAuthenticated: true, role: rolesHelper(action.data.user.category), isLoading: false, errors: null, next:action.data.next};
        case 'REGISTRATION_SUCCESSFUL':
            localStorage.setItem("token", action.data.key);
            console.log(action.data)
            return {...state, user:action.data.user, token:action.data.key, isAuthenticated: true, role: rolesHelper(action.data.user.category), isLoading: false, errors: null, next:action.data.next};

        case 'AUTHENTICATION_ERROR':
            return{errors:action.data}
        case 'LOGIN_FAILED':
            return{errors:action.data}

        case 'REGISTRATION_FAILED':
        case 'LOGOUT_SUCCESSFUL':
            localStorage.removeItem("token");
            return {...state, errors: action.data, token: null, user: null, role:null,
                isAuthenticated: false, isLoading: false};

        case 'REDIRECT_SUCCESSFUL':
            return {...state, next:null}

        default:
            return state;
    }
}