import React, { Fragment } from "react";
import { Grid, Button } from "@material-ui/core";
import {Link, Redirect} from "react-router-dom"
import {connect} from "react-redux";
import PropTypes from 'prop-types'

import Spinner from "./Spinner";

function Landing({isAuthenticated,status}) {
  if (isAuthenticated && status==="Active"){
    return <Redirect to="/dashboard" />
  }
  return (
    <Grid container align="center" justify="center" direction="column" style={{marginTop:"200px"}} spacing={6}>
      <Grid item>
      <h1>Tinos<span className="l-sec">work</span>HUB<span class="material-icons title-dot">stop</span></h1>
      <h2>for Tinos island</h2>
      </Grid>
      <Grid item container align="center" justify="center" spacing={3}>
        <Grid item>
          <Link style={{textDecoration:"none"}} to="/login">
            <Button variant="contained" color="primary">Sign in</Button>
          </Link>
        </Grid>
        <Grid item>
          <Link style={{textDecoration:"none"}} to="/register">
            <Button variant="contained" color="secondary">Sign Up</Button>
          </Link>
        </Grid>
      </Grid>
    </Grid>
  );
}
Landing.propTypes ={
  isAuthenticated: PropTypes.bool.isRequired,
  status: PropTypes.string.isRequired,
}
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  status: state.auth.user.status
})
export default connect(mapStateToProps)(Landing);