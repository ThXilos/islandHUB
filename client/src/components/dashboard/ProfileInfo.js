import React, { useEffect, Fragment } from "react";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import { Grid, Button,Paper } from "@material-ui/core";
import {getCurrentProfile} from "../../actions/profile";
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import { relativeTimeThreshold } from "moment";

const ProfileInfo = ({
  getCurrentProfile, 
  mainJobInterest,
  bio,
  instagram,
  facebook
  }) => {
 

    //styles
    const gridItem={
      backgroundColor:"#f8f5f1",
      borderRadius:"10px",
      padding:"0 5px",
      marginTop:"1rem"
    }
    const socialIcon = {
      position: "relative",
      top:"5px"
    }
  return(
   <>
      <Grid item style={gridItem} >
        <h3><p style={{padding:"0"}}>Current job interest: <span style={{color:"green"}}>{mainJobInterest}</span></p></h3>
      </Grid>

      <Grid item style={gridItem}>
        <h4><p style={{padding:"0"}}>Short bio: <span style={{color:"#F9b208"}}>{bio}</span></p></h4>
      </Grid>

      <Grid item style={gridItem}>
        <h4><p style={{padding:"0"}}>Social Accounts:</p>
        <p><FacebookIcon style={socialIcon} /> {facebook}</p>
        <p><InstagramIcon style={socialIcon} /> {instagram}</p></h4>
      </Grid>
   </>
  )
};

ProfileInfo.propTypes = {
getCurrentProfile: PropTypes.func.isRequired,
mainJobInterest: PropTypes.string.isRequired,
bio: PropTypes.string.isRequired,
facebook: PropTypes.string,
instagram: PropTypes.string,

}

const mapStateToProps = state => ({
    mainJobInterest: state.profile.profile.mainJobInterest,
    bio: state.profile.profile.bio,
    facebook: state.profile.profile.social.facebook,
    instagram: state.profile.profile.social.instagram

});

export default connect(mapStateToProps,{getCurrentProfile})(ProfileInfo);