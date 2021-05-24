import axios from "axios";
import {Link, Redirect} from "react-router-dom";
import {
    REGISTER_SUCCESS,
     REGISTER_FAIL,
     USER_LOADED,
     AUTH_ERROR,
     LOGIN_SUCCESS,
     LOGIN_FAIL,
     LOG_OUT,
     CLEAR_PROFILE
    } from "./types";
import {setAlert} from "./alert";
import setAuthToken from "../utils/setAuthToken";

//Load User
export const loadUser = () => async dispatch =>{
  if(localStorage.token){
    setAuthToken(localStorage.token);
  }  

  try{
    const res = await axios.get("/api/auth");
    dispatch({
        type: USER_LOADED,
        payload: res.data
    });
  }catch(err){
    dispatch({
        type: AUTH_ERROR
    })
  }
}
 

//Register User
export const register = ({name, email, password}) => async dispatch =>{
const config = {
    headers:{
        "Content-Type":"application/json"
    }
}

const body = JSON.stringify({name, email, password});

try{
console.log("I am also here!")
const res = await axios.post("api/users/",body,config);
dispatch({
    type: REGISTER_SUCCESS,
    payload: res.data
});
dispatch(loadUser());
dispatch(setAlert("You have registered. Please check your email.","success"));
}catch(err){
    console.log(err)
const errors = err.response.data.errors;
if(errors){
    errors.forEach(error => dispatch(setAlert(error.msg,"error")))
}
dispatch({
    type:REGISTER_FAIL
})
}
}

//Login User
export const login = ({email, password}) => async dispatch =>{
    console.log(email +" "+ password )
    const config = {
        headers:{
            "Content-Type":"application/json"
        }
    }
    
    const body = JSON.stringify({email, password});
    
    try{
        console.log(body)
    console.log("I am also here!")
    const res = await axios.post("api/auth/",body,config);
    dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
    });
    dispatch(loadUser());
    }catch(err){
    console.log(err)
    const errors = err.response.data.errors;
    if(errors){
        errors.forEach(error => dispatch(setAlert(error.msg,"warning")))
    }
    dispatch({
        type:LOGIN_FAIL
    })
    }
    };

//Logout / Clear Profile
export const logout = () => dispatch =>{
    dispatch({type:CLEAR_PROFILE})
    dispatch({ type:LOG_OUT});
};