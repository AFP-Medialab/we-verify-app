import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import useGetImages from "./Hooks/useGetImages";
import LinearProgress from "@material-ui/core/LinearProgress";
import ForensicResults from "./Results/ForensicResult";
import useMyStyles from "../../../Shared/MaterialUiStyles/useMyStyles";
import {useParams} from 'react-router-dom'
import useLoadLanguage from "../../../../Hooks/useLoadLanguage";
import tsv from "../../../../LocalDictionary/components/NavItems/tools/Forensic.tsv";
import {submissionEvent} from "../../../Shared/GoogleAnalytics/GoogleAnalytics";
import LocalFile from "../Forensic/LocalFile/LocalFile";
import {KNOWN_LINKS} from "../../Assistant/AssistantRuleBook";
import { ReactComponent as ForensicIcon } from '../../../NavBar/images/SVG/Image/Forensic.svg';
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import LinkIcon from '@material-ui/icons/Link';
import FileIcon from '@material-ui/icons/InsertDriveFile';
import HeaderTool from "../../../Shared/HeaderTool/HeaderTool";
import Divider from '@material-ui/core/Divider';

const Forensic = () => {
    const {url} = useParams();
    const classes = useMyStyles();
    const keyword = useLoadLanguage("components/NavItems/tools/Forensic.tsv", tsv);
    const keywordAllTools = useLoadLanguage("components/NavItems/tools/Alltools.tsv", tsv);


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

    // state used to toggle localFile view
    const [localFile, setLocalFile] = useState(false);
    const resultUrl = useSelector(state => state.forensic.url);
    const resultData = useSelector(state => state.forensic.result);
    const isLoading = useSelector(state => state.forensic.loading);
    const gifAnimationState = useSelector(state => state.forensic.gifAnimation);
    const masks = useSelector(state => state.forensic.masks);

    //console.log(gifAnimationState);

    const [input, setInput] = useState(resultUrl);
    const [image, setImage] = useState("");
    const [urlDetected, setUrlDetected] = useState(false)
    const [loaded, setLoaded] = useState(false);

    useGetImages(image);

    
    const submitUrl = () => {
        if (input && input !== "") {
            setLoaded(true);
            submissionEvent(input);
            setImage(input);
        }
    };

    useEffect(() => {
        if (url) {
            if (url === KNOWN_LINKS.OWN) {
                setLocalFile(true)
            } else {
                const uri = decodeURIComponent(url);
                setInput(uri)
            }
        }
        setUrlDetected(true)

    }, [url]);

    useEffect(() => {
        if (urlDetected){
            submitUrl()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [urlDetected])

    useEffect(() => {
        setImage("")
    }, [image]);

    const loading = useSelector(state => state.forensic.loading);

    const [classButtonURL, setClassButtonURL] = useState(null);
    const [classButtonLocal, setClassButtonLocal] = useState(null);

    const [classIconURL, setClassIconURL] = useState(classes.bigButtonIconSelectted);
    const [classIconLocal, setClassIconLocal] = useState(classes.bigButtonIcon);

    const [showURL, setShowURL] = useState(true);
    const [showLocal, setShowLocal] = useState(false);

    if (showURL && !showLocal && classButtonURL !== classes.bigButtonDivSelectted && classButtonLocal !== classes.bigButtonDiv) {
        setClassButtonURL(classes.bigButtonDivSelectted);
        setClassButtonLocal(classes.bigButtonDiv);
    }

    const clickURL = () => {
        setClassButtonURL(classes.bigButtonDivSelectted);
        setClassIconURL(classes.bigButtonIconSelectted);

        setClassButtonLocal(classes.bigButtonDiv);
        setClassIconLocal(classes.bigButtonIcon);

        setShowURL(true);
        setShowLocal(false);

        setLocalFile(false);
    }

    const clickLocal = () => {
        setClassButtonURL(classes.bigButtonDiv);
        setClassIconURL(classes.bigButtonIcon);

        setClassButtonLocal(classes.bigButtonDivSelectted);
        setClassIconLocal(classes.bigButtonIconSelectted);

        setShowURL(false);
        setShowLocal(true);

        setLocalFile(true);
    }
    const resetImage = () => {
        setLoaded(false);
        setInput("");
    }

    return (
        <div>
            <ThemeProvider theme={theme}>

            {//=== Title ===
            }

            <HeaderTool name={keywordAllTools("navbar_forensic")} description={keywordAllTools("navbar_forensic_description")} icon={<ForensicIcon style={{ fill: "#51A5B2" }} />}/>

            <Card  style={{ display: loaded ? "none" : "block" }}>
                <CardHeader
                    title={keyword("cardheader_source")}
                    className={classes.headerUpladedImage}
                />
                <Box p={3}>

                    <Grid container spacing={3} alignItems="center">
                        <Grid item xs={6}>

                            <Box p={3} className={classButtonURL} onClick={clickURL}>
                                <Grid
                                    container
                                    direction="row"
                                    alignItems="center"

                                >
                                    <Grid item>
                                        <Box ml={1} mr={2}>
                                            <LinkIcon className={classIconURL} />
                                        </Box>

                                    </Grid>

                                    <Grid item>
                                        <Grid
                                            container
                                            direction="column"
                                            justify="flex-start"
                                            alignItems="flex-start"
                                        >
                                            <Grid item>
                                                <Typography variant="body1" style={{ fontWeight: 600 }}>{keyword("linkmode_title")}</Typography>
                                            </Grid>

                                            <Box mt={1} />

                                            <Grid item>
                                                <Typography variant="body1">{keyword("linkmode_description")}</Typography>
                                            </Grid>

                                        </Grid>
                                    </Grid>

                                </Grid>
                            </Box>

                        </Grid>


                        <Grid item xs={6}>

                            <Box p={3} className={classButtonLocal} onClick={clickLocal}>
                                <Grid
                                    container
                                    direction="row"
                                    alignItems="center"

                                >
                                    <Grid item>
                                        <Box ml={1} mr={2}>
                                            <FileIcon className={classIconLocal} />
                                        </Box>

                                    </Grid>

                                    <Grid item>
                                        <Grid
                                            container
                                            direction="column"
                                            justify="flex-start"
                                            alignItems="flex-start"
                                        >
                                            <Grid item>
                                                <Typography variant="body1" style={{ fontWeight: 600 }}>{keyword("filemode_title")}</Typography>
                                            </Grid>

                                            <Box mt={1} />

                                            <Grid item>
                                                    <Typography variant="body1">{keyword("filemode_description")}</Typography>
                                            </Grid>

                                        </Grid>
                                    </Grid>

                                </Grid>
                            </Box>

                        </Grid>

                    </Grid>

                    <Box mt={4} mb={4}>
                        <Divider />
                    </Box>
                    

                    <Box display={localFile ? "none" : "block"}>

                        <Grid container
                            direction="row"
                            spacing={3}
                            alignItems="center"
                        >
                            <Grid item xs>

                                <TextField
                                    value={input}
                                    id="standard-full-width"
                                    label={keyword("forensic_input")}
                                    placeholder={keyword("forensic_input_placeholder")}
                                    fullWidth
                                    variant="outlined"
                                    disabled={isLoading}
                                    onChange={e => {
                                        setInput(e.target.value)
                                    }}
                                />
                            </Grid>
                            <Grid item>
                                <Button variant="contained" color="primary" onClick={submitUrl} disabled={isLoading} style={{height: "50px"}}>
                                    {keyword("button_submit")}
                                </Button>
                            </Grid>
                        </Grid>
                        
                        
                    </Box>


                    <Box display={!localFile ? "none" : "block"}>
                        {localFile &&<LocalFile />}
                    </Box>

                
                </Box>
            </Card>
            
            {loading &&
                <LinearProgress />
            }
            
            {
                resultData &&
                <ForensicResults 
                    result={resultData}
                    url={resultUrl}
                    loaded={loaded}
                    gifAnimation={gifAnimationState}
                    resetImage={resetImage}
                    masksData={masks}
                    />
            }
        </ThemeProvider>
        </div>
    );
};
export default Forensic;