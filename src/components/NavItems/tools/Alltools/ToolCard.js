import React, { Component } from 'react';
//import { ReactComponent as GifIcon } from "../../../NavBar/images/SVG/Image/Gif.svg"
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

import NewReleasesIcon from '@material-ui/icons/NewReleases';
import FiberNewIcon from '@material-ui/icons/FiberNew';
import LockIcon from '@material-ui/icons/Lock';

import { ReactComponent as ImprovedIcon } from '../../../NavBar/images/SVG/Improved.svg';

import isAuthenticated from "./AdvancedTools/AdvancedTools";

import AuthenticationIcon from "./AdvancedTools/AuthenticationIcon";



export class ToolCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            hovered: false
        };
    }

    

    onMouseEnter = e => {
        this.setState({ hovered: true });
    };

    onMouseLeave = e => {
        this.setState({ hovered: false });
    };
    

    render() {

        const userSession = state => ({
            userSession: state.userSession
        });

        const userAuthenticated = state => ({
            userAuthenticated: state.userSession.userAuthenticated
        });

        if (!(userSession && userAuthenticated)){
            console.log("AUTH 1");
        }

        if (!isAuthenticated) {
            console.log("AUTH 2");
        }
        


        var showNew = false;
        var showRedesign = false;
        var showLock = false;

        //console.log(this.props);

        if (this.props.type === "redesigned"){
            showRedesign = true;
        }

        if (this.props.type === "new") {
            showNew = true;
        }

        if (this.props.type === "lock") {
            showLock = true;
        }

        if (this.props.type === "lock and new") {
            showLock = true;
            showNew = true;
        }

        

        const { hovered } = this.state;
        const styleCard = hovered   ? {
            border: 'solid #90A4AE 2px',
                                        borderRadius: "10px",
                                        cursor: "pointer",
                                        backgroundColor: "#ffffff",
                                    } 

                                    : {
                border: 'solid #dce0e2 2px',
                                        borderRadius: "10px",
                                        cursor: "pointer",
                                        backgroundColor: "#ffffff",
                                    };

        return (

            <Box onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave} style={styleCard}>

                <Box p={2}>


                            <Box mr={1}>
                                <Grid
                                    container
                                    direction="row"
                                    alignItems="center"
                                >


                            <Grid
                                container
                                direction="row"
                                alignItems="center"
                            >

                                <Grid item>
                                    {this.props.icon}                   
                                </Grid>
                                <Grid item>
                                    <Box ml={1}/>
                                </Grid>

                                <Grid item>
                                    <Typography variant="h6">{this.props.name}</Typography>
                                </Grid>

                                {showRedesign &&
                                    <Grid item style={{ marginLeft: 'auto', color: "#F44336" }} >
                                        <Box mr={-1}>
                                            <ImprovedIcon title="Upgraded" width="40px" height="40px" />
                                        </Box>
                                        

                                    <Grid item>
                                        {this.props.icon}                   

                                    </Grid>
                                    <Grid item>
                                        <Box ml={1}/>
                                    </Grid>

                                    <Grid item xs>
                                        <Typography variant="h6">{this.props.name}</Typography>
                                    </Grid>

                                    {showRedesign &&
                                        <Grid item style={{ marginLeft: 'auto', color: "#F44336" }} >
                                            <NewReleasesIcon />
                                        </Grid>
                                    }

                                    {showNew &&
                                        <Grid item style={{ marginLeft: 'auto', color: "#F44336" }} >
                                            <FiberNewIcon />
                                        </Grid>
                                    }


                                    {showLock && !(this.state.userSession && this.state.userSession.userAuthenticated) &&
                                        <Grid item style={{ marginLeft: 'auto' }} >
                                            <Box ml={2}>
                                                <AuthenticationIcon />
                                            </Box>  
                                        </Grid>
                                    }
                                            
                                </Grid>
                            </Box>


                            <Box m={1} />


                            <div style={{minHeight: "45px"}}>
                                <span style={{fontSize: '10px',}}>{
                                    this.props.description}
                                </span>
                            </div>




                </Box>

               


                
            </Box>
            
        )
    }

}

export default ToolCard;