import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import React, { useState, Component, useRef } from "react";
import { useSelector } from "react-redux";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import useLoadLanguage from "../../../../../Hooks/useLoadLanguage";
import tsv from "../../../../../LocalDictionary/components/NavItems/tools/Forensic.tsv";
import useMyStyles from "../../../../Shared/MaterialUiStyles/useMyStyles";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Divider from '@material-ui/core/Divider';
import InfoIcon from '@material-ui/icons/Info';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';
import CloseIcon from '@material-ui/icons/Close';
import GifIcon from '@material-ui/icons/Gif';
import Fab from '@material-ui/core/Fab';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import Fade from '@material-ui/core/Fade';
import Slider from '@material-ui/core/Slider';
import useGetGif from "../../GIF/Hooks/useGetGif";
import { setStateDownloading } from "../../../../../redux/actions/tools/gifActions";
import { useDispatch } from "react-redux";
import useGetTransparent from "../Hooks/useGetTransparent";
import { cleanForensicState } from "../../../../../redux/actions/tools/forensicActions"

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
                    <Typography component="span">{children}</Typography>
                </Box>
            )}
        </div>
    );
}


export class Instructions extends Component {

    render() {
        return (
            <HelpOutlineIcon />
        )
    }

}


const ForensicResults = (props) => {

    const dispatch = useDispatch();

    const theme = createMuiTheme({
        overrides: {

            MuiCardHeader: {
                root: {
                    backgroundColor: "#05A9B4",
                },
                title: {
                    color: 'white',
                    fontSize: 20,
                    fontweight: 500,
                }
            },

            MuiTab: {
                wrapper: {
                    fontSize: 12,

                },
                root: {
                    minWidth: "25%!important",
                }
            },

        },

        palette: {
            primary: {
                light: '#5cdbe6',
                main: '#05a9b4',
                dark: '#007984',
                contrastText: '#fff',
            },
        },

    });

    const classes = useMyStyles();
    const keyword = useLoadLanguage("components/NavItems/tools/Forensic.tsv", tsv);
    const results = props.result.filters;
    const masks = props.masksData;
    //console.log(results);

    /*
        --- COMPRESSION ---
        zero_report - Zero
        ghost_report - GHOST
        cagi_report - CAGI
        adq1_report - DQ
        dct_report - DCT
        blk_report - BLOCK
        --- NOISE ---
        splicebuster_report - Splicebuster
        wavelet_report - Wavelet
        --- DEEP LEARNING ---
        mantranet_report - MANTRANET
        fusion_report - FUSION
        --- CLONING ---
        cmfd_report - CMFD
        rcmfd_report - RCMFD
        
        
        --- LENSES ---
        ela_report - ELA
        laplacian_report - LAPLACIAN
        median_report - Median
    */

    const filtersIDs = [
        //COMPRESSION
        "zero_report",  //0
        "ghost_report", //1
        "cagi_report",  //2
        "adq1_report",  //3
        "dct_report",   //4
        "blk_report",   //5

        //NOISE
        "splicebuster_report",  //6
        "wavelet_report",       //7

        //DEEP LEARNING
        "mantranet_report", //8
        "fusion_report",    //9

        //CLONING
        "cmfd_report",  //10
        "rcmfd_report", //11

        //LENSES
        
        "ela_report",       //12
        "laplacian_report", //13
        "median_report",    //14
        
    ];



    const idStartCompression = 0;
    const idStartNoise = 6;
    const idStartDeepLearning = 8;
    const idStartCloning = 10;
    const idStartLenses = 12;

    console.log();


    //console.log(results);

    const filters = useRef(filtersIDs.map((value) => {

        var filter;

        //Zero
        if (value === "zero_report") {
            filter = {
                "id": value,
                "name": keyword("forensic_title_" + value),
                "map": [
                    results[value]["forgery"]["colormap"],
                    results[value]["votemap"]["colormap"],
                ],
                "currentDisplayed": 0,
                "arrows": [false, false],
                "mask": [
                    results[value]["forgery"]["transparent"],
                    results[value]["votemap"]["transparent"],
                ],
            }
            
        //GHOST
        }else if(value === "ghost_report") {
            filter = {
                "id": value,
                "name": keyword("forensic_title_" + value),
                "map": results[value]["colormap"],
                "currentDisplayed": 0,
                "arrows": [false, false],
                "mask": results[value]["transparent"],
            }

        //CAGI
        } else if (value === "cagi_report") {
            filter = {
                "id": value,
                "name": [
                    keyword("forensic_title_cagiNormal"),
                    keyword("forensic_title_cagiInversed"),
                ],
                "map": [
                    results[value]["cagiNormalReport"]["colormap"],
                    results[value]["cagiInversedReport"]["colormap"],
                ],
                "currentDisplayed": 0,
                "arrows": [false, false],
                "mask": [
                    results[value]["cagiNormalReport"]["transparent"],
                    results[value]["cagiInversedReport"]["transparent"],
                ],
            }


        //RCMFD
        } else if (value === "rcmfd_report") {
            filter = {
                "id": value,
                "name": keyword("forensic_title_" + value),
                "map": results[value],
                "mask": results[value],
            }
            


        //LENSES
        } else if (value === "ela_report" || value === "laplacian_report" || value === "median_report") {
            filter = {
                "id": value,
                "name": keyword("forensic_title_" + value),
                "map": results[value],
            }


            /*
        } else if (value === "dct_report") {
            filter = {
                "id": value,
                "name": keyword("forensic_title_" + value),
                "map": results[value]["colormap"],
                "mask": masks.DCTOutput,
            }
        } else if (value === "blk_report") {
            filter = {
                "id": value,
                "name": keyword("forensic_title_" + value),
                "map": results[value]["colormap"],
                "mask": masks.BLKOutput,
            }
        } else if (value === "splicebuster_report") {
            filter = {
                "id": value,
                "name": keyword("forensic_title_" + value),
                "map": results[value]["colormap"],
                "mask": masks.SBOutput,
            }
        } else if (value === "wavelet_report") {
            filter = {
                "id": value,
                "name": keyword("forensic_title_" + value),
                "map": results[value]["colormap"],
                "mask": masks.DWNoiseOutput,
            }
        } else if (value === "mantranet_report") {
            filter = {
                "id": value,
                "name": keyword("forensic_title_" + value),
                "map": results[value]["colormap"],
                "mask": masks.MANTRANETOutput,
            }
        } else if (value === "fusion_report") {
            filter = {
                "id": value,
                "name": keyword("forensic_title_" + value),
                "map": results[value]["colormap"],
                "mask": masks.FusionOutput,
            }
        } else if (value === "cmfd_report") {
            filter = {
                "id": value,
                "name": keyword("forensic_title_" + value),
                "map": results[value]["colormap"],
                "mask": masks.CMFDOutput,
            }
        } else if (value === "rcmfd_report") {
            filter = {
                "id": value,
                "name": keyword("forensic_title_" + value),
                "map": results[value]["colormap"],
                "mask": results[value]["map"],
            }

            */
        } else {
            filter = {
                "id": value,
                "name": keyword("forensic_title_" + value),
                "map": results[value]["colormap"],
                "mask": results[value]["transparent"],
            }
        }



        return filter;
    }));

    /*

    const numbersGhost = results["ghost_report"]["qualities"];
    const ghostMasks = [];

    for (var i = 0; i < numbersGhost.length; i++) {
        const stringMask = "GhostOutput" + numbersGhost[i];
        ghostMasks.push(masks[stringMask]);
    }
    */





    //console.log(filters);
    //console.log(results);

    const tabs = [0, 1, 2, 3];

    //Hover effect of the filters
    //============================================================================================
    const [filterHoverEnabled, setFilterHoverEnabled] = React.useState(false);
    const [filterHover, setFilterHover] = useState(props.url);

    function displayFilterHover(map) {
        setFilterHover(map);
        setFilterHoverEnabled(true);
    }

    function hideFilterHover(e) {
        setFilterHoverEnabled(false);
    }


    //Button analyze new image
    //============================================================================================
    function newImage() {
        dispatch(cleanForensicState());
        props.resetImage();
    }


    //Help of the lenses
    //============================================================================================
    const [anchorHelpLenses, setAnchorHelpLenses] = React.useState(null);
    const openHelpLenses = Boolean(anchorHelpLenses);
    const helpLenses = openHelpLenses ? 'simple-popover' : undefined;


    function clickHelpLenses(event) {
        setAnchorHelpLenses(event.currentTarget);
    }

    function closeHelpLenses() {
        setAnchorHelpLenses(null);
    }


    //Help of the Filters
    //============================================================================================
    const [anchorHelpFilters, setAnchorHelpFilters] = React.useState(null);
    const openHelpFilters = Boolean(anchorHelpFilters);
    const helpFilters = openHelpFilters ? 'simple-popover' : undefined;


    function clickHelpFilters(event) {
        setAnchorHelpFilters(event.currentTarget);
    }

    function closeHelpFilters() {
        setAnchorHelpFilters(null);
    }


    //Navigation and Gif of filters
    //============================================================================================

    function arrowsToDisplay(filter) {
        //left, right
        var arrows = [false, false]
        var filterData = filters.current.find(x => x.id === filter);
        if (filterData.map.length === 1) {
            return;
        }
        if (filterData.currentDisplayed === 0) {
            arrows[1] = true;
            filters.current.find(x => x.id === filter).arrows = arrows;
        } else if (filterData.currentDisplayed === filterData.map.length - 1) {
            arrows[0] = true;
            filters.current.find(x => x.id === filter).arrows = arrows;
        } else {
            arrows[0] = true;
            arrows[1] = true;
            filters.current.find(x => x.id === filter).arrows = arrows;
        }

    }


    function clickArrowFilter(filter, arrow) {
        filters.current.find(x => x.id === filter).currentDisplayed += arrow;
        arrowsToDisplay(filter);
        displayFilterHover(filters.current.find(x => x.id === filter).mask[filters.current.find(x => x.id === filter).currentDisplayed]);
    }


    //Gif popover
    //============================================================================================
    const [anchorGifPopover, setAnchorGifPopover] = React.useState(null);
    const openGifPopover = Boolean(anchorGifPopover);
    const gifPopover = openGifPopover ? 'simple-popover' : undefined;
    const gifImage = props.url;
    const [gifFilter, setGifFilter] = React.useState(props.url);
    const gifFilterMask = useSelector(state => state.forensic.maskUrl);
    //console.log(gifFilterMask);

    const [interval, setIntervalVar] = React.useState(null);

    const downloading = useSelector(state => state.gif.toolState);


    const [readyTransparency, setReadyTransparency] = React.useState(false);

    //nsparent(gifFilter, readyTransparency);

    function clickGifPopover(event, filter) {
        var url;
        if (filter === "zero_report" || filter === "ghost_report" || filter === "cagi_report") {
            url = filters.current.find(x => x.id === filter).mask[filters.current.find(x => x.id === filter).currentDisplayed]
            setGifFilter(url);
            //console.log(url);

            setReadyTransparency(true);

        } else {
            url = filters.current.find(x => x.id === filter).mask;
            setGifFilter(url);
            //console.log(url);

            setReadyTransparency(true);
        }
        setIntervalVar(setInterval(() => animateFilter(), 1100));
        setAnchorGifPopover(event.currentTarget);

    }

    function closeGifPopover() {
        clearInterval(interval);
        setAnchorGifPopover(null);
        setReadyTransparency(false);
    }




    function animateFilter() {
        console.log("Loop function");
        console.log(interval);
        var x = document.getElementById("gifFilterElement");
        if (x.style.display === "none") {
            console.log("display");
            x.style.display = "block";
        } else {
            x.style.display = "none";
        }
    }


    const marks = [
        {
            value: -1700,
            label: 'Slow',
        },
        {
            value: -500,
            label: 'Fast',
        },
    ];

    const [speed, setSpeed] = React.useState(1100);

    function changeValueSpeed(value) {
        console.log("Change value speed: " + value);
        setSpeed(value * -1);
    }

    function changeSpeed(value) {
        console.log("Change speed: " + value);
        clearInterval(interval);
        setIntervalVar(setInterval(() => animateFilter(), (value)));

    }


    const [filesForGif, setFilesForGif] = useState();
    const [delayGif, setDelayGif] = useState();
    //const [readyToDownload, setReadyToDownload] = useState();

    


    const handleDownloadGif = () => {
        dispatch(setStateDownloading());
        var files = {
            "image1": gifImage,
            "image2": gifFilter,
        }
        setFilesForGif(files);
        setDelayGif(speed);
        
    };

    useGetGif(filesForGif, delayGif, downloading);


    //const dispatch = useDispatch();

    //const variable = useSelector(state => state.forensic.gifAnimation);

    /*
    //const [gifAnimation, setGifAnimation] = React.useState(props.gifAnimation)
    useEffect(() => {
    function blinkFilter() {
        console.log("blinking");
        const variable = useSelector(state => state.forensic.gifAnimation);
        console.log(variable);
        if(variable){
            dispatch(setForensicsGifAnimateHide());
        }else{
            dispatch(setForensicsGifAnimateShow());
        }
        
        //console.log(useSelector(state => state.forensic.gifAnimation));
        //setGifAnimation(false);
    }});
    */


    // para organizar
    const imageDisplayed = props.url;
    //tabs
    const [value, setValue] = React.useState(0)
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };



    //console.log("Downloading: " + downloading);



    return (
        <div>


            <div className={classes.newForensics}>
                <ThemeProvider theme={theme}>
                    <Box mt={5} mb={5}>
                        <Grid container spacing={3}>

                            <Grid item xs={6} style={{ display: "flex", flexDirection: "column" }}>

                                <Card>
                                    <CardHeader
                                        title={
                                            <Grid
                                                container
                                                direction="row"
                                                justify="space-between"
                                                alignItems="center">

                                                <span >{keyword("forensic_title_image")}</span>
                                                <Button variant="contained" style={{ backgroundColor: "#FFFFFF" }} onClick={newImage}>
                                                    {keyword("forensic_button_newImage")}
                                                </Button>

                                            </Grid>
                                        }
                                        className={classes.headerUpladedImage}
                                    />

                                    <div className={classes.wrapperImageFilter}>
                                        <CardMedia
                                            component="img"
                                            className={classes.imageUploaded}
                                            image={imageDisplayed}
                                        />
                                        <Fade in={filterHoverEnabled} timeout={300}>
                                            <CardMedia
                                                component="img"
                                                className={classes.filterDisplayedClass}
                                                image={filterHover}
                                            />
                                        </Fade>
                                    </div>
                                </Card>

                                <Box mt={3}></Box>

                                <Card className={classes.lensesCard}>
                                    <CardHeader
                                        title={
                                            <Grid
                                                container
                                                direction="row"
                                                justify="space-between"
                                                alignItems="center">
                                                <span>{keyword("forensic_title_lenses")}</span>
                                                <HelpOutlineIcon style={{ color: "#FFFFFF" }} onClick={clickHelpLenses} />

                                                <Popover
                                                    id={helpLenses}
                                                    open={openHelpLenses}
                                                    anchorEl={anchorHelpLenses}
                                                    onClose={closeHelpLenses}
                                                    PaperProps={{
                                                        style: {
                                                            width: '300px',
                                                            fontSize: 14
                                                        },
                                                    }}
                                                    anchorOrigin={{
                                                        vertical: 'bottom',
                                                        horizontal: 'center',
                                                    }}
                                                    transformOrigin={{
                                                        vertical: 'top',
                                                        horizontal: 'center',
                                                    }}>

                                                    <Box p={3}>
                                                        <Grid
                                                            container
                                                            direction="row"
                                                            justify="space-between"
                                                            alignItems="strech">

                                                            <Typography variant="h6" gutterBottom>
                                                                {keyword("forensic_title_what")}
                                                            </Typography>

                                                            <CloseIcon onClick={closeHelpLenses} />
                                                        </Grid>

                                                        <Box m={1} />
                                                        <Typography variant="body2">
                                                            {keyword("forensic_lenses_explanation")}
                                                        </Typography>

                                                    </Box>

                                                </Popover>

                                            </Grid>
                                        }
                                    />


                                    <Box p={3}>

                                        <Grid container spacing={3}>
                                            {
                                                filters.current.slice(idStartLenses).map((value, key) => {
                                                    return (
                                                        <Grid key={key} item xs={4} >
                                                            <CardMedia
                                                                className={classes.imageFilter}
                                                                image={value.map}
                                                                onMouseOver={() => displayFilterHover(value.map)}
                                                                onMouseLeave={hideFilterHover}
                                                            />
                                                            <Box align="center" width="100%" className={classes.lensesTitles}>{value.name}</Box>
                                                        </Grid>
                                                    )
                                                })
                                            }
                                        </Grid>
                                    </Box>

                                </Card>
                            </Grid>

                            <Grid item xs={6}>
                                <Card className={classes.cardFilters}>
                                    <CardHeader
                                        title={

                                            <Grid
                                                container
                                                direction="row"
                                                justify="space-between"
                                                alignItems="center">

                                                <span>{keyword("forensic_title_filters")}</span>
                                                <HelpOutlineIcon style={{ color: "#FFFFFF" }} onClick={clickHelpFilters} />

                                                <Popover
                                                    id={helpFilters}
                                                    open={openHelpFilters}
                                                    anchorEl={anchorHelpFilters}
                                                    onClose={closeHelpFilters}
                                                    PaperProps={{
                                                        style: {
                                                            width: '300px',
                                                            fontSize: 14
                                                        },
                                                    }}
                                                    anchorOrigin={{
                                                        vertical: 'bottom',
                                                        horizontal: 'center',
                                                    }}
                                                    transformOrigin={{
                                                        vertical: 'top',
                                                        horizontal: 'center',
                                                    }}
                                                >
                                                    <Box p={3}>
                                                        <Grid
                                                            container
                                                            direction="row"
                                                            justify="space-between"
                                                            alignItems="strech">

                                                            <Typography variant="h6" gutterBottom>
                                                                {keyword("forensic_title_what")}
                                                            </Typography>

                                                            <CloseIcon onClick={closeHelpFilters} />
                                                        </Grid>
                                                        <Box m={1} />
                                                        <Typography variant="body2">
                                                            {keyword("forensic_filters_explanation")}
                                                        </Typography>

                                                    </Box>
                                                </Popover>

                                            </Grid>
                                        }
                                    >
                                    </CardHeader>

                                    <Tabs value={value} onChange={handleChange} indicatorColor={'primary'}>
                                        <Tab label={keyword("forensic_family_compression_title")} />
                                        <Tab label={keyword("forensic_family_noise_title")} />
                                        <Tab label={keyword("forensic_family_ai_title")} />
                                        <Tab label={keyword("forensic_family_cloning_title")} />
                                    </Tabs>


                                    {tabs.map((valueTab, keyTab) => {

                                        var filtersTab = [];
                                        var textDescription = "";
                                        var textLook = "";
                                        var textIgnore = "";

                                        if (valueTab === 0) {
                                            filtersTab = filters.current.slice(idStartCompression, idStartNoise);
                                            textDescription = keyword("forensic_family_compression_description");
                                            textLook = keyword("forensic_family_compression_look");
                                            textIgnore = keyword("forensic_family_compression_ignore");

                                        } else if (valueTab === 1) {
                                            filtersTab = filters.current.slice(idStartNoise, idStartDeepLearning);
                                            textDescription = keyword("forensic_family_noise_description");
                                            textLook = keyword("forensic_family_noise_look");
                                            textIgnore = keyword("forensic_family_noise_ignore");

                                        } else if (valueTab === 2) {
                                            filtersTab = filters.current.slice(idStartDeepLearning, idStartCloning);
                                            textDescription = keyword("forensic_family_ai_description");
                                            textLook = keyword("forensic_family_ai_look");
                                            textIgnore = keyword("forensic_family_ai_ignore");

                                        } else {
                                            filtersTab = filters.current.slice(idStartCloning, idStartLenses);
                                            textDescription = keyword("forensic_family_cloning_description");
                                            textLook = keyword("forensic_family_cloning_look");
                                            textIgnore = keyword("forensic_family_cloning_ignore");

                                        }

                                        return (

                                            <TabPanel value={value} key={keyTab} index={valueTab}>
                                                <Grid container spacing={3}>

                                                    {filtersTab.map((value, key) => {
                                                        if ((value.id === "zero_report" || value.id === "ghost_report" || value.id === "cagi_report")) {
                                                            arrowsToDisplay(value.id);
                                                        }

                                                        /*
                                                        if (value.id === "ghost_report") {
                                                            value.mask = ghostMasks;
                                                        }
                                                        */


                                                        return (
                                                            <Grid key={key} item xs={4} >

                                                                {(value.id === "zero_report" || value.id === "ghost_report" || value.id === "cagi_report")
                                                                    ? <div
                                                                        className={classes.imageOverlayWrapper}
                                                                        onMouseOver={() => displayFilterHover(value.mask[value.currentDisplayed])}
                                                                        onMouseLeave={hideFilterHover}>

                                                                        <CardMedia
                                                                            className={classes.imageFilter}
                                                                            image={value.map[value.currentDisplayed]}
                                                                        />

                                                                        <div className={classes.imageOverlay} >

                                                                            <Grid
                                                                                container
                                                                                direction="row"
                                                                                justify="space-around"
                                                                                alignItems="center">

                                                                                {value.arrows[0]
                                                                                    ? <Fab size="small" style={{ backgroundColor: "#ffffff" }} onClick={() => clickArrowFilter(value.id, -1)}>
                                                                                        <NavigateBeforeIcon style={{ color: "#000000" }} />
                                                                                    </Fab>

                                                                                    : <Fab size="small" style={{ visibility: "hidden" }}>
                                                                                        <NavigateBeforeIcon />
                                                                                    </Fab>
                                                                                }
                                                                                <Fab size="medium" style={{ backgroundColor: "#ffffff" }} onClick={(e) => clickGifPopover(e, value.id)}>
                                                                                    <GifIcon style={{ color: "#000000" }} />
                                                                                </Fab>

                                                                                {value.arrows[1]
                                                                                    ? <Fab size="small" style={{ backgroundColor: "#ffffff" }} onClick={() => clickArrowFilter(value.id, 1)}>
                                                                                        <NavigateNextIcon style={{ color: "#000000" }} />
                                                                                    </Fab>

                                                                                    : <Fab size="small" style={{ visibility: "hidden" }}>
                                                                                        <NavigateNextIcon />
                                                                                    </Fab>
                                                                                }
                                                                            </Grid>
                                                                        </div>

                                                                    </div>

                                                                    : <div
                                                                        className={classes.imageOverlayWrapper}
                                                                        onMouseOver={() => displayFilterHover(value.mask)}
                                                                        onMouseLeave={hideFilterHover}>

                                                                        <CardMedia
                                                                            className={classes.imageFilter}
                                                                            image={value.map}
                                                                        />

                                                                        <div className={classes.imageOverlay} >

                                                                            <Grid
                                                                                container
                                                                                direction="row"
                                                                                justify="space-around"
                                                                                alignItems="center">

                                                                                <Fab size="medium" style={{ backgroundColor: "#ffffff" }} onClick={(e) => clickGifPopover(e, value.id)}>
                                                                                    <GifIcon style={{ color: "#000000" }} />
                                                                                </Fab>

                                                                            </Grid>
                                                                        </div>

                                                                    </div>
                                                                }


                                                                {(value.id === "cagi_report")
                                                                    ? <Box align="center" width="100%">{value.name[value.currentDisplayed]}</Box>
                                                                    : <Box align="center" width="100%">{value.name}</Box>
                                                                }
                                                            </Grid>
                                                        )
                                                    })}

                                                </Grid>


                                                <Box mt={2} mb={2}>
                                                    <Divider />
                                                </Box>

                                                <Box display="flex" mb={2}>
                                                    <Box mr={2}>
                                                        <InfoIcon style={{ color: "#333333" }} />
                                                    </Box>
                                                    <Box>{textDescription}</Box>
                                                </Box>

                                                <Box display="flex" mb={2}>
                                                    <Box mr={2}>
                                                        <CheckCircleIcon style={{ color: "#8BC34A" }} />
                                                    </Box>
                                                    <Box>{textLook}</Box>
                                                </Box>

                                                <Box display="flex" mb={2}>
                                                    <Box mr={2}>
                                                        <CancelIcon style={{ color: "#EB5757" }} />
                                                    </Box>
                                                    <Box>{textIgnore}</Box>
                                                </Box>

                                            </TabPanel>
                                        )
                                    })}
                                </Card>
                            </Grid>

                        </Grid>



                        <Popover
                            id={gifPopover}
                            open={openGifPopover}
                            anchorEl={anchorGifPopover}
                            onClose={closeGifPopover}
                            anchorReference="anchorPosition"
                            anchorPosition={{ top: 0, left: 0 }}
                            PaperProps={{
                                style: {
                                    width: '70vw',
                                    height: '70vh',
                                    marginTop: '15vh',
                                    marginLeft: '15vw',
                                    marginBottom: '15vh',
                                    marginRight: '15vw',
                                    fontSize: 14,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                },
                            }}
                            anchorOrigin={{
                                vertical: 'center',
                                horizontal: 'center',
                            }}
                            transformOrigin={{
                                vertical: 'center',
                                horizontal: 'center',
                            }}
                        >

                            <Box p={3}>
                                <Grid
                                    container
                                    direction="row"
                                    justify="space-between"
                                    alignItems="stretch">

                                    <Typography variant="h6" gutterBottom>
                                        Export the result as a GIF
                                    </Typography>

                                    <CloseIcon onClick={closeGifPopover} />
                                </Grid>
                                <Box m={1} />

                                <Box justifyContent="center" className={classes.wrapperImageFilter}>

                                    <CardMedia
                                        component="img"
                                        className={classes.imagesGifImage}
                                        image={gifImage}
                                    />
                                    {true &&
                                        <CardMedia
                                            component="img"
                                            className={classes.imagesGifFilter}
                                            style={{ display: "none" }}
                                            image={gifFilter}
                                            id="gifFilterElement"
                                        />
                                    }
                                </Box>



                                <Grid
                                    container
                                    direction="column"
                                    justify="center"
                                    alignItems="center"
                                >
                                    <Box m={4} />

                                    <Typography gutterBottom>
                                        Speed of the animation
                                    </Typography>


                                    <Slider
                                        defaultValue={-1100}
                                        aria-labelledby="discrete-slider"
                                        step={300}
                                        marks={marks}
                                        min={-1700}
                                        max={-500}
                                        scale={x => -x}
                                        onChange={(e, val) => changeValueSpeed(val)}
                                        onChangeCommitted={(e) => changeSpeed(speed)}
                                        className={classes.sliderClass}
                                    />



                                    <Box m={2} />


                                    <Button variant="contained" color="primary" onClick={(e) => handleDownloadGif(e)}>
                                        Download
                                    </Button>
                                </Grid>


                            </Box>

                        </Popover>

                    </Box>
                </ThemeProvider>

            </div>

        </div>
    )
};
export default ForensicResults;