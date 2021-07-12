import React from "react";
import {useDispatch, useSelector} from "react-redux";
import useMyStyles from "../../../../Shared/MaterialUiStyles/useMyStyles";
import Grid from "@material-ui/core/Grid";
import useLoadLanguage from "../../../../../Hooks/useLoadLanguage";
import tsv from "../../../../../LocalDictionary/components/NavItems/tools/Conversation.tsv";
import { TwitterTweetEmbed } from 'react-twitter-embed';
import ReactWordcloud from 'react-wordcloud';
import {select} from "d3-selection";
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";

import Plot from 'react-plotly.js';

const ConversationView = () => {
    
    const classes = useMyStyles();
    const keyword = useLoadLanguage("components/NavItems/tools/Conversation.tsv", tsv);
    const statusID = useSelector(state => state.conversation.conversation.root.id);
    const tweetID = useSelector(state => state.conversation.tweet.id);
    const conversation = useSelector(state => state.conversation.conversation);
    const conversationStance = useSelector(state => state.conversation.tweet.stance_conversation);
    
    const hashtagCloud = useSelector(state => state.conversation.cloud)
    const stance = useSelector(state => state.conversation.stance)
    const urlTableData = conversation.urls
    const dispatch = useDispatch();

    console.log(Object.keys(urlTableData).length);

    function getCallback(callback) {
        return function (word, event) {
            const isActive = callback !== "onWordMouseOut";
            const element = event.target;
            const text = select(element);
            text
                .on("click", () => {
                    if (isActive) {window.open(`https://twitter.com/hashtag/${word.text.substring(1)}?f=live`, "_blank");}
                })
                .transition()
                .attr("text-decoration", isActive ? "underline" : "none");
        };
    }

    const options = {
        rotations: 1,
        rotationAngles: [0],
        fontSizes: [15,60],
        // TODO pull this automatically from somewhere?
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif"
    };

    const callbacks = {
        onWordClick: getCallback("onWordClick"),
        onWordMouseOut: getCallback("onWordMouseOut"),
        onWordMouseOver: getCallback("onWordMouseOver")
    }

    return (
        <Grid
            container
            direction="row"
            spacing={3}
            alignItems="flex-start">
            
            <Grid item xs={6}>
                { tweetID !== statusID ? <div>
                <Typography variant="body1">The tweet you entered</Typography>
                <TwitterTweetEmbed tweetId={tweetID} options={{conversation: 'none', lang: 'en', dnt: true}} />

                <Typography variant="body1">has a stance label of "{conversationStance}" to the tweet at the root of the conversation:  </Typography>
                </div>
                : null }
                <TwitterTweetEmbed tweetId={statusID} options={{conversation: 'none', lang: 'en', dnt: true}} />
                </Grid>
            <Grid item xs={6}>
                <Typography variant="body1">The stance of the {conversation.number_of_replies} replies within the conversation breaks down as follows:</Typography>
                <Plot style= {{width:"100%"}} data={[stance]} layout={ { autosize:true, showlegend: false }} useResizeHandler={true} config = {{'displayModeBar': false}} />
                
                <Typography variant="body1">The {hashtagCloud.length !== 100 ? "hashtags" : "top 100 hashtags"} appearing in the replies:</Typography>
                <div style={{height: 500}}>
                    <ReactWordcloud words={hashtagCloud} options={options} callbacks={callbacks} />
                </div>

                <Typography variant="body1">The {Object.keys(urlTableData).length === 10 ? "ten most frequently occuring" : ""} URLs within the replies are:</Typography>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>URL</TableCell>
                                <TableCell>Appearances</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Object.keys(urlTableData).map((row, key) => (
                                <TableRow key={key}>
                                    <TableCell><Link href="{row}" target="_blank">{row}</Link></TableCell>
                                    <TableCell>{urlTableData[row]}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>


    )
}

export default ConversationView;