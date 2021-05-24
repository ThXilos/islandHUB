import axios from "axios";
import {setAlert} from "./alert";
import React, { useEffect} from "react";

import {
    GET_PROFILE,
    PROFILE_ERROR,
    UPDATE_PROFILE,
    ACCOUNT_DELETED,
    CLEAR_PROFILE,
    GET_PROFILES,
    LOADER,
    UPDATE_LIKES
} from "./types";


//Get current user profile



export const getCurrentProfile = () => async dispatch =>{
    dispatch({type: LOADER})
    try{
        const res = await axios.get("api/profile/me");
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
       
    }catch(err){
        console.log(err);
        dispatch({
            type: PROFILE_ERROR,
            payload:{msg:err.response.statusText, status: err.response.status}
        });
    }
};

//Get all profiles
export const getProfiles = () => async dispatch =>{
    dispatch({type: LOADER})
    try{
        const res = await axios.get("api/profile");
        dispatch({
            type: GET_PROFILES,
            payload: res.data
        });
    }catch(err){
        console.log(err);
        dispatch({
            type: PROFILE_ERROR,
            payload:{msg:err.response.statusText, status: err.response.status}
        });
    }
};

//Get profile by id
export const getProfileById = userId => async dispatch =>{
    dispatch({type: LOADER})
        try{
            const res = await axios.get(`/api/profile/user/${userId}`);
            dispatch({
                type: GET_PROFILE,
                payload: res.data
            });
        }catch(err){
            console.log(err);
            dispatch({
                type: PROFILE_ERROR,
                payload:{msg:err.response.statusText, status: err.response.status}
            });
        }
    };


//Create or update profile.
export const createProfile = (formData, history, edit = false) => async dispatch =>{
try{
    const config = {
        headers:{
            "Content-Type":"application/json"
        }
    }
const res = await axios.post("/api/profile",formData, config);
dispatch({
    type: GET_PROFILE,
    payload: res.data
});

dispatch(setAlert(edit ? "Profile Updated" : "Profile Created","success"));

if (edit){
    history.push("/dashboard");
}

}catch(err){
    const errors = err.response.data.errors;
    if(errors){
        errors.forEach(error => dispatch(setAlert(error.msg,"warning")))
    }
    dispatch({
        type: PROFILE_ERROR,
        payload:{msg:err.response.statusText, status: err.response.status}
    });
}
}

//Add Experience

export const addExperience = (formData, history) => async dispatch => {

    try{
        const config = {
            headers:{
                "Content-Type":"application/json"
            }
        }
    const res = await axios.put("/api/profile/experience",formData, config);
    dispatch({
        type: UPDATE_PROFILE,
        payload: res.data
    });
    
    dispatch(setAlert("Experience added","success"));
    history.push("/dashboard");

    }catch(err){
        const errors = err.response.data.errors;
        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg,"warning")))
        }
        dispatch({
            type: PROFILE_ERROR,
            payload:{msg:err.response.statusText, status: err.response.status}
        });
    }
};

//Delete Experience
export const deleteExperience = id => async dispatch =>{
    try{
        const res = await axios.delete(`/api/profile/experience/${id}`);
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });
        dispatch(setAlert("Experience Deleted","warning"));
    }catch(err){
    dispatch({
        type: PROFILE_ERROR,
        payload:{msg:err.response.statusText, status: err.response.status}
        });
    }
};

//Delete account and profile.
export const deleteAccount = () => async dispatch =>{
    if(window.confirm("Are you sure? This can NOT be undone!")){

    }
    try{
        const res = await axios.delete(`/api/profile`);
        dispatch({type: CLEAR_PROFILE});
        dispatch({type: ACCOUNT_DELETED});
        dispatch(setAlert("Your account has been deleted.","warning"));
    }catch(err){
    dispatch({
        type: PROFILE_ERROR,
        payload:{msg:err.response.statusText, status: err.response.status}
        });
    }
};

//Add like
export const addLike = id => async dispatch =>{
        try{
            const res = await axios.put(`/api/profile/bump/${id}`);
            dispatch({
                type: UPDATE_LIKES,
                payload: {id, bumps: res.data}
            });
        }catch(err){
            console.log(err);
            dispatch({
                type: PROFILE_ERROR,
                payload:{msg:err.response.statusText, status: err.response.status}
            });
        }
    };
    export const removeLike = id => async dispatch =>{
        try{
            const res = await axios.put(`/api/profile/unbump/${id}`);
            dispatch({
                type: UPDATE_LIKES,
                payload: {id, bumps: res.data}
            });
        }catch(err){
            console.log(err);
            dispatch({
                type: PROFILE_ERROR,
                payload:{msg:err.response.statusText, status: err.response.status}
            });
        }
    };