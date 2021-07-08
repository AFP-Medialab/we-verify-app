import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import { useDispatch, useSelector } from "react-redux";
import Languages from "../NavItems/languages/languages";
import Tutorial from "../NavItems/tutorial/tutorial";
import React, { useEffect } from 'react';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ScrollTop from "../Shared/ScrollTop/ScrollTop";
import Fab from "@material-ui/core/Fab";
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import history from '../Shared/History/History';
import { cleanError } from "../../redux/actions/errorActions";
import TabItem from "./TabItem/TabItem";
import ClassRoom from "../NavItems/ClassRoom/ClassRoom";
import Interactive from "../NavItems/Interactive/Interactive";
import About from "../NavItems/About/About";
import Assistant from "../NavItems/Assistant/Assistant";
import MySnackbar from "../MySnackbar/MySnackbar";
import useMyStyles from "../Shared/MaterialUiStyles/useMyStyles";
import Footer from "../Shared/Footer/Footer";
import FeedBack from "../FeedBack/FeedBack";

import { ReactComponent as AnalysisIcon } from "./images/SVG/Video/Video_analysis.svg"
import { ReactComponent as KeyframesIcon } from "./images/SVG/Video/Keyframes.svg"
import { ReactComponent as ThumbnailsIcon } from "./images/SVG/Video/Thumbnails.svg"
import { ReactComponent as VideoRightsIcon } from "./images/SVG/Video/Video_rights.svg"

import { ReactComponent as MetadataIcon } from "./images/SVG/Image/Metadata.svg"
import { ReactComponent as MagnifierIcon } from "./images/SVG/Image/Magnifier.svg"
import { ReactComponent as ForensicIcon } from "./images/SVG/Image/Forensic.svg"
import { ReactComponent as GifIcon } from "./images/SVG/Image/Gif.svg"
import { ReactComponent as OcrIcon } from "./images/SVG/Image/OCR.svg"
//import { ReactComponent as AnalysisIconImage }  from "./images/SVG/Image/Analysis_img.svg"
import { ReactComponent as AnalysisIconImage } from "./images/SVG/Image/Image_analysis.svg"


import { ReactComponent as TwitterSearchIcon } from "./images/SVG/Search/Twitter_search.svg"
import { ReactComponent as CovidSearchIcon } from "./images/SVG/Search/Covid19.svg"
import { ReactComponent as XnetworkIcon } from "./images/SVG/Search/Xnetwork.svg"

import { ReactComponent as TwitterSnaIcon } from "./images/SVG/DataAnalysis/Twitter_sna.svg"

import { ReactComponent as ToolsIcon } from "./images/SVG/Navbar/Tools.svg"
import { ReactComponent as ClassroomIcon } from "./images/SVG/Navbar/Classroom.svg"
import { ReactComponent as InteractiveIcon } from "./images/SVG/Navbar/Interactive.svg"
//import { ReactComponent as FactcheckIcon } from "./images/SVG/Navbar/Fact_check.svg"
import { ReactComponent as AboutIcon } from "./images/SVG/Navbar/About.svg"
import { ReactComponent as AssistantIcon } from "./images/SVG/Navbar/Assistant.svg"
import { ReactComponent as GuideIcon } from "./images/SVG/Navbar/Guide.svg"

import { ReactComponent as LogoInvid2 } from "./images/SVG/Navbar/InVID.svg"
import { ReactComponent as LogoWeVerify2 } from "./images/SVG/Navbar/WeVerify.svg"


import { getSupportedBrowserLanguage } from "../Shared/Languages/getSupportedBrowserLanguage";
import useLoadLanguage from "../../Hooks/useLoadLanguage";
import tsv from "../../LocalDictionary/components/NavBar.tsv";
import tsvWarning from "../../LocalDictionary/components/Shared/OnWarningInfo.tsv";
import Snackbar from "@material-ui/core/Snackbar";
import { setFalse, setTrue } from "../../redux/actions/cookiesActions";
import { changeLanguage } from "../../redux/actions";
import Button from "@material-ui/core/Button";
import Alert from "@material-ui/lab/Alert";

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from "@material-ui/core/Typography";

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import Grid from "@material-ui/core/Grid";

import HelpOutlineIcon from '@material-ui/icons/HelpOutline';


function a11yProps(index) {
    return {
        id: `scrollable-force-tab-${index}`,
        'aria-controls': `scrollable-force-tabpanel-${index}`,
    };
}

const NavBar = (props) => {
    const classes = useMyStyles();
    const [open, setOpen] = React.useState(false);

    const tabValue = useSelector(state => state.nav);
    const drawerValue = useSelector(state => state.tool.selected);
    const cookiesUsage = useSelector(state => state.cookies);
    const currentLang = useSelector(state => state.language);
    const defaultLanguage = useSelector(state => state.defaultLanguage);

    const dispatch = useDispatch();

    const handleChange = (event, newValue) => {
        if (tabItems[newValue].path === "tools")
            history.push("/app/tools/" + drawerItems[newValue].path);
        else
            history.push("/app/" + tabItems[newValue].path)
    };

    const [openAlert, setOpenAlert] = React.useState(false);

    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenAlert(false);
    };

    const userAuthenticated = useSelector(
        (state) => state.userSession && state.userSession.userAuthenticated
    );
    
    const changeValue = (newValue) => {
        if (drawerItems[newValue].title === "navbar_twitter_sna" || drawerItems[newValue].title === "navbar_gif"){
            if (userAuthenticated){
                history.push("/app/tools/" + drawerItems[newValue].path);
            }else{
                setOpenAlert(true);
            }
        }else{
            history.push("/app/tools/" + drawerItems[newValue].path);
        }
    };

    const error = useSelector(state => state.error);
    const keyword = useLoadLanguage("components/NavBar.tsv", tsv);
    const keywordWarning = useLoadLanguage("components/Shared/OnWarningInfo.tsv", tsvWarning);



    const handleDrawerToggle = () => {
        setOpen(!open);
    };

    const drawerItems = [
        {
            title: "navbar_tools",
            icon: <ToolsIcon width="45px" height="45px" style={{ fill: "#4c4c4c" }} />,
            tsvPrefix: "all",
            path: "all",
        },

        {
            title: "navbar_analysis_video",
            description: "navbar_analysis_description",
            icon: (drawerValue === 1) ? <AnalysisIcon width="45px" height="45px" style={{ fill: "#51A5B2" }} title="Video analysis"/>
                : <AnalysisIcon width="45px" height="45px" style={{ fill: "#4c4c4c" }} title="Video analysis"/>,
            iconColored: <AnalysisIcon width="45px" height="45px" style={{ fill: "#51A5B2" }} title="Video analysis"/>,
            tsvPrefix: "api",
            path: "analysis",
        },
        {
            title: "navbar_keyframes",
            description: "navbar_keyframes_description",
            icon: (drawerValue === 2) ? <KeyframesIcon width="45px" height="45px" style={{ fill: "#51A5B2" }} title="Keyframes"/>
                : <KeyframesIcon width="45px" height="45px" style={{ fill: "#4c4c4c" }} title="Keyframes"/>,
            iconColored: <KeyframesIcon width="45px" height="45px" style={{ fill: "#51A5B2" }} title="Keyframes"/>,
            tsvPrefix: "keyframes",
            path: "keyframes",
        },
        {
            title: "navbar_thumbnails",
            description: "navbar_thumbnails_description",
            icon: (drawerValue === 3) ? <ThumbnailsIcon width="45px" height="45px" style={{ fill: "#51A5B2" }} title="Thumbnails"/>
                : <ThumbnailsIcon width="45px" height="45px" style={{ fill: "#4c4c4c" }} title="Thumbnails"/>,
            iconColored: <ThumbnailsIcon width="45px" height="45px" style={{ fill: "#51A5B2" }} title="Thumbnails"/>,
            tsvPrefix: "thumbnails",
            path: "thumbnails",
        },
        {
            title: "navbar_twitter",
            description: "navbar_twitter_description",
            icon: (drawerValue === 4) ? <TwitterSearchIcon width="45px" height="45px" style={{ fill: "#51A5B2" }} title="Twitter search"/>
                : <TwitterSearchIcon width="45px" height="45px" style={{ fill: "#4c4c4c" }} title="Twitter search"/>,
            iconColored: <TwitterSearchIcon width="45px" height="45px" style={{ fill: "#51A5B2" }} title="Twitter search"/>,
            tsvPrefix: "twitter",
            path: "twitter",
        },
        {
            title: "navbar_analysis_image",
            description: "navbar_analysis_image_description",
            icon: (drawerValue === 5) ? <AnalysisIconImage width="45px" height="45px" style={{ fill: "#51A5B2" }} title="Image analysis"/>
                : < AnalysisIconImage width="45px" height="45px" style={{ fill: "#4c4c4c" }} title="Image analysis"/>,
            iconColored: <AnalysisIconImage width="45px" height="45px" style={{ fill: "#51A5B2" }} title="Image analysis"/>,
            tsvPrefix: "api",
            path: "analysisImage",
        },
        {
            title: "navbar_magnifier",
            description: "navbar_magnifier_description",
            icon: (drawerValue === 6) ? <MagnifierIcon width="45px" height="45px" style={{ fill: "#51A5B2" }} title="Magnifier"/>
                : <MagnifierIcon width="45px" height="45px" style={{ fill: "#4c4c4c" }} title="Magnifier"/>,
            iconColored: <MagnifierIcon width="45px" height="45px" style={{ fill: "#51A5B2" }} title="Magnifier"/>,
            tsvPrefix: "magnifier",
            path: "magnifier",
        },
        {
            title: "navbar_metadata",
            description: "navbar_metadata_description",
            icon: (drawerValue === 7) ? <MetadataIcon width="45px" height="45px" style={{ fill: "#51A5B2" }} title="Metadata"/>
                : <MetadataIcon width="45px" height="45px" style={{ fill: "#4c4c4c" }} title="Metadata"/>,
            iconColored: <MetadataIcon width="45px" height="45px" style={{ fill: "#51A5B2" }} title="Metadata"/>,
            tsvPrefix: "metadata",
            path: "metadata",
        },
        {
            title: "navbar_rights",
            description: "navbar_rights_description",
            icon: (drawerValue === 8) ? <VideoRightsIcon width="45px" height="45px" style={{ fill: "#51A5B2" }} title="Video rights"/>
                : <VideoRightsIcon width="45px" height="45px" style={{ fill: "#4c4c4c" }} title="Video rights"/>,
            iconColored: <VideoRightsIcon width="45px" height="45px" style={{ fill: "#51A5B2" }} title="Video rights"/>,
            tsvPrefix: "copyright",
            path: "copyright",
        },
        {
            title: "navbar_forensic",
            description: "navbar_forensic_description",
            icon: (drawerValue === 9) ? <ForensicIcon width="45px" height="45px" style={{ fill: "#51A5B2" }} title="Forensic"/>
                : <ForensicIcon width="45px" height="45px" style={{ fill: "#4c4c4c" }} title="Forensic"/>,
            iconColored: <ForensicIcon width="45px" height="45px" style={{ fill: "#51A5B2" }} title="Forensic"/>,
            tsvPrefix: "forensic",
            path: "forensic",
        },
        
        {
            title: "navbar_twitter_sna",
            description: "navbar_twitter_sna_description",
            icon: (drawerValue === 10) ? <TwitterSnaIcon width="45px" height="45px" style={{ fill: "#51A5B2" }} title="Twitter SNA"/>
                : <TwitterSnaIcon width="45px" height="45px" style={{ fill: "#4c4c4c" }} title="Twitter SNA"/>,
            iconColored: <TwitterSnaIcon width="45px" height="45px" style={{ fill: "#51A5B2" }} title="Twitter SNA"/>,
            tsvPrefix: "twitter_sna",
            path: "twitterSna"
        },

        {
            title: "navbar_covidsearch",
            description: "navbar_covidsearch_description",
            icon: (drawerValue === 11) ? <CovidSearchIcon width="45px" height="45px" style={{ fill: "#51A5B2" }} title="Covid search"/>
                : <CovidSearchIcon width="45px" height="45px" style={{ fill: "#4c4c4c" }} title="Covid search"/>,
            iconColored: <CovidSearchIcon width="45px" height="45px" style={{ fill: "#51A5B2" }} title="Covid search"/>,
            tsvPrefix: "covidsearch",
            path: "covidSearch"
        },
        {
            title: "navbar_xnetwork",
            description: "navbar_xnetwork_description",
            icon: (drawerValue === 12) ? <XnetworkIcon width="45px" height="45px" style={{ fill: "#51A5B2" }} title="Xnetwork"/>
                : <XnetworkIcon width="45px" height="45px" style={{ fill: "#4c4c4c" }} title="Xnetwork"/>,
            iconColored: <XnetworkIcon width="45px" height="45px" style={{ fill: "#51A5B2" }} title="Xnetwork"/>,
            tsvPrefix: "xnetwork",
            path: "xnetwork"
        },
        {
            title: "navbar_ocr",
            description: "navbar_ocr_description",
            icon: (drawerValue === 13) ? <OcrIcon width="45px" height="45px" style={{ fill: "#51A5B2" }} title="OCR"/>
                : <OcrIcon width="45px" height="45px" style={{ fill: "#4c4c4c" }} title="OCR"/>,
            iconColored: <OcrIcon width="45px" height="45px" style={{ fill: "#51A5B2" }} title="OCR"/>,
            tsvPrefix: "ocr",
            path: "ocr"
        },

        {
            title: "navbar_gif",
            description: "navbar_gif_description",
            icon: (drawerValue === 14) ? <GifIcon width="45px" height="45px" style={{ fill: "#51A5B2" }} title="CheckGIF"/>
                : <GifIcon width="45px" height="45px" style={{ fill: "#4c4c4c" }} title="CheckGIF"/>,
            iconColored: <GifIcon width="45px" height="45px" style={{ fill: "#51A5B2" }} title="CheckGIF"/>,
            tsvPrefix: "gif",
            path: "gif"
        }
    ];


    const tabItems = [
        {
            title: "navbar_tools",
            icon: (tabValue === 0) ? <ToolsIcon width="40px" height="40px" style={{ fill: "#51A5B2" }} />
                : <ToolsIcon width="40px" height="40px" style={{ fill: "#4c4c4c" }} />,
            content: <div />,
            path: "tools",
            footer: <div />,
        },
        {
            title: "navbar_assistant",
            icon: (tabValue === 1) ? <AssistantIcon width="40px" height="40px" style={{ fill: "#51A5B2" }} />
                : <AssistantIcon width="40px" height="40px" style={{ fill: "#4c4c4c" }} />,
            content: <Assistant />,
            path: "assistant",
            footer: <Footer type={"usfd"} />
        },
        {
            title: "navbar_tuto",
            icon: (tabValue === 2) ? <GuideIcon width="40px" height="40px" style={{ fill: "#51A5B2" }} />
                : <GuideIcon width="40px" height="40px" style={{ fill: "#4c4c4c" }} />,
            content: <Tutorial />,
            path: "tutorial",
            footer: <Footer type={"afp"} />
        },
        {
            title: "navbar_quiz",
            icon: (tabValue === 3) ? <InteractiveIcon width="40px" height="40px" style={{ fill: "#51A5B2" }} />
                : <InteractiveIcon width="40px" height="40px" style={{ fill: "#4c4c4c" }} />,
            content: <Interactive />,
            path: "interactive",
            footer: <Footer type={"afp"} />
        },
        {
            title: "navbar_classroom",
            icon: (tabValue === 4) ? <ClassroomIcon width="40px" height="40px" style={{ fill: "#51A5B2" }} />
                : <ClassroomIcon width="40px" height="40px" style={{ fill: "#4c4c4c" }} />,
            content: <ClassRoom />,
            path: "classroom",
            footer: <Footer type={"afp"} />
        },
        /*{
            title: "navbar_factCheck",
            icon: (tabValue === 5) ? <FactcheckIcon width="40px" height="40px" style={{ fill: "#51A5B2" }} />
                : <FactcheckIcon width="40px" height="40px" style={{ fill: "#4c4c4c" }} />,
            content: <FactCheck />,
            path: "factCheck",
            footer: <Footer type={"afp"} />
        },*/
        {
            title: "navbar_about",
            icon: (tabValue === 5) ? <AboutIcon width="40px" height="40px" style={{ fill: "#51A5B2" }} />
                : <AboutIcon width="40px" height="40px" style={{ fill: "#4c4c4c" }} />,
            content: <About />,
            path: "about",
            footer: <Footer type={"afp"} />
        },

    ];

    const handleImageClick = () => {
        history.push("/app/tools/all");
    };

    useEffect(() => {
        let supportedBrowserLang = getSupportedBrowserLanguage();

        if (defaultLanguage !== null) {
            if (defaultLanguage !== currentLang) {
                dispatch(changeLanguage(defaultLanguage))
            }

        }
        else if (supportedBrowserLang !== undefined && supportedBrowserLang !== currentLang) {
            dispatch(changeLanguage(supportedBrowserLang))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const [stateStatisticsCookie, setStateStatisticsCookie] = React.useState(true);

    const [showExpl1, setShowExpl1] = React.useState(false);
    const [showExpl2, setShowExpl2] = React.useState(false);

    return (
        <div className={classes.flex}>
            <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleCloseAlert}>
                <Alert onClose={handleCloseAlert} severity="warning">
                    {keywordWarning("warning_advanced_tools")}
                </Alert>
            </Snackbar>

            <AppBar position="fixed" color="default" className={classes.appBar}>
                <Toolbar className={classes.toolbar}>
                    <Box display={{ xs: 'none', md: 'block' }}>
                    <LogoWeVerify2
                            height="55px"
                            width="77px"
                            alt="logo"
                            className={classes.logoLeft}
                            onClick={handleImageClick}
                        />  
                    </Box>

                    <Box display={{ xs: 'none', md: 'block' }}>
                    <LogoInvid2
                            height="40px"
                            width="60px"
                            alt="logo"
                            className={classes.logoRight}
                            onClick={handleImageClick}
                        />
                    </Box>


                    <div className={classes.grow} />
                    <Tabs
                        value={tabValue}
                        variant="scrollable"
                        onChange={handleChange}
                        scrollButtons="on"
                        indicatorColor="primary"
                        textColor="primary"
                        aria-label="scrollable force tabs example"
                        style={{ marginRight: "30px" }}
                    >
                        {
                            tabItems.map((item, index) => {
                                return <Tab key={index}
                                    label={keyword(item.title)}
                                    icon={item.icon}
                                    className={classes.tab}
                                    {...a11yProps(index)} />
                            })
                        }
                    </Tabs>
                    <div className={classes.grow} />
                    <Languages />

                </Toolbar>
            </AppBar>
            <Drawer hidden={tabValue !== 0 || (tabValue === 0 && drawerValue === 0)}
                variant="permanent"
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                })}
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    }),
                }}
                open={open}
            >
                <Box m={5} />
                <IconButton onClick={handleDrawerToggle}>
                    {!open ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                </IconButton>
                <Divider />
                <List>
                    {
                        drawerItems.map((item, key) => {
                            return (
                                <ListItem button key={key} onClick={() => changeValue(key)} >
                                    <ListItemIcon color="primary.main">
                                        {
                                            <IconButton className={classes.customAllToolsButton} style={{ "width": 40, "height": 40 }}>
                                                {item.icon}
                                            </IconButton>
                                        }
                                    </ListItemIcon>
                                    <ListItemText primary={keyword(item.title)} />
                                </ListItem>
                            )
                        })
                    }
                </List>
            </Drawer>
            <main className={classes.content}>
                <div className={classes.toolbar} id="back-to-top-anchor" />
                <TabItem className={classes.noMargin} tabItems={tabItems} drawerItems={drawerItems} />
                <ScrollTop {...props}>
                    <Fab color="secondary" size="small" aria-label="scroll back to top">
                        <KeyboardArrowUpIcon />
                    </Fab>
                </ScrollTop>
                {
                    (error !== null) &&
                    <MySnackbar variant="error" message={error} onClick={() => dispatch(cleanError())} />
                }
                {
                    cookiesUsage === null &&

                    <div>
                    <Dialog
                        fullWidth
                        maxWidth={'xs'}
                        open={true}
                        onClose={null}
                        aria-labelledby="max-width-dialog-title"
                    >
                        <Box p={2}>
                            <DialogTitle id="max-width-dialog-title">
                                <Typography gutterBottom style={{ color: "#51A5B2", fontSize: "24px" }}>
                                    We use cookies
                                </Typography>
                            </DialogTitle>
                            <DialogContent style={{ height: '270px' }}>

                                <Typography variant="body2">
                                    We need your authorization to use cookies, this is needed for the plugin to work properly, still, no personal data will be saved. You can chose what cookies you allow us to use. You can read more about it in our privacy policy
                                </Typography>

                                <Box m={4} />

                                    <Grid
                                        container
                                        direction="column"
                                        justify="flex-start"
                                        alignItems="flex-start"
                                    >


                                        <Grid item>
                                            <FormControlLabel
                                                control={<Checkbox color="primary" disabled checked={true} onChange={null} name="strictly" />}
                                                label="Strictly necessary"
                                            />
                                            <IconButton aria-label="delete" className={classes.margin} size="small" onClick={() => setShowExpl1(!showExpl1)}>
                                                <HelpOutlineIcon fontSize="inherit" />
                                            </IconButton>
                                        </Grid>


                                        {showExpl1 &&
                                        <Grid item>
                                            <Box ml={4}>
                                                <Typography variant="body2" style={{ color: "#828282"}}>
                                                We need this cookies for the language funcionality
                                            </Typography>
                                            </Box>
                                        </Grid>
                                        }

                                        <Grid item>
                                            <FormControlLabel
                                                control={<Checkbox color="primary" checked={stateStatisticsCookie} name="strictly" />}
                                                label="Statistics"
                                            />
                                            <IconButton aria-label="delete" className={classes.margin} size="small" onClick={() => setShowExpl2(!showExpl2)}>
                                                <HelpOutlineIcon fontSize="inherit" />
                                            </IconButton>
                                        </Grid>

                                        {showExpl2 &&
                                        <Grid item>
                                            <Box ml={4}>
                                                <Typography variant="body2" style={{ color: "#828282" }}>
                                                We need this cookies to perform statistical analysis with google analystics
                                            </Typography>
                                            </Box>
                                        </Grid>
                                        }

                                    </Grid>


                                

                            </DialogContent>
                            <DialogActions>


                                <Button variant="contained" color="primary" onClick={null} fullWidth>
                                    Accept selection
                                </Button>

                            </DialogActions>
                        </Box>
                    </Dialog>

                    
                    

                    </div>
                }
                <FeedBack />
            </main>
        </div>
    );
};
export default React.memo(NavBar);



/*

<Snackbar
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                        open={true}
                        message={keyword("cookies_message")}
                        action={[
                            <Button key={"cookies_decline"} color={"secondary"} size={"small"} onClick={() => dispatch(setFalse())}> {keyword("cookies_decline")} </Button>,
                            <Button key={"cookies_accept"} color={"primary"} size={"small"} onClick={() => dispatch(setTrue())}> {keyword("cookies_accept")} </Button>,
                        ]}
                    />


*/