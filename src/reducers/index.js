import { combineReducers } from 'redux';
import auth from "./auth";


const jobsApp = combineReducers({
    auth,
})

export default jobsApp;