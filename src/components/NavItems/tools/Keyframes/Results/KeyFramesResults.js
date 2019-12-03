import React, {useState} from "react";
import Paper from "@material-ui/core/Paper";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {useDispatch, useSelector} from "react-redux";
import ImageGridList from "../../../../utility/ImageGridList/ImageGridList";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import {useKeyframes} from "../Hooks/usekeyframes";
import ImageReverseSearch from "../../ImageReverseSearch";
import CloseResult from "../../../../CloseResult/CloseResult";
import {cleanForensicState} from "../../../../../redux/actions/tools/forensicActions";
import {cleanKeyframesState} from "../../../../../redux/actions/tools/keyframesActions";

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3, 2),
        marginTop: 5,
        textAlign: "center",
    },
}));

const KeyFramesResults = (props) => {
    const classes = useStyles();
    const dictionary = useSelector(state => state.dictionary);
    const lang = useSelector(state => state.language);
    const keyword = (key) => {
        return (dictionary !== null) ? dictionary[lang][key] : "";
    };
    const dispatch = useDispatch();

    const [detailed, setDetailed] = useState(false);
    const [simpleList, detailedList] = useKeyframes(props.result, [props.result]);

    const toggleDetail = () => {
        setDetailed(!detailed);
    };
    return (
        <div>
            <Paper className={classes.root}>
                <CloseResult onClick={() => dispatch(cleanKeyframesState())}/>
                <Typography variant={"h5"}>
                    {keyword("keyframes_content_title")}
                </Typography>
                <Typography variant={"body1"}>
                    {keyword("keyframes_tip")}
                </Typography>
                <Box m={2}/>
                <Divider/>
                <Box m={2}/>
                <Button color={"primary"} onClick={() => toggleDetail()}>
                    {
                        !detailed ? keyword("keyframe_title_get_detail")
                            : keyword("keyframe_title_get_simple")
                    }
                </Button>
                <Box m={2}/>
                {
                    detailed &&
                    <ImageGridList list={detailedList}/>
                }
                {
                    !detailed &&
                    <ImageGridList list={simpleList} onClick={(url) => ImageReverseSearch("google", url)}/>
                }
            </Paper>
        </div>
    )
};
export default React.memo(KeyFramesResults);