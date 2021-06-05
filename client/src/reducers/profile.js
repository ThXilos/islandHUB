
import {
    GET_PROFILE,
    PROFILE_ERROR,
    CLEAR_PROFILE,
    UPDATE_PROFILE,
    GET_PROFILES,
    LOADER,
    UPDATE_LIKES,
    UPDATE_ERROR} from "../actions/types";

const initialState = {
    profile: null,
    profiles: [],
    loading: true,
    error:{}
}

export default function(state = initialState, action){
const {type, payload} = action;

switch(type){
    case GET_PROFILE:
    case UPDATE_PROFILE:
     return{
            ...state,
            profile: payload,
            loading: false
        }
    case GET_PROFILES:
        return{
            ...state,
            profiles: payload,
            loading: false
        }
    case LOADER:
        return{
            ...state,
            loading: true
        }
        case PROFILE_ERROR:
            return{
                ...state,
                error: payload,
                loading: false,
                profile: null
            };

        case CLEAR_PROFILE:
            return{
                ...state,
                profile: null,
                loading: false
            }
        case UPDATE_LIKES:
            return{
                ...state,
                profile: {...state.profile, bumps:payload.bumps} ,
                loading:false
            }
        case UPDATE_ERROR:
            return{
                ...state,
                error: payload
            }
            default:
                return state;
    }
}