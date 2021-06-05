import React,{useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from "react-redux"
import {Link} from "react-router-dom"
import { getProfileById } from '../../actions/profile'
import Spinner from "../layout/Spinner";
import {Grid,Button,Paper,Avatar} from "@material-ui/core"
import Moment from "react-moment";
import {addLike, removeLike} from "../../actions/profile"


import "./Profile.css"

const Profile = ({
    match,
    addLike,
    removeLike,
    getProfileById,
    profile:{ profile, loading},
    auth}) => {

useEffect(()=>{
    getProfileById(match.params.id);
},[getProfileById])

    return (
        profile === null || loading  
        ?<Grid container justify="center" style={{marginTop:"400px"}}><Spinner /></Grid>
        : 
        <Grid container justify="center">
         <Paper style={{width:"500px",marginTop:"100px"}}>
            <Grid container justify="center" direction="column">
            <Grid container style={{margin:"5px"}}>
                <Avatar style={{width:"30px",height:"30px"}}  src={profile.user.avatar} />
                <div>
                <p className="nameTitleProfile">{profile.user.name}<span className="dateStyle">joined</span><Moment format="DD/MM/YY" className="dateStyle">{profile.date}</Moment></p>
                </div>
                
            </Grid>
               
                <Grid container justify="space-between">
                <Link to="/profiles" className="profileButtonStyle">
                    <Button size="small">Back</Button>
                </Link>
                {auth.isAuthenticated 
                    && !auth.loading
                    && auth.user._id === profile.user._id
                    ? (<Link to="/edit-profile" className="profileButtonStyle">
                            <Button size="small">Edit</Button>
                        </Link>)
                    :
                    <Grid>
                    <p>{profile.bumps.length}</p>
                    <Button onClick={(e) => addLike(profile._id)}>Like</Button>
                    <Button onClick={(e) => removeLike(profile._id)}>unlike</Button>
                    </Grid>
                    }
                </Grid>
                
            </Grid> 
          </Paper>
        </Grid>
       
    )
}

Profile.propTypes = {
addLike: PropTypes.func.isRequired,
removeLike: PropTypes.func.isRequired,
getProfileById: PropTypes.func.isRequired,
profile: PropTypes.object.isRequired,
auth: PropTypes.object.isRequired
}

const mapStateToProps = state =>({
    profile:state.profile,
    auth: state.auth
})

export default connect(mapStateToProps,{getProfileById,addLike, removeLike})(Profile)
