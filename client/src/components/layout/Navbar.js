import React,{Fragment} from 'react';
import {Link} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {Button} from "@material-ui/core"
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

//redux
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {logout} from "../../actions/auth";

import "../../css/Navbar.css"
import auth from '../../reducers/auth';

const menuStyle = {
  display:"flex"
  
}
const menuItem ={
  margingRight:"1rem"
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Navbar = ({logout,auth:{isAuthenticated, loading},status,username}) => {
  const classes = useStyles();

  const authLinks =(
    <div style={menuStyle}>
     <div style={{paddingRight:"1rem"}}>
      <Link style={{color:"black",textDecoration:"none"}} to="/dashboard" >
      <span class="material-icons">person</span>
      <span style={{position:"relative",bottom:"0.3rem"}}>{username}</span>
      </Link>
     </div>
     <div>
      <Link style={{color:"black"}} to="/" onClick={logout}><span class="material-icons">logout</span></Link>
     </div>
    </div>
   );
  
const guestLinks =(
    <div style={menuStyle}>
        <div style={{paddingRight:"1rem"}}>
        <Link style={{color:"black"}} to="/register" className="link-style">
          <Button size="small" color="primary" variant="contained">Register</Button>
        </Link>
        </div>
        <div>
        <Link style={{color:"black"}} to="/login" className="link-style">
        <Button size="small" color="primary" variant="contained">Login</Button>
        </Link>
        </div>
        
    </div>);
        
return (
<div className={classes.root}>
<Fragment>
    <AppBar position="fixed" style={{backgroundColor:"#FFFFFF"}}>
    <Toolbar>
    <IconButton edge="start" className={classes.menuButton} color="black" aria-label="menu">
        <MenuIcon />
    </IconButton>
    <Typography variant="h6" className={classes.title}>
        <Link to="/profiles" style={{ textDecoration: 'none',color:"black" }}>
        <h1 style={{fontSize:"1rem",position:"relative",bottom:"3px"}}>Tinos<span className="l-sec">work</span>HUB<span class="material-icons title-dot">stop</span></h1>
        </Link>
        </Typography>
    {!loading && (<Fragment> {(isAuthenticated && status==="Active") ? authLinks : guestLinks}</Fragment>)}
    </Toolbar>
  </AppBar>
</Fragment>

</div>
  )};

Navbar.propTypes = {
logout: PropTypes.func.isRequired,
auth: PropTypes.object.isRequired,
status: PropTypes.string.isRequired,
username: PropTypes.string.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth,
  status: state.auth.user.status,
  username: state.auth.user.name
})

export default connect(mapStateToProps,{logout})(Navbar);