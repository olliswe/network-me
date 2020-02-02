import {API} from '../constants/api'


export const loadUser = () => {
  return (dispatch, getState) => {
    dispatch({type: "USER_LOADING"});

    const token = getState().auth.token;
    console.log(token)
    let headers = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers["Authorization"] = `Token ${token}`;
      console.log(headers)

      return fetch(API + "accounts/current_user/", {headers:headers})
          .then(res => {
            console.log(res)
            if (res.status < 500) {
              return res.json().then(data => {
                return {status: res.status, data};
              })
            } else {
              console.log("Server Error!");
              throw res;
            }
          })
          .then(res => {
            if (res.status === 200) {
              dispatch({type: 'USER_LOADED', user: res.data});
              return res.data
            } else if (res.status >= 400 && res.status < 500) {
              dispatch({type: "AUTHENTICATION_ERROR", data: res.data});
              throw res.data;
            }
          })
    }
    else{
      dispatch({type: "NEW_USER"});
    }
    }
  }



  export const updateUser  = (data) => {
  return (dispatch, getState)=>{
    dispatch({type:'UPDATE_USER', data:data})
  }
  }

  export const login = (email, password, next) => {
    return (dispatch, getState) => {
      let headers = {"Content-Type": "application/json"};
      let body = JSON.stringify({'username':email, 'password':password});
      return fetch(API+"api-token-auth/", {headers, body, method: "POST"})
        .then(res => {
          if (res.status < 500) {
            return res.json().then(data => {
              return {status: res.status, data};
            })
          } else {
            console.log("Server Error!");
            throw res;
          }
        })
        .then(res => {
          if (res.status === 200) {
            dispatch({type: 'LOGIN_SUCCESSFUL', data: {...res.data, next:next} });
            return res.data;
          } else if (res.status === 403 || res.status === 401) {
            dispatch({type: "AUTHENTICATION_ERROR", data: res.data});
            throw res.data;
          } else {
            dispatch({type: "LOGIN_FAILED", data: res.data});
            throw res.data;
          }
        })
    }
  }


  export const register = (email, password, first_name, last_name, organization, category, telephone_number, next) => {
    return (dispatch, getState) => {
      let headers = {"Content-Type": "application/json"};
      let body = JSON.stringify({email, password, first_name, last_name, organization, category, telephone_number});
      console.log(body)
      return fetch(API+'accounts/users/', {headers, body, method: "POST"})
        .then(res => {
          if (res.status < 500) {
            return res.json().then(data => {
              return {status: res.status, data};
            })
          } else {
            console.log("Server Error!");
            throw res;
          }
        })  
        .then(res => {
          if (res.status === 200 | res.status === 201) {
            console.log('success!')
            dispatch({type: 'REGISTRATION_SUCCESSFUL', data: {...res.data, next:next} });
            return res.data;
          } else if (res.status === 403 || res.status === 401) {
            dispatch({type: "AUTHENTICATION_ERROR", data: res.data});
            throw res.data;
          } else {
            dispatch({type: "REGISTRATION_FAILED", data: res.data});
            throw res.data;
          }
        })
    }
  }


  export const logout = () => {
    return (dispatch, getState) => {
      console.log('logging out')
      let headers = {"Content-Type": "application/json"};
  
      return fetch(API+"accounts/auth/logout/", {headers, body: "", method: "POST"})
        .then(res => {
          console.log(res)
          if (res.status === 204) {
            return {status: res.status, data: {}};
          } else if (res.status < 500) {
            return res.json().then(data => {
              return {status: res.status, data};
            })
          } else {
            console.log("Server Error!");
            throw res;
          }
        })
        .then(res => {
          if (res.status === 204 || res.status === 200) {
            dispatch({type: 'LOGOUT_SUCCESSFUL'});
            return res.data;
          } else if (res.status === 403 || res.status === 401) {
            dispatch({type: "AUTHENTICATION_ERROR", data: res.data});
            throw res.data;
          }
        })
    }
  }


  export const clear_redirect = () => {
    return (dispatch, getState) => {
      dispatch({type:'REDIRECT_SUCCESSFUL'})
    }
  }

