import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import {Box, CardHeader} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import HelpDialog from "../../Shared/HelpDialog/HelpDialog";
import Icon from "@material-ui/core/Icon";
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import LinkIcon from '@material-ui/icons/Link';
import Typography from "@material-ui/core/Typography";

import assistantIcon from "../../NavBar/images/navbar/assistant-icon-primary.svg";
import {setImageVideoSelected, setUrlMode} from "../../../redux/actions/tools/assistantActions";
import tsv from "../../../LocalDictionary/components/NavItems/tools/Assistant.tsv";
import useLoadLanguage from "../../../Hooks/useLoadLanguage";
import useMyStyles from "../../Shared/MaterialUiStyles/useMyStyles";


const AssistantIntroduction = (props) => {

    // styles, language, dispatch, params
    const classes = useMyStyles();
    const dispatch = useDispatch();
    const keyword = useLoadLanguage("components/NavItems/tools/Assistant.tsv", tsv);

    const [classButtonURL, setClassButtonURL] = useState(null);
    const [classButtonLocal, setClassButtonLocal] = useState(null);

    const [classIconURL, setClassIconURL] = useState(classes.bigButtonIcon);
    const [classIconLocal, setClassIconLocal] = useState(classes.bigButtonIcon);

    const [showURL, setShowURL] = useState(false);
    const [showLocal, setShowLocal] = useState(false);

    const[firstRender, setFirstRender] = useState(true);

    
    if (!showURL && !showLocal && classButtonURL !== classes.bigButtonDivSelectted && classButtonLocal !== classes.bigButtonDiv && firstRender) {
        setClassButtonURL(classes.bigButtonDiv);
        setClassButtonLocal(classes.bigButtonDiv);
        setFirstRender(false);
    }
    

    

    //form states
    const urlMode = useSelector(state => state.assistant.urlMode);
    const imageVideoSelected = useSelector(state => state.assistant.imageVideoSelected);

    if (urlMode && classButtonURL !== classes.bigButtonDivSelectted) {
        setClassButtonURL(classes.bigButtonDivSelectted);
        setClassIconURL(classes.bigButtonIconSelectted);
    } else if (imageVideoSelected && classButtonLocal !== classes.bigButtonDivSelectted){
        setClassButtonLocal(classes.bigButtonDivSelectted);
        setClassIconLocal(classes.bigButtonIconSelectted);
    }

    const cleanAssistant = () => props.cleanAssistant();
    


    return (
        <Grid item xs={12} className={classes.assistantGrid}>

            <Typography variant={"h4"} color={"primary"}>
                <Icon style={{marginRight: "10px"}}><img className={classes.svgIcon} src={assistantIcon} alt={""}/></Icon>
                {keyword("assistant_title")}
            </Typography>

            <Box m={1}/>

            <Typography>
                {keyword("assistant_intro")}
            </Typography>

            <Box m={4}/>

            <Box boxShadow={3}>
                <Card variant={"outlined"}>
                    <CardHeader
                        className={classes.assistantCardHeader}
                        title={
                            <Typography style={{fontWeight: "bold", fontSize: 20}}>
                                {keyword("assistant_choose")}
                            </Typography>}
                        action={
                            <div style={{"display": "flex", "marginTop": 10}}>
                                {<HelpDialog
                                    title={"assistant_help_title"}
                                    paragraphs={[
                                        "assistant_help_1",
                                        "assistant_help_2",
                                        "assistant_help_3",
                                        "assistant_help_4"
                                    ]}
                                    keywordFile="components/NavItems/tools/Assistant.tsv"/>}
                            </div>
                        }
                    />

                    <CardContent>
                        <Box m={2}>
                            <Grid container spacing={3} alignItems="center">
                                <Grid item xs={6}>

                                    <Box p={3} className={classButtonURL} 
                                        onClick={() => {
                                            if (!urlMode){
                                                window.scroll({ top: 200, left: 0, behavior: 'smooth' });
                                                cleanAssistant()
                                                dispatch(setUrlMode(!urlMode))
                                                setClassButtonURL(classes.bigButtonDivSelectted);
                                                setClassIconURL(classes.bigButtonIconSelectted);

                                                setClassButtonLocal(classes.bigButtonDiv);
                                                setClassIconLocal(classes.bigButtonIcon);

                                                setShowURL(true);
                                                setShowLocal(false);
                                            }
                                        }}>
                                        <Grid
                                            container
                                            direction="row"
                                            alignItems="center"
                                            style={{flexWrap:"nowrap"}}
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
                                                        <Typography variant="body1" style={{ fontWeight: 600 }}>{keyword("assistant_webpage_header")}</Typography>
                                                    </Grid>

                                                    <Box mt={1} />

                                                    <Grid item>
                                                        <Typography variant="body1">{keyword("assistant_webpage_text") }</Typography>
                                                    </Grid>

                                                </Grid>
                                            </Grid>

                                        </Grid>
                                    </Box>

                                </Grid>


                                <Grid item xs={6}>

                                    <Box p={3} className={classButtonLocal} 
                                        onClick={() => {
                                            if (!imageVideoSelected) {
                                                setTimeout(function () { window.scroll({ top: 320, left: 0, behavior: 'smooth' }); }, 100);

                                                cleanAssistant()
                                                dispatch(setImageVideoSelected(!imageVideoSelected))
                                                setClassButtonURL(classes.bigButtonDiv);
                                                setClassIconURL(classes.bigButtonIcon);

                                                setClassButtonLocal(classes.bigButtonDivSelectted);
                                                setClassIconLocal(classes.bigButtonIconSelectted);

                                                setShowURL(false);
                                                setShowLocal(true);
                                            }
                                        }}>
                                        <Grid
                                            container
                                            direction="row"
                                            alignItems="center"
                                            style={{ flexWrap:"nowrap" }}
                                        >
                                            <Grid item>
                                                <Box ml={1} mr={2}>
                                                    <InsertDriveFileIcon className={classIconLocal} />
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
                                                        <Typography variant="body1" style={{ fontWeight: 600 }}>{keyword("assistant_file_header")}</Typography>
                                                    </Grid>

                                                    <Box mt={1} />

                                                    <Grid item>
                                                        <Typography variant="body1">{keyword("assistant_file_text")}</Typography>
                                                    </Grid>

                                                </Grid>
                                            </Grid>

                                        </Grid>
                                    </Box>

                                </Grid>

                            </Grid>
                        </Box>

                    </CardContent>
                </Card>
            </Box>
        </Grid>
    )
};

export default AssistantIntroduction;