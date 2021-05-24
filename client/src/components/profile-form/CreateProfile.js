import React,{Fragment, useState} from 'react';
import { Grid, 
    Button, 
    Paper, 
    makeStyles,
    Switch,
    FormControlLabel,
    MenuItem,
    Select,
    TextField,
    InputLabel} from "@material-ui/core";
import {Link, withRouter} from "react-router-dom";
//connect component to redux
import {connect} from "react-redux";
import {createProfile} from "../../actions/profile";
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
const CreateProfile = ({createProfile, history}) => {
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
       instagram:"click on edit to add a link",
       facebook:"click on edit to add a link" 
    });

    const [displaySocialInputs, toggleSocialInputs] =useState(false);

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
        createProfile(formData, history);
            
    };
    return (
        <form className={classes.root} onSubmit={e => onSubmit(e)}>
            <Paper elevation={20} style={paperStyle}>
            <Grid container direction="column">
            <Grid item>
            <p style={{padding:"0"}}>Choose your interest</p>
                
                <InputLabel id="demo-simple-select-helper-label">What job position are you looking for?</InputLabel>
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
            <TextField inputProps={{maxlength:"160"}} name="bio" value={bio} onChange={e => onChange(e)} label="Short paragraph about you" fullWidth style={fieldStyle} multiline rowsMax={4} />
            </Grid>
            <Grid container spacing={2} direction="column">
            <Grid item>
            <FormControlLabel control={<Switch  onClick={()=>toggleSocialInputs(!displaySocialInputs)}/>} label={<p style={{color:"black",fontSize:"0.8rem"}}>Add Social Links</p>}/>
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
                    Submit
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

CreateProfile.propTypes = {
createProfile: PropTypes.func.isRequired,
}

export default connect(null,{createProfile})(withRouter(CreateProfile))
