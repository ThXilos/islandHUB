import React,{useState} from 'react'
import {Link} from "react-router-dom"
import PropTypes from 'prop-types'

import {connect} from "react-redux";
import {addExperience} from "../../actions/profile";

import { Grid, 
    Button, 
    Paper, 
    makeStyles,
    MenuItem,
    Select,
    InputLabel} from "@material-ui/core";

    const useStyles = makeStyles((theme) => ({
        root: {
          '& > *': {
            display:"flex",
            flexDirection:"column"
          },
        },
      }));


const AddExperience = ({addExperience,history}) => {

    const classes = useStyles();

    const selectItem={
        color:"black"
    }
    const paperStyle={
        padding:"30px 20px",
        width:400,
        margin:"100px auto"
    }
    
    const [formData, setFormData] = useState({
        title:"",
        expLvl:""
    });

    const {title, expLvl} = formData;

    const onChange = e => setFormData({...formData,
        [e.target.name]:e.target.value})
    const onSubmit = e =>{
        e.preventDefault();
        addExperience(formData, history);

    }

    return (
        <form className={classes.root} onSubmit={e => onSubmit(e)}>
        <Paper elevation={20} style={paperStyle}>
         <Grid container spacing={4} direction="column">
            <Grid item>
            <h1 style={{fontSize:"1rem",marginBottom:"2rem"}}>add<span className="l-sec">EXPERIENCE</span>
            <span style={{fontSize:"1rem"}} className="material-icons title-dot">stop</span>
            </h1>
            <InputLabel id="demo-simple-select-helper-label">Add some experience:</InputLabel>
             </Grid>
             <Grid item>
             <InputLabel id="demo-simple-select-helper-label">Worked as:</InputLabel>
                 <Select  name="title" value={title} onChange={e => onChange(e)} fullWidth>
                    <MenuItem value="Service"style={selectItem}>Service</MenuItem>
                    <MenuItem value="Kitchen Support" style={selectItem}>Kitchen Support</MenuItem>
                    <MenuItem value="Hotel Reception" style={selectItem}>Hotel Reception</MenuItem>
            </Select>
             </Grid>
             <Grid item>
             <InputLabel id="demo-simple-select-helper-label">Duration:</InputLabel>
                 <Select labelId="expLabel" name="expLvl" value={expLvl} onChange={e => onChange(e)} fullWidth>
                    <MenuItem value="#ffd384" style={selectItem}>..looking to enter the field</MenuItem>
                    <MenuItem value="#a6d6d6" style={selectItem}>..1 to 2 Seasons</MenuItem>
                    <MenuItem value="#9fe6a0" style={selectItem}>..2 to 4 Seasons</MenuItem>
                    <MenuItem value="#f98404" style={selectItem}>..more than 4 Seasons</MenuItem>
            </Select>
            </Grid>
            <Grid style={{marginTop:"2rem"}}container spacing={2}>
             <Grid item>
                 <Button type="submit" variant="contained" color="secondary" size="medium">add</Button>
             </Grid>
             <Grid item>
             <Link to="/dashboard" style={{textDecoration:"none"}}>
             <Button type="submit" variant="contained"  size="medium">back</Button>
             </Link>
                 
             </Grid>
            </Grid>
            
        </Grid>
      </Paper>
      </form>
    )
}

AddExperience.propTypes = {
addExperience: PropTypes.func.isRequired,
}

export default connect(null, {addExperience})(AddExperience)
