import React,{Fragment, useState} from 'react';
import TextField from '@material-ui/core/TextField';
import { Grid, Button} from "@material-ui/core";
import {Link, Redirect} from "react-router-dom";
// redux
import {setAlert} from "../../actions/alert";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {login} from "../../actions/auth";
// import "../../css/Register.css";

const Login = ({login,isAuthenticated,status,setAlert}) => {
//Form
    const [formData, setFormData] = useState({
       email:"",
       password:""
   });

   const {email,password} = formData;
   
  
   const onChange = e => setFormData({...formData,
    [e.target.name]: e.target.value});
   
   const onSubmit = async e =>{
        e.preventDefault();
        login({email, password})
        
    }
console.log(status)
if(isAuthenticated && status==="Active"){
 return <Redirect to="/dashboard" /> 
}
    return(
    <Fragment>
    <form onSubmit={e => onSubmit(e)}>
      <Grid container align="center" justify="center" direction="column" style={{marginTop:"200px"}} spacing={2}>
      <Grid item >
      <h1>Sign<span className="l-sec">In</span><span className="material-icons title-dot">stop</span></h1>
      </Grid>
      <Grid item container direction="column" spacing={2}>
        <Grid item>
        <TextField
            onChange={e => onChange(e)}
            value={email}
            name="email" 
            type="email"
            id="outlined-basic" 
            label="Email Address" 
            variant="outlined"
            required />
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
            required />
        </Grid>
        <Grid item>
        <Button 
            variant="contained" 
            color="primary" 
            type="submit">Login</Button>
            <p style={{fontSize:"0.8rem"}}>Don't have an account? <Link to="/register" style={{textDecoration:"none",color:"blue"}}>Sign Up</Link></p>
        </Grid>

      </Grid>

      </Grid>





    {/* <Grid
        container
        direction="column"
        justify="center"
        align="center"
        className="outer-grid"
        spacing={3}>
            <Grid item sm="auto">
            <h1>
              Sign<span className="l-sec">In</span>
              <span className="material-icons title-dot">stop</span>
            </h1>
            </Grid>
            
            <Grid item sm="auto">
            <TextField
            onChange={e => onChange(e)}
            value={email}
            name="email" 
            type="email"
            id="outlined-basic" 
            label="Email Address" 
            variant="outlined"
            required />
            </Grid>
            <Grid item sm="auto">
            <TextField 
            onChange={e => onChange(e)}
            value={password}
            name="password"
            type="password"
            id="outlined-basic" 
            label="Password" 
            variant="outlined"
            inputProps={{ minLength: 6 }} 
            required />
            </Grid>
            <Grid item sm="auto">
            <Button 
            variant="contained" 
            color="primary" 
            type="submit">Login</Button>
            <p style={{fontSize:"0.8rem"}}>Don't have an account? <Link to="/register" style={{textDecoration:"none",color:"blue"}}>Sign Up</Link></p>
            </Grid>
            </Grid> */}
    </form>
         
    </Fragment>
     
    )
}
Login.propTypes ={
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  status: PropTypes.string,
}
const mapStateToProps = state =>({
isAuthenticated: state.auth.isAuthenticated,
status: state.auth.user.status
});

export default connect(mapStateToProps,{login, setAlert})(Login);