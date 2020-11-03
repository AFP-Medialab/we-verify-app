import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {Paper} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import LocalFile from "./LocalFile/LocalFile";
import CustomTile from "../../../Shared/CustomTitle/CustomTitle";
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";
import Divider from '@material-ui/core/Divider';
import KeyFramesResults from "./Results/KeyFramesResults";
import {useKeyframeWrapper} from "./Hooks/useKeyframeWrapper";
import useMyStyles from "../../../Shared/MaterialUiStyles/useMyStyles";
import {useParams} from 'react-router-dom'
import useLoadLanguage from "../../../../Hooks/useLoadLanguage";
import tsv from "../../../../LocalDictionary/components/NavItems/tools/Keyframes.tsv";
import {submissionEvent} from "../../../Shared/GoogleAnalytics/GoogleAnalytics";
import {CONTENT_TYPE} from "../../Assistant/AssistantRuleBook";

const Keyframes = (props) => {
    const {url} = useParams();

    const classes = useMyStyles();
    const keyword = useLoadLanguage("components/NavItems/tools/Keyframes.tsv", tsv);

    // state used to toggle localFile view
    const [localFile, setLocalFile] = useState(false);
    const toggleLocal = () => {
        setLocalFile(!localFile);
    };

    const resultUrl = useSelector(state => state.keyframes.url);
    const resultData = useSelector(state => state.keyframes.result);
    const isLoading = useSelector(state => state.keyframes.loading);
    const message = useSelector(state => state.keyframes.message);
    const video_id = useSelector(state => state.keyframes.video_id);

    // State used to load images
    const [input, setInput] = useState((resultUrl) ? resultUrl : "");
    const [submittedUrl, setSubmittedUrl] = useState(undefined);
    useKeyframeWrapper(submittedUrl);

    //human right
    const downloadShubshots = useSelector(state => state.humanRightsCheckBox)
    //download subshots results
    const downloadAction = () => {
        let downloadlink = "http://multimedia2.iti.gr/video_analysis/keyframes/" + video_id + "/Subshots";
        fetch(downloadlink).then(
            response => {
                response.blob().then(blob => {
					let url = window.URL.createObjectURL(blob);
					let a = document.createElement('a');
                    a.href = url;
                    a.click()});
            });

    }

    const submitUrl = () => {
        submissionEvent(input);
        setSubmittedUrl(input);
    };

    useEffect(() => {
        const uri = (url !== undefined) ? decodeURIComponent(url) : undefined;
        if (uri !== undefined) {
            if (url === CONTENT_TYPE.VIDEO) {
                setLocalFile(true)
            }
            else {
                setInput(uri);
                setSubmittedUrl(uri);
            }

        }
    }, [url]);

    useEffect(() => {
        setSubmittedUrl(undefined)
    }, [submittedUrl]);

    return (
        <div>
            <Paper className={classes.root}>
                <CustomTile text={keyword("keyframes_title")}/>
                <Box m={1}/>
                <Box display={localFile ? "none" : "block"}>
                    <Button variant="contained" color="primary" onClick={toggleLocal}>
                        {keyword("button_localfile")}
                    </Button>
                    <Box m={2}/>
                    <Divider/>
                    <TextField
                        id="standard-full-width"
                        label={keyword("keyframes_input")}
                        style={{margin: 8}}
                        placeholder="URL"
                        fullWidth
                        disabled={isLoading}
                        value={input}
                        onChange={e => setInput(e.target.value)}
                    />
                    <Box m={2}/>
                    <Button variant="contained" color="primary" onClick={submitUrl} disabled={isLoading}>
                        {keyword("button_submit")}
                    </Button>
                    <Box m={1}/>
                    <LinearProgress hidden={!isLoading}/>
                    <Typography variant="body1" hidden={!isLoading}>
                        {message}
                    </Typography>
                </Box>
                <Box display={!localFile ? "none" : "block"}>
                    <Button variant="contained" color="primary" onClick={toggleLocal}>
                        {keyword("forensic_card_back")}
                    </Button>
                    <LocalFile/>
                </Box>
            </Paper>
            <div>
                {
                    resultData &&
                    <KeyFramesResults result={resultData}/>
                }
            </div>
            <div>
                {
                    (resultData && downloadShubshots) ? 
                    <Button color="primary" onClick={downloadAction}>
                        {keyword("keyframes_download_subshots")}
                    </Button> : <div/>
                }            
            </div>
        </div>
    );
};
export default React.memo(Keyframes);