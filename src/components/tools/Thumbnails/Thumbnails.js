import {Paper} from "@material-ui/core";
import CustomTile from "../../customTitle/customTitle";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import MySnackbar from "../../MySnackbar/MySnackbar";
import React, {useState} from "react";
import ImageReverseSearch from "../ImageReverseSearch";
import ImageGridList from "../../ImageGridList/ImageGridList";
import {useSelector} from "react-redux";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {green} from "@material-ui/core/colors";
import Radio from "@material-ui/core/Radio";
import FormControl from "@material-ui/core/FormControl";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";


const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3, 2),
        marginTop: 5,
        textAlign: "center",
    },
    buttonSuccess: {
        backgroundColor: green[500],
        '&:hover': {
            backgroundColor: green[700],
        },
    },
    buttonProgress: {
        color: green[500],
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
    error: {
        backgroundColor: theme.palette.error.main,
    },
    message: {
        display: 'flex',
        alignItems: 'center',
    },
    card: {
        maxWidth: "60%",
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
}));

const Thumbnails = () => {
    const classes = useStyles();

    const dictionary = useSelector(state => state.dictionary);
    const lang = useSelector(state => state.language);
    const keyword = (key) => {
        return (dictionary !== null) ? dictionary[lang][key] : "";
    };

    const [urlRef, setUrlRef] = useState(null);
    const [errors, setErrors] = useState(null);
    const [imageList, setImageList] = useState([]);
    const [selectedValue, setSelectedValue] = React.useState('google');

    const handleChange = event => {
        setSelectedValue(event.target.value);
    };

    const searchEngines = [
        {
            title : "baidu",
            text : "Baidu"
        },
        {
            title : "bing",
            text : "Bing"
        },
        {
            title : "google",
            text : "Google"
        },
        {
            title : "tineye",
            text : "Tineye"
        },
        {
            title : "yandex",
            text : "Yandex"
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
        let url = urlRef.value.replace("?rel=0", "");
        if (url !== null && url !== "" && isYtUrl(url)) {
            setImageList(get_images(url));
            ImageReverseSearch(selectedValue, imageList);
        }
        else
            setErrors("Please use a valid Youtube Url (add to tsv)");
    };

    const imageClick = (event) => {
        ImageReverseSearch(selectedValue, event.target.src)
    };

    return (
        <div>
            <Paper className={classes.root}>
                <CustomTile> {keyword("youtube_title")}  </CustomTile>
                <br/>
                <TextField
                    inputRef={ref => setUrlRef(ref)}
                    id="standard-full-width"
                    label={keyword("api_input")}
                    placeholder={keyword("youtube_input")}
                    fullWidth
                />
                <Box m={2}/>
                <FormControl component="fieldset">
                    <RadioGroup aria-label="position" name="position" value={selectedValue} onChange={handleChange} row>
                        {
                            searchEngines.map((item, key) => {
                                return (
                                    <FormControlLabel
                                        key={key}
                                        value={item.title}
                                        control={<Radio color="primary" />}
                                        label={item.text}
                                        labelPlacement="end"
                                    />
                                );
                            })
                        }
                    </RadioGroup>
                </FormControl>
                <Box m={2}/>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={submitForm}
                >
                    {keyword("button_submit")}
                </Button>
            </Paper>

            {
                imageList.length !== 0 &&
                <Paper className={classes.root}>
                    <ImageGridList list={imageList} onClick={imageClick}/>
                </Paper>
            }
            <div>
                {
                    errors && <MySnackbar variant="error" message={errors} onClick={() => setErrors("")}/>
                }
            </div>
        </div>);
};
export default Thumbnails;