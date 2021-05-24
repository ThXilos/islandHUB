import React from "react"
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import {deleteAccount} from "../../actions/profile";
import {connect} from "react-redux";
//Icon imports
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from '@material-ui/icons/Delete';
//Material UI
import { Grid, Button} from "@material-ui/core";


const DashboardActions = ({deleteAccount}) =>{
return(

<Grid item container spacing={1}>
    <Grid item>
    <Link to="/edit-profile" style={{textDecoration:"none"}}>
    <Button
        variant="contained"
        color="primary"
        size="small"
        startIcon={<EditIcon />}
      >Edit</Button>
    </Link>
    </Grid>
    <Grid item>
    <Button 
        onClick={() => deleteAccount()}
        variant="contained"  
        color=""
        size="small"
        startIcon={<DeleteIcon />}>Delete Account</Button>
    </Grid>
</Grid>

)};

DashboardActions.propTypes = {
    deleteAccount: PropTypes.func.isRequired
    }


export default connect(null,{deleteAccount})(DashboardActions);