import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
// import {removeAlert} from "../../actions/alert"
//Material-ui
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
//Material-ui
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
//main function
const Alerts = ({ alerts}) =>{
   return(
    alerts !== null 
    && alerts.length > 0 
    && alerts.map(alert =>(
        <div key={alert.id}>
        
        <Snackbar open="open">
        <Alert severity={alert.alertType}>
        {alert.msg}
        </Alert>
        </Snackbar>
            
        </div>
    )));
}

Alerts.protoTypes = {
alerts: PropTypes.array.isRequired,

}
const mapStateToProps = state =>({
    //get the state from root reducer {alert}
alerts: state.alert
});

export default connect(mapStateToProps)(Alerts);