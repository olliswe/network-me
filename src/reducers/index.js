import { combineReducers } from 'redux';
import auth from "./auth";
import jobs from "./jobs"


const jobsApp = combineReducers({
    auth,
})

export default jobsApp;