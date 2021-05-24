import React,{useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from "react-redux"
import Spinner from "../layout/Spinner";
import ProfileItem from "./ProfileItem";
import {getProfiles} from "../../actions/profile";
import { Grid, Paper } from "@material-ui/core";

const Profiles = ({getProfiles, profile:{profiles, loading}}) => {
    useEffect(()=>{
        getProfiles()
    },[getProfiles]);
    
    return (
    loading 
      ? <Grid container justify="center" alignItems="center" style={{marginTop:"450px"}}><Spinner /></Grid>
      : ( <Grid style={{marginTop:"70px"}} container direction="column" justify="center" alignItems="center">
      {loading 
      ? <Grid item container direction="column" justify="flex-end" alignItems="center">
             <Spinner />
         </Grid> 
      :<Grid item container direction="column" justify="flex-end" alignItems="center" spacing={1}>
         {
         profiles.length > 0 
         ?(profiles.map(profile => (<ProfileItem key={profile._id} profile={profile} />)))
         : <Grid item>
           <Paper elevation={15}>
           <p style={{padding:"0"}}>This feels empty...add some experience.</p>
           </Paper>
           </Grid>
         }
       </Grid>
     } 
      </Grid>  )
  )
};

Profiles.propTypes = {
getProfiles: PropTypes.func.isRequired,
profile: PropTypes.object.isRequired
}

const mapStateToProps = state =>({
    profile: state.profile
})

export default connect(mapStateToProps,{getProfiles})(Profiles)
