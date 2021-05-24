import React,{Fragment, useState, useEffect} from 'react';
import { Grid, 
    Button, 
    Paper, 
    makeStyles,
    Switch,
    FormControlLabel,
    MenuItem,
    Select,
    TextField} from "@material-ui/core";
import {Link, withRouter} from "react-router-dom";
import InputLabel from '@material-ui/core/InputLabel';
//connect component to redux
import {connect} from "react-redux";
import {createProfile, getCurrentProfile} from "../../actions/profile";
import PropTypes from 'prop-types'
// import "../../css/Register.css";
const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        display:"flex",
        flexDirection:"column"
      },
    },
  }));
const EditProfile = ({
    profile:{ profile, loading},
    getCurrentProfile,
    createProfile, 
    history}) => {

    //styles
    const classes = useStyles();
    const fieldStyle={
        marginBottom:"1rem"
    }
    const selectItem={
        color:"black"
    }
    const paperStyle={
        padding:"30px 20px",
        width:400,
        margin:"100px auto"
    }


    const [formData, setFormData] = useState({
       mainJobInterest:"",
       bio:"",
       instagram:"",
       facebook:"" 
    });

    const [displaySocialInputs, toggleSocialInputs] =useState(false);
    useEffect(() =>{
        getCurrentProfile();
        setFormData({
            mainJobInterest: loading || !profile.mainJobInterest ? "" : profile.mainJobInterest,
            bio: loading || !profile.bio ? "" : profile.bio,
            instagram: loading || !profile.social ? "" : profile.social.instagram,
            facebook: loading || !profile.social ? "" : profile.social.facebook
        });

    },[getCurrentProfile,profile.bio,loading,profile.social,profile.mainJobInterest])

    const{
       mainJobInterest,
       bio,
       instagram,
       facebook 
    } = formData;

    const onChange = e => setFormData({...formData,
        [e.target.name]: e.target.value});
       
    const onSubmit = async e =>{
        e.preventDefault();
        createProfile(formData, history, true);
            
    };
    return (
        <form className={classes.root} onSubmit={e => onSubmit(e)}>
            <Paper elevation={20} style={paperStyle}>
            <Grid container direction="column" spacing={2}>
            <Grid item>
            <h1 style={{fontSize:"1rem",marginBottom:"2rem"}}>edit<span className="l-sec">PROFILE</span><span style={{fontSize:"1rem"}} className="material-icons title-dot">stop</span></h1>
                <InputLabel id="demo-simple-select-helper-label">Main Interest</InputLabel>
                <Select  name="mainJobInterest" value={mainJobInterest} onChange={e => onChange(e)} fullWidth>
                    <MenuItem value="None">
                    <em style={{color:"black",opacity:0.9}}>None</em>
                    </MenuItem>
                        <MenuItem value="Service"style={selectItem}>Service</MenuItem>
                        <MenuItem value="Kitchen Support" style={selectItem}>Kitchen Support</MenuItem>
                        <MenuItem value="Hotel Reception" style={selectItem}>Hotel Reception</MenuItem>
                    </Select>
            </Grid>
            <Grid item>
            <TextField name="bio" value={bio} onChange={e => onChange(e)} label="Short paragraph about you" fullWidth style={fieldStyle} multiline rowsMax={2} />
            </Grid>
            <Grid container spacing={2} direction="column">
            <Grid item>
            <FormControlLabel control={<Switch  onClick={()=>toggleSocialInputs(!displaySocialInputs)}/>} label={<p style={{color:"black",fontSize:"0.8rem"}}>Edit Social Links</p>}/>
            {displaySocialInputs && <Fragment>
                    <Grid>
                    <TextField name="facebook" value={facebook} onChange={e => onChange(e)} label="Facebook link" fullWidth style={fieldStyle}/>   
                    </Grid>
                    <Grid>
                    <TextField name="instagram" value={instagram} onChange={e => onChange(e)} label="Instagram link" fullWidth style={fieldStyle} />
                    </Grid>               
                    </Fragment>}
            </Grid>
            <Grid item>
            <Button style={{marginRight:"1rem"}} type="submit" variant="contained" color="secondary">
                    Save
                </Button>
                <Link to="/dashboard" style={{textDecoration:"none"}}>
                <Button variant="contained">Go back</Button>
                </Link>
                
            </Grid>
            </Grid>
            </Grid>     
           </Paper>
       </form>
   
         
        )
}

EditProfile.propTypes = {
createProfile: PropTypes.func.isRequired,
getCurrentProfile: PropTypes.func.isRequired,
profile: PropTypes.object.isRequired,
}

const mapStateToProps = state =>( {
    profile: state.profile
})

export default connect(mapStateToProps,{createProfile, getCurrentProfile})(withRouter(EditProfile))