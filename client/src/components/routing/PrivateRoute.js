import React from 'react'
import PropTypes from 'prop-types'
import { Component } from 'react'

import {connect} from "react-redux";
import {Redirect, Route} from "react-router-dom";
import { compareSync } from 'bcryptjs';


const PrivateRoute = ({
    component: Component,
    auth:{ isAuthenticated, loading,user:{status} }, 
    ...rest
}) =>
// && status === "pending") || status === "" 

    (
    <Route {...rest} 
    render = {props => (!isAuthenticated && !loading) || status === "pending"
    ? (<Redirect to="/login" />)
    :(<Component {...props} />)} />)

PrivateRoute.propTypes = {
    auth: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    user: state.auth.user
});
export default connect(mapStateToProps) (PrivateRoute);
