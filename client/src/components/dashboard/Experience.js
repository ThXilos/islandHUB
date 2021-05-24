import React from 'react'
import PropTypes from 'prop-types'
import {connect} from "react-redux";
import {deleteExperience} from "../../actions/profile";
import {Link} from "react-router-dom";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { Grid, 
    Button, 
    Chip} from "@material-ui/core";


const Experience = ({experience, deleteExperience}) => {
    
    const isEmpty = experience.length;
    const experiences = experience.map(exp =>( 
    <Grid key={exp._id}  item>
        <Chip onDelete={() => deleteExperience(exp.id)} color='primary' style={{backgroundColor:exp.expLvl}} label={exp.title} />
    </Grid>
    ));
        
    return (
        
        <Grid container spacing={2} direction="column">
        <Grid item>
        <h1 style={{fontSize:"1rem"}}>EXPERIENCE<span style={{fontSize:"1rem"}} className="material-icons title-dot">stop</span></h1>
        </Grid>
        {(isEmpty === 0)
        ? <Grid item container direction="column">
            <p style={{padding:"0"}}>This feels empty...add some experience.</p>
            <Grid item>
            <Link to="/add-experience" style={{textDecoration:"none"}}>
                <Button variant="contained" color="secondary" size="small" startIcon={<AddCircleOutlineIcon />}>Experience</Button>
            </Link>
            </Grid>
          </Grid>
        : <Grid item container direction="column" spacing={2}>
           <Grid item container spacing={1}>
            {experiences}
           </Grid>
           <Grid item>
            <Link to="/add-experience" style={{textDecoration:"none"}}>
                <Button variant="contained" color="secondary" size="small" startIcon={<AddCircleOutlineIcon />}>Experience</Button>
            </Link>
            </Grid>
          </Grid>}
       </Grid>
       
       
            
        
    )
}

Experience.propTypes = {
experience: PropTypes.array.isRequired,
deleteExperience: PropTypes.func.isRequired,
}

export default connect(null,{deleteExperience})(Experience)
