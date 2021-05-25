import React from 'react'
import PropTypes from 'prop-types'
import {Link} from "react-router-dom"

import { Grid, Button,Paper, Chip, Avatar } from "@material-ui/core";
import ContactMailIcon from '@material-ui/icons/ContactMail';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import "./ProfileItem.css"

const ProfileItem = ({profile:{
    user:{_id,name, avatar},
    mainJobInterest,
    experience,
    bio,
    bumps
}}) => {
    return (
     <Grid item>
         <Paper elevation={1} className="paperStyle">
             <Grid container direction="column" spacing={1}>
                <Grid item container justify="space-between" alignItems="center" wrap="nowrap">
                    <Grid container>
                    <Avatar style={{width:"30px",height:"30px"}} alt={name} src={avatar} />
                    <span className="nameTitleProfileItem">{name} <span style={{color:"#0a1931"}}>as</span> {mainJobInterest}</span>
                    </Grid>
                    <Link to={`/profile/${_id}`} style={{textDecoration:"none"}}>
                    <Button variant="contained" color="secondary" size="small" startIcon={<ContactMailIcon />}>View</Button>
                     </Link>
             </Grid>
                <div className="gridItem">
                {bio.length > 80 
                ?<p className="bioText">{`${bio.slice(0,80)} ...`}</p>
                :<p className="bioText">{`${bio.slice(0,80)}`}</p>
                }
                
                </div>
             
                <Grid style={{marginTop:"0.5rem"}} item container wrap="nowrap" justify="space-between">
                <Grid container spacing={1}>
                {experience.slice(0, 4).map(exp =>
                        <Grid item key={exp._id} >
                            <Chip size="small" key={exp._id} color='primary' style={{backgroundColor:exp.expLvl}} label={`#${exp.title}`} />
                        </Grid>
                         )}
                </Grid>
                <Button style={{paddingTop:"0 0 1px 0", borderRadius:"10px"}}>
                <FavoriteBorderIcon  className="likesCounter" />
                <span style={{position:"relative",top:"5px"}}>{bumps.length}</span>      
                </Button>
                </Grid>
            </Grid>
         </Paper>
     </Grid>
    
    )
}

ProfileItem.propTypes = {
profile: PropTypes.object.isRequired,
experience: PropTypes.array,
bumps: PropTypes.array
}

export default ProfileItem
