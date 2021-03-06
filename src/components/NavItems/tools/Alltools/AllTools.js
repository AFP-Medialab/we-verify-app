import Grid from "@material-ui/core/Grid";
import React, {useState} from "react";
import Button from "@material-ui/core/Button";
import DialogContent from "@material-ui/core/DialogContent";
import Iframe from "react-iframe";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import history from "../../../Shared/History/History";
import Typography from "@material-ui/core/Typography";
import useLoadLanguage from "../../../../Hooks/useLoadLanguage";
import tsv from "../../../../LocalDictionary/components/NavItems/tools/Alltools.tsv";
import tsvWarning from "../../../../LocalDictionary/components/Shared/OnWarningInfo.tsv";
import useMyStyles from "../../../Shared/MaterialUiStyles/useMyStyles";
import ToolCard from "./ToolCard"
import Card from "@material-ui/core/Card";
import { ReactComponent as IconImage } from '../../../NavBar/images/SVG/Image/Images.svg';
import { ReactComponent as IconVideo } from '../../../NavBar/images/SVG/Video/Video.svg';
import { ReactComponent as IconSearch } from '../../../NavBar/images/SVG/Search/Search.svg';
import { ReactComponent as IconData } from '../../../NavBar/images/SVG/DataAnalysis/Data_analysis.svg';
import { ReactComponent as IconTools } from '../../../NavBar/images/SVG/Navbar/Tools.svg';
import Box from "@material-ui/core/Box";
import HeaderTool from "../../../Shared/HeaderTool/HeaderTool";
import AdvancedTools from "./AdvancedTools/AdvancedTools";
import { useSelector } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <div>{children}</div>
                </Box>
            )}
        </div>
    );
}


const AllTools = (props) => {
    const classes = useMyStyles();
    const keyword = useLoadLanguage("components/NavItems/tools/Alltools.tsv", tsv);
    const keywordWarning = useLoadLanguage("components/Shared/OnWarningInfo.tsv", tsvWarning);
    
    const tools = props.tools;
    const [videoUrl, setVideoUrl] = useState(null);

    const userAuthenticated = useSelector(
        (state) => state.userSession && state.userSession.userAuthenticated
    );
    const [openAlert, setOpenAlert] = React.useState(false);

    const handleClick = (path, mediaTool, type) => {
        //console.log(type);
        if (type === "lock" || type === "lock and new"){
            if (userAuthenticated){
                //console.log("LOGGED");
                handlePush(path, mediaTool);
            }else{
                setOpenAlert(true);
            }
        }else{
            //console.log("NOT LOGGED");
            handlePush(path, mediaTool);
        }
    };

    const handlePush = (path, mediaTool) => {
        history.push({
            pathname: "/app/tools/" + path,
            state: { media: mediaTool }
        })
        
    };
    

    //console.log(tools);

    const toolsVideo = [];
    const toolsImages = [];
    const toolsSearch = [];
    const toolsData = [];
    

    tools.forEach((value) => {

        if (value.title === "navbar_forensic" ){
            value.type = "redesigned";
        }

        if (value.title === "navbar_ocr" || value.title === "navbar_xnetwork" || value.title === "navbar_covidsearch" || value.title === "navbar_analysis_image") {
            value.type = "new";
        }

        if (value.title === "navbar_twitter_sna") {
            value.type = "lock";
        }

        if (value.title === "navbar_gif") {
            value.type = "lock and new";
        }


        if(
            value.title === "navbar_analysis_video" ||
            value.title === "navbar_keyframes" ||
            value.title === "navbar_thumbnails" ||
            value.title === "navbar_rights" ||
            value.title === "navbar_metadata"
        ){
            toolsVideo.push(value);
        }


        if (
            value.title === "navbar_analysis_image" ||
            value.title === "navbar_ocr" ||
            value.title === "navbar_forensic" ||
            value.title === "navbar_magnifier" ||
            value.title === "navbar_metadata" ||
            value.title === "navbar_gif"
        ) {
            toolsImages.push(value);
        }


        if (
            value.title === "navbar_xnetwork" ||
            value.title === "navbar_covidsearch" ||
            value.title === "navbar_twitter"
        ) {
            toolsSearch.push(value);
        }

        if (
            value.title === "navbar_twitter_sna"
        ) {
            toolsData.push(value);
        }
        

    })

    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenAlert(false);
    };


    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div>
            <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleCloseAlert}>
                <Alert onClose={handleCloseAlert} severity="warning">
                    {keywordWarning("warning_advanced_tools")}
                </Alert>
            </Snackbar>

            <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="center">


                <Grid item xs>
                    <HeaderTool name={keyword("navbar_tools")} icon={<IconTools style={{ fill: "#51A5B2" }} />} />
                </Grid>

                <Grid item>
                    <AdvancedTools />
                </Grid>

            </Grid>

            <Card>
                <Tabs value={value} onChange={handleChange} indicatorColor={'primary'}>
                    <Tab label={
                        <Box mt={1}>
                            <Grid
                                container
                                direction="row"
                                justify="flex-start"
                                alignItems="center"
                            >
                                <Grid item>
                                    <IconVideo width="45px" height="45px" style={{ fill: "#596977" }} />
                                </Grid>

                                <Grid item>
                                    <Box m={1} />
                                </Grid>

                                <Grid item>
                                    <Typography variant="h6" style={{ color: "#596977", textTransform: "capitalize" }}>{keyword("category_video")}</Typography>
                                </Grid>

                            </Grid>
                        </Box>
                    }/>
                    <Tab label={
                        <Box mt={1}>
                            <Grid
                                container
                                direction="row"
                                justify="flex-start"
                                alignItems="center"
                            >
                                <Grid item>
                                    <IconImage width="45px" height="45px" style={{ fill: "#596977" }} />
                                </Grid>

                                <Grid item>
                                    <Box m={1} />
                                </Grid>

                                <Grid item>
                                    <Typography variant="h6" style={{ color: "#596977", textTransform: "capitalize" }}>{keyword("category_image")}</Typography>
                                </Grid>

                            </Grid>
                        </Box>
                    } />
                    <Tab label={
                        <Box mt={1}>
                            <Grid
                                container
                                direction="row"
                                justify="flex-start"
                                alignItems="center"
                            >
                                <Grid item>
                                    <IconSearch width="45px" height="45px" style={{ fill: "#596977" }} />
                                </Grid>

                                <Grid item>
                                    <Box m={1} />
                                </Grid>

                                <Grid item>
                                    <Typography variant="h6" style={{ color: "#596977", textTransform: "capitalize" }}>{keyword("category_search")}</Typography>
                                </Grid>

                            </Grid>
                        </Box>
                    } />
                    <Tab label={
                        <Box mt={1}>
                            <Grid
                                container
                                direction="row"
                                justify="flex-start"
                                alignItems="center"
                            >
                                <Grid item>
                                    <IconData width="45px" height="45px" style={{ fill: "#596977" }} />
                                </Grid>

                                <Grid item>
                                    <Box m={1} />
                                </Grid>

                                <Grid item>
                                    <Typography variant="h6" style={{ color: "#596977", textTransform: "capitalize" }}>{keyword("category_data")}</Typography>
                                </Grid>

                            </Grid>
                        </Box>
                    } />
                </Tabs>

                <Box m={1} />
                
                <div style={{minHeight: "340px"}}>
                    <TabPanel value={value} index={0}>
                        <Grid container justify="flex-start" spacing={2} className={classes.toolCardsContainer}>

                            {
                                toolsVideo.map((value, key) => {
                                    //console.log(value);

                                    return (
                                        <Grid className={classes.toolCardStyle} item key={key} onClick={() => handleClick(value.path, "video", value.type)}>
                                            <ToolCard
                                                name={keyword(value.title)}
                                                description={keyword(value.description)}
                                                icon={value.iconColored}
                                                type={value.type}
                                                path="../../../NavBar/images/SVG/Image/Gif.svg" />

                                        </Grid>
                                    );
                                })
                            }

                        </Grid>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <Grid container justify="flex-start" spacing={2} className={classes.toolCardsContainer}>

                            {
                                toolsImages.map((value, key) => {
                                    //console.log(value);
                                    return (
                                        <Grid className={classes.toolCardStyle} item key={key} onClick={() => handleClick(value.path, "image", value.type)}>
                                            <ToolCard
                                                name={keyword(value.title)}
                                                description={keyword(value.description)}
                                                icon={value.iconColored}
                                                type={value.type} />
                                        </Grid>
                                    );
                                })
                            }

                        </Grid>
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        <Grid container justify="flex-start" spacing={2} className={classes.toolCardsContainer}>

                            {
                                toolsSearch.map((value, key) => {
                                    return (
                                        <Grid className={classes.toolCardStyle} item key={key} onClick={() => handleClick(value.path, "search", value.type)}>
                                            <ToolCard
                                                name={keyword(value.title)}
                                                description={keyword(value.description)}
                                                icon={value.iconColored}
                                                type={value.type} />
                                        </Grid>
                                    );
                                })
                            }

                        </Grid>
                    </TabPanel>
                    <TabPanel value={value} index={3}>
                        <Grid container justify="flex-start" spacing={2} className={classes.toolCardsContainer}>

                            {
                                toolsData.map((value, key) => {
                                    return (
                                        <Grid className={classes.toolCardStyle} item key={key} onClick={() => handleClick(value.path, "datas", value.type)}>
                                            <ToolCard
                                                name={keyword(value.title)}
                                                description={keyword(value.description)}
                                                icon={value.iconColored}
                                                type={value.type} />
                                        </Grid>
                                    );
                                })
                            }

                        </Grid>
                    </TabPanel>
                </div>
            </Card>


            <Box m={3} />
            
            {/*

            <Card>


                <Box p={2}>
                    <Grid
                        container
                        direction="row"
                        justify="flex-start"
                        alignItems="center"
                    >
                        <Grid item>
                            <IconVideo width="45px" height="45px" style={{ fill: "#596977" }} />
                        </Grid>

                        <Grid item>
                            <Box m={1} />
                        </Grid>

                        <Grid item>
                            <Typography variant="h5" style={{ color: "#596977" }}>{keyword("category_video")}</Typography>
                        </Grid>

                    </Grid>

                    <Box m={2}/>

                    <Grid container justify="flex-start" spacing={2} className={classes.toolCardsContainer}>
                        
                            {
                                toolsVideo.map((value, key) => {
                                    //console.log(value);

                                    return (
                                        <Grid className={classes.toolCardStyle} item key={key} onClick={() => handleClick(value.path, "video", value.type)}>
                                            <ToolCard
                                                name={keyword(value.title)}
                                                description={keyword(value.description)}
                                                icon={value.iconColored} 
                                                type={value.type}
                                                path="../../../NavBar/images/SVG/Image/Gif.svg" />
                                                
                                        </Grid>
                                    );
                                })
                            }
                        
                    </Grid>
                </Box>
            </Card>
            
            <Box m={3} />

            <Card>
                <Box p={2}>
                    <Grid
                        container
                        direction="row"
                        justify="flex-start"
                        alignItems="center"
                    >
                        <Grid item>
                            <IconImage width="45px" height="45px" style={{ fill: "#596977" }} />
                        </Grid>

                        <Grid item>
                            <Box m={1} />
                        </Grid>

                        <Grid item>
                            <Typography variant="h5" style={{ color: "#596977" }}>{keyword("category_image")}</Typography>
                        </Grid>

                    </Grid>

                    <Box m={2} />

                    <Grid container justify="flex-start" spacing={2} className={classes.toolCardsContainer}>

                        {
                            toolsImages.map((value, key) => {
                                //console.log(value);
                                return (
                                    <Grid className={classes.toolCardStyle} item key={key} onClick={() => handleClick(value.path, "image", value.type)}>
                                        <ToolCard
                                            name={keyword(value.title)}
                                            description={keyword(value.description)}
                                            icon={value.iconColored}
                                            type={value.type}/>
                                    </Grid>
                                );
                            })
                        }

                    </Grid>
                </Box>
            </Card>

            <Box m={3} />

            <Card>
                <Box p={2}>
                    <Grid
                        container
                        direction="row"
                        justify="flex-start"
                        alignItems="center"
                    >
                        <Grid item>
                            <IconSearch width="45px" height="45px" style={{ fill: "#596977" }} />
                        </Grid>

                        <Grid item>
                            <Box m={1} />
                        </Grid>

                        <Grid item>
                            <Typography variant="h5" style={{ color: "#596977" }}>{keyword("category_search")}</Typography>
                        </Grid>

                    </Grid>

                    <Box m={2} />

                    <Grid container justify="flex-start" spacing={2} className={classes.toolCardsContainer}>

                        {
                            toolsSearch.map((value, key) => {
                                return (
                                    <Grid className={classes.toolCardStyle} item key={key} onClick={() => handleClick(value.path, "search", value.type)}>
                                        <ToolCard
                                            name={keyword(value.title)}
                                            description={keyword(value.description)}
                                            icon={value.iconColored}
                                            type={value.type}/>
                                    </Grid>
                                );
                            })
                        }

                    </Grid>
                </Box>
            </Card>

            <Box m={3} />

            <Card>
                <Box p={2}>
                    <Grid
                        container
                        direction="row"
                        justify="flex-start"
                        alignItems="center"
                    >
                        <Grid item>
                            <IconData width="45px" height="45px" style={{ fill: "#596977" }} />
                        </Grid>

                        <Grid item>
                            <Box m={1} />
                        </Grid>

                        <Grid item>
                            <Typography variant="h5" style={{ color: "#596977" }}>{keyword("category_data")}</Typography>
                        </Grid>

                    </Grid>

                    <Box m={2} />

                    <Grid container justify="flex-start" spacing={2} className={classes.toolCardsContainer}>

                        {
                            toolsData.map((value, key) => {
                                return (
                                    <Grid className={classes.toolCardStyle} item key={key} onClick={() => handleClick(value.path, "datas", value.type)}>
                                        <ToolCard
                                            name={keyword(value.title)}
                                            description={keyword(value.description)}
                                            icon={value.iconColored}
                                            type={value.type}/>
                                    </Grid>
                                );
                            })
                        }

                    </Grid>
                </Box>
            </Card>

                    */}

            <Box m={4} />


            <Dialog
                height={"400px"}
                fullWidth
                maxWidth={"md"}
                open={videoUrl !== null}
                onClose={() => setVideoUrl(null)}
                aria-labelledby="max-width-dialog-title"
            >
                <DialogContent>
                    <Iframe
                        frameBorder="0"
                        url={videoUrl}
                        allow="fullscreen"
                        height="400"
                        width="100%"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setVideoUrl(null)} color="primary">
                        {keyword("close")}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};
export default AllTools;