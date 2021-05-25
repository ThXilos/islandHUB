import React,{useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from "react-redux"
import {Link} from "react-router-dom"
import { getProfileById } from '../../actions/profile'
import Spinner from "../layout/Spinner";

const Profile = ({
    match, 
    getProfileById,
    profile:{ profile, loading},
    auth}) => {

useEffect(()=>{
    getProfileById(match.params.id);
},[getProfileById])

    return (
        profile === null || loading  
        ?<Spinner />
        :<div>
          <h1>{profile.user.name}</h1>
          <Link to="/profiles">Back</Link>
          {auth.isAuthenticated 
          && !auth.loading
          && auth.user._id === profile.user._id
          && (<Link to="/edit-profile">edit</Link>)}
         </div>
    )
}

Profile.propTypes = {
getProfileById: PropTypes.func.isRequired,
profile: PropTypes.object.isRequired,
auth: PropTypes.object.isRequired
}

const mapStateToProps = state =>({
    profile:state.profile,
    auth: state.auth
})

export default connect(mapStateToProps,{getProfileById})(Profile)
