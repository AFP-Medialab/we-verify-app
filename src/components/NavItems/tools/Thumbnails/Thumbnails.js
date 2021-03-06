import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import React, {useEffect, useState} from "react";
import ImageReverseSearch from "../ImageReverseSearch";
import ImageGridList from "../../../Shared/ImageGridList/ImageGridList";
import {useDispatch, useSelector} from "react-redux";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import useMyStyles from "../../../Shared/MaterialUiStyles/useMyStyles";
import {useInput, loadImageSize, useLoading} from "../../../../Hooks/useInput";
import {
    cleanThumbnailsState,
    setThumbnailsResult, setThumbnailsLoading} from "../../../../redux/actions/tools/thumbnailsActions"
import {setError} from "../../../../redux/actions/errorActions"
import CloseResult from "../../../Shared/CloseResult/CloseResult";
import Checkbox from "@material-ui/core/Checkbox";
import FormGroup from "@material-ui/core/FormGroup";
import useLoadLanguage from "../../../../Hooks/useLoadLanguage";
import tsv from "../../../../LocalDictionary/components/NavItems/tools/Thumbnails.tsv";
import {submissionEvent} from "../../../Shared/GoogleAnalytics/GoogleAnalytics";
import OnClickInfo from "../../../Shared/OnClickInfo/OnClickInfo";
import {useParams} from 'react-router-dom'

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import { ReactComponent as ThumbnailsIcon } from '../../../NavBar/images/SVG/Video/Thumbnails.svg';
import Grid from "@material-ui/core/Grid";
import HeaderTool from "../../../Shared/HeaderTool/HeaderTool";
import LinearProgress from "@material-ui/core/LinearProgress";


const Thumbnails = () => {
    const {url} = useParams();

    const classes = useMyStyles();
    const keyword = useLoadLanguage("components/NavItems/tools/Thumbnails.tsv", tsv);
    const keywordAllTools = useLoadLanguage("components/NavItems/tools/Alltools.tsv", tsv);

    const resultUrl = useSelector(state => state.thumbnails.url);
    const resultData = useSelector(state => state.thumbnails.result);
    const isLoading = useSelector(state => state.thumbnails.loading);
    const [height, setHeight] = useState(0);
    const [showResult, setShowResult] = useState(false);
    var cols = 3;

    const dispatch = useDispatch();

    const input = useInput(resultUrl);
    const [selectedValue, setSelectedValue] = React.useState({
        'google': true,
        'bing': false,
        'tineye': false,
        'yandex': false,
        'openTabs': true,
        'reddit': false,

    });

    const handleChange = event => {
        setSelectedValue({
            ...selectedValue,
            [event.target.value]: event.target.checked
        });
    };

    const searchEngines = [
        {
            title: "bing",
            text: "Bing"
        },
        {
            title: "google",
            text: "Google"
        },
        {
            title: "tineye",
            text: "Tineye"
        },
        {
            title: "yandex",
            text: "Yandex"
        },
        {
            title: "reddit",
            text: "Reddit"
        },
    ];

    const getYtIdFromUrlString = (url) => {
        let id = "";
        let start_url = "https://www.youtube.com";
        let start_url_short = "https://youtu.be";
        if (url.startsWith(start_url)) {
            let path = url.substring(start_url.length);
            if (path.match(/\/watch\?/)) {
                id = url.match(/v=([^&]+)/)[1];
            } else if (path.match(/\/v\//) || url.match(/\/embed\/(.*)/)) {
                id = url.substring(url.lastIndexOf("/") + 1);
            }
        } else if (url.startsWith(start_url_short)) {
            id = url.substring(url.lastIndexOf("/") + 1);
        }
        return id;
    };

    const get_images = (url) => {
        let video_id = getYtIdFromUrlString(url);
        let img_url = "http://img.youtube.com/vi/%s/%d.jpg";
        let img_arr = [];
        for (let count = 0; count < 4; count++) {
            img_arr.push(img_url.replace("%s", video_id).replace("%d", count));
        }
        return img_arr;
    };

    const isYtUrl = (url) => {
        let start_url = "https://www.youtube.com/";
        let start_url_short = "https://youtu.be/";
        return url.startsWith(start_url) || url.startsWith(start_url_short);
    };

    const submitForm = () => {
        setShowResult(false);
        dispatch(setError(null));
        let url = input.value.replace("?rel=0", "");
        if (url !== null && url !== "" && isYtUrl(url)) {
            submissionEvent(url);
            let images = get_images(url);
            dispatch(setThumbnailsResult(url, images, false, true));
            if(selectedValue.openTabs)
                images.forEach(img => imageClickUrl(img));
        } else
            dispatch(setError("Please use a valid Youtube Url (add to tsv)"));
    };

    const imageClickUrl = (url) => {
        if (selectedValue.google)
            ImageReverseSearch("google", [url]);
        if (selectedValue.yandex)
            ImageReverseSearch("yandex", [url]);
        if (selectedValue.bing)
            ImageReverseSearch("bing", [url]);
        if (selectedValue.tineye)
            ImageReverseSearch("tineye", [url]);
        if (selectedValue.reddit)
            ImageReverseSearch("reddit", [url]);
    };

    const computeHeight = async() =>{
        loadImageSize(resultData, cols)
                .then((height) => {setHeight(height); setShowResult(true)})
                .then((height) => {return height} )
                .catch((e) => {return null});
    };
    
    const [getHeight, isImgLoading] = useLoading(computeHeight);
    useEffect(() => {
        if (url !== undefined) {
            const uri = (url !== null) ? decodeURIComponent(url) : undefined;
            dispatch(setThumbnailsResult(uri, resultData, false, false));
        }
        if(resultData){
            getHeight();
        }
        // eslint-disable-next-line 
    }, [url, dispatch, resultData]);

   // const response = getHeight();
    useEffect(() => {
        if(resultData){
            getHeight();
        }
        // eslint-disable-next-line 
      }, [resultData]);

    useEffect(()=> {
        if(showResult){
            dispatch(setThumbnailsLoading(false));
        }
    },[showResult, dispatch]);



    return (
        <div>
            <HeaderTool name={keywordAllTools("navbar_thumbnails")} description={keywordAllTools("navbar_thumbnails_description")} icon={<ThumbnailsIcon style={{ fill: "#51A5B2" }} />} />

            <Card>
                <CardHeader
                    title={keyword("cardheader_link")}
                    className={classes.headerUpladedImage}
                />
                <Box p={3}>

                    <Grid
                        container
                        direction="row"
                        spacing={3}
                        alignItems="center"
                    >
                        <Grid item xs>
                            <TextField
                                id="standard-full-width"
                                label={keyword("youtube_input")}
                                placeholder={keyword("api_input")}
                                fullWidth
                                variant="outlined"
                                {...input}
                            />

                        </Grid>

                        <Grid item>
                            {<FormControlLabel
                                control={
                                    <Checkbox
                                        checked={selectedValue["openTabs"]}
                                        value={"openTabs"}
                                        onChange={e => handleChange(e)}
                                        color="primary"
                                    />
                                }
                                label={keyword("openTabs")}
                                labelPlacement="end"
                            />}
                        </Grid>
                        <Grid item>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={submitForm}
                            >
                                {keyword("button_submit")}
                            </Button>
                        </Grid>
                    
                    </Grid>

                    <Box m={2} />
                    <FormControl component="fieldset">
                        <FormGroup row>
                            {
                                searchEngines.map((item, key) => {
                                    return (
                                        <FormControlLabel
                                            key={key}
                                            control={
                                                <Checkbox
                                                    checked={selectedValue[item.title]}
                                                    value={item.title}
                                                    onChange={e => handleChange(e)}
                                                    color="primary"
                                                />
                                            }
                                            label={item.text}
                                            labelPlacement="end"
                                        />
                                    );
                                })
                            }
                            
                        </FormGroup>
                    </FormControl>
                    <Box m={3} hidden={!isLoading}/>
                    <LinearProgress hidden={!isLoading}/>
                    
                </Box>
            </Card>

            <Box m={3} />

            {
                resultData && resultData.length !== 0 && !isImgLoading &&
                <Card>
                    <CardHeader
                        title={keyword("cardheader_results")}
                        className={classes.headerUpladedImage}
                    />
                    <div className={classes.root2}>
                        <CloseResult onClick={() => dispatch(cleanThumbnailsState())}/>
                        <OnClickInfo keyword={"thumbnails_tip"}/>
                        <Box m={2}/>

                        <ImageGridList list={resultData} handleClick={imageClickUrl} height={height} cols={cols} />
                        
                    </div>
                </Card>
            }
        </div>);
};
export default Thumbnails;