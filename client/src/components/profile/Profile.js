import React,{useEffect,useState} from 'react'
import PropTypes from 'prop-types'
import  {connect} from "react-redux";
import {Link} from "react-router-dom"
import {Chip, Grid, Paper, Button, Avatar,Container} from "@material-ui/core";
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import Spinner from "../layout/Spinner";
import {getProfileById, addLike, removeLike} from "../../actions/profile";
import Moment from "react-moment";
 

import "./Profile.css"

const Profile = ({
    addLike, 
    removeLike,
    getProfileById, 
    profile:{profile, loading}, 
    auth,
    match}) => {

useEffect(() => { getProfileById(match.params.id) },[getProfileById,match.params.id])

    return (
        loading ? <Grid container align="center" justify="center" style={{marginTop:"450px"}}><Spinner /></Grid>
        :(
        <Grid container justify="center" align="center" style={{marginTop:"100px"}}>
         <Paper style={{margin:"0 5px",width:"500px"}}>
         <Grid container style={{padding:"10px"}} wrap="nowrap">
            <Avatar style={{width:"40px",height:"40px",top:"5px"}} alt={profile.user.name} src={profile.user.avatar} />
             <Grid  container direction="column" justify="center">
             <span className="nameTitleProfile">{profile.user.name}</span>
             <Moment className="dateStyle" format="DD-MM-YY">{profile.date}</Moment>
             </Grid>
         </Grid>
             <h3 style={{padding:"0 0.5rem",textAlign:"left"}}>{profile.bio}</h3>
             <Grid style={{padding:"5px"}} container direction="row" justify="space-between">
                <Grid>
                <Link style={{textDecoration:"none"}} to="/profiles"><Button size="small" variant="contained" color="primary">back</Button></Link>
                </Grid> 
               {auth.isAuthenticated && !loading && auth.user._id === profile.user._id
               ?(<Grid>
                 <Link to="/edit-profile"style={{textDecoration:"none"}}>
                    <Button size="small" variant="contained" color="secondary">edit</Button>
                 </Link>
                </Grid>)
               :(<Grid>
               <Button size="small" onClick={ e => addLike(profile._id)}>
               {profile.bumps.length}<FavoriteBorderIcon  className="likesCounter" />
               </Button>
               <Button size="small" onClick={ e => removeLike(profile._id)}>
               <FavoriteBorderIcon  className="unlikesCounter" />
               </Button>
                <Link to="/" style={{textDecoration:"none"}}>
                    <Button size="small" variant="contained" color="secondary">contact</Button>
                 </Link>
                </Grid>)}
             </Grid>
         </Paper>
        </Grid>
     
        )
    )
}

Profile.propTypes = {
getProfileById: PropTypes.func.isRequired,
auth: PropTypes.object.isRequired,
profile: PropTypes.object.isRequired,
addLike: PropTypes.func.isRequired, 
removeLike: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
    
})

export default connect(mapStateToProps,{getProfileById,addLike, removeLike})(Profile)
