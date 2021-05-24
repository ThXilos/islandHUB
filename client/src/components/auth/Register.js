import React,{Fragment, useState} from 'react';
import TextField from '@material-ui/core/TextField';
import { Grid, Button} from "@material-ui/core";
import {Link} from "react-router-dom";

//connect component to redux
import {connect} from "react-redux";
import {setAlert} from "../../actions/alert";
import {register} from "../../actions/auth";
import PropTypes from 'prop-types'
// import "../../css/Register.css";

const Register = ({setAlert, register}) => {

  //Form
    const [formData, setFormData] = useState({
       name:"",
       email:"",
       password:"",
       password2:""
   });

   const {name,email,password,password2} = formData;
   
  
   const onChange = e => setFormData({...formData,
    [e.target.name]: e.target.value});
   
   const onSubmit = async e =>{
        e.preventDefault();
        if (password !== password2) {
            //this will fire off actions/alert.js with
            //{ MSG, ALERT_TYPE and get an ID}.
           setAlert("Passwords do not match","error");
        }else{
            console.log("I am here!")
            register({name, email, password}); 
    }
};

    return(
    <Fragment>
    <form onSubmit={e => onSubmit(e)}>
    <Grid container align="center" justify="center" direction="column" style={{marginTop:"200px"}} spacing={2}>
      <Grid item >
      <h1>Sign<span className="l-sec">Up</span><span className="material-icons title-dot">stop</span></h1>
      </Grid>
      <Grid item container direction="column" spacing={2}>
        <Grid item>
        <TextField 
            onChange={e => onChange(e)}
            value={name}
            name="name"
            id="outlined-basic" 
            label="Name" 
            variant="outlined" 
            required
            />
        </Grid>
        <Grid item>
        <TextField
            onChange={e => onChange(e)}
            value={email}
            name="email" 
            type="email"
            id="outlined-basic" 
            label="Email Address" 
            variant="outlined"
            required 
            />
        </Grid>
        <Grid item>
        <TextField 
            onChange={e => onChange(e)}
            value={password}
            name="password"
            type="password"
            id="outlined-basic" 
            label="Password" 
            variant="outlined"
            inputProps={{ minLength: 6 }} 
            required 
            />
        </Grid>
        <Grid item>
        <TextField
            onChange={e => onChange(e)}
            value={password2}
            name="password2" 
            type="password"
            id="outlined-basic" 
            label="Confirm Password" 
            variant="outlined"
            required 
            />
        </Grid>
        <Grid item>
            <Button 
            variant="contained" 
            color="primary" 
            type="submit">Register</Button>
            <p style={{fontSize:"0.8rem"}}>Already have an account? <Link to="/login" style={{textDecoration:"none",color:"blue"}}>Sign In</Link></p>
        </Grid>

      </Grid>
      </Grid>
    </form>
    </Fragment>
     
    )
};

Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
}


export default connect(null,{ setAlert, register })(Register);