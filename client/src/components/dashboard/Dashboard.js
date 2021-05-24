import React, { useEffect} from "react";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import { Grid, Button,Paper } from "@material-ui/core";
import {Link} from "react-router-dom"
import Experience from "./Experience";
import ProfileInfo from "./ProfileInfo";
import {getCurrentProfile,deleteAccount} from "../../actions/profile";

import Spinner from "../layout/Spinner";
import DashboardActions from "./DashboardActions";
import DeleteIcon from '@material-ui/icons/Delete';


const Dashboard = ({
  getCurrentProfile,
  deleteAccount, 
  auth:{user}, 
  profile:{profile,loading}}) => {
  useEffect(()=>{
    getCurrentProfile();
  },[getCurrentProfile]);  
    //styles
  const paperStyleOut={
        padding:"30px 20px",
        width:400,
        margin:"100px auto"
    }
    const paperStyleIn={
      padding:"30px 20px",
      width:"90%",
      margin:"5% auto 0"
  }
  return(
   
    loading 
    ? <Grid container justify="center" alignItems="center" style={{marginTop:"450px"}}>
       <Grid item>
        <Spinner/>
       </Grid>
     </Grid>
    : 
    <Grid container>
    <Paper elevation={15} style={paperStyleOut}>
    <Grid>
    <h2 style={{fontSize:"1.5rem"}}>dash<span className="l-sec">BOARD</span><span style={{fontSize:"1rem"}} className="material-icons title-dot">stop</span></h2>
    </Grid>
    {profile !==null
    ? <Grid item container direction="column" spacing={4}>

        <Paper elevation={10} style={paperStyleIn}>
        <Grid item container direction="column" spacing={4}>
          <h1 style={{fontSize:"1rem"}}>PROFILE Info<span style={{fontSize:"1rem"}} className="material-icons title-dot">stop</span></h1>
          <h2 style={{paddingLeft:"0.5rem"}}>Welcome, {user && user.name}</h2>
          <ProfileInfo />
          <DashboardActions />
        </Grid>
        </Paper>

        <Paper elevation={10} style={paperStyleIn}>
         <Experience experience={profile.experience} />
        </Paper>
    
    </Grid>
   
    : <Paper elevation={10} style={paperStyleIn} >
      <p style={{padding:"0"}}>Welcome, {user && user.name}</p>
      <Grid item>
      <p style={{padding:"0"}}>Click Create to build your profile.</p>
      </Grid>
      <Grid container wrap="nowrap" justify="space-between">
      <Grid item>
      <Link style={{textDecoration:"none"}} to="/create-profile">
      <Button variant="contained" color="secondary" size="small">create</Button>
      </Link>
      </Grid>
      <Grid item>
       <Button 
        onClick={() => deleteAccount()}
        variant="contained"  
        size="small"
        startIcon={<DeleteIcon />}>Delete Account</Button>
      </Grid> 
      </Grid>
       
      </Paper>}
   
    </Paper>
    </Grid>

  )
};

Dashboard.propTypes = {
getCurrentProfile: PropTypes.func.isRequired,
auth: PropTypes.object.isRequired,
profile: PropTypes.object.isRequired

}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
});

export default connect(mapStateToProps,{getCurrentProfile,deleteAccount})(Dashboard);
