import {Paper} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import React from "react";
import Typography from "@material-ui/core/Typography";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Table from "@material-ui/core/Table";
import Box from "@material-ui/core/Box";
import Tooltip from "@material-ui/core/Tooltip";
import useMyStyles from "../../../utility/MaterialUiStyles/useMyStyles";
import CloseResult from "../../../CloseResult/CloseResult";
import {cleanMetadataState} from "../../../../redux/actions/tools/metadataActions";


const MetadataVideoResult = (result) => {
    const classes = useMyStyles();
    const dictionary = useSelector(state => state.dictionary);
    const lang = useSelector(state => state.language);
    const keyword = (key) => {
        return (dictionary !== null) ? dictionary[lang][key] : "";
    };

    const report = result["result"];

    let videoMetadata = [
        {
            title: keyword("metadata_name_1"),
            value: report.hasMoov.toString(),
            description: keyword("metadata_desc_1"),
        },
        {
            title: keyword("metadata_name_2"),
            value: report.duration,
            description: keyword("metadata_desc_2"),

        },
        {
            title: keyword("metadata_name_3"),
            value: report.timescale,
            description: keyword("metadata_desc_3"),
        },
        {
            title: keyword("metadata_name_4"),
            value: report.fragment_duration,
            description: keyword("metadata_desc_4"),
        },
        {
            title: keyword("metadata_name_5"),
            value: report.isFragmented.toString(),
            description: keyword("metadata_desc_5"),
        },
        {
            title: keyword("metadata_name_6"),
            value: report.isProgressive.toString(),
            description: keyword("metadata_desc_6"),
        },
        {
            title: keyword("metadata_name_7"),
            value: report.hasIOD.toString(),
            description: keyword("metadata_desc_7"),
        },
        {
            title: keyword("metadata_name_8"),
            value: (report.brands && report.brands.length > 0) ? report.brands.toString() : null,
            description: keyword("metadata_desc_8"),
        },
        {
            title: keyword("metadata_name_9"),
            value: (report.created) ? report.created.toString() : null,
            description: keyword("metadata_desc_9"),
        },
        {
            title: keyword("metadata_name_10"),
            value: (report.modified) ? report.modified.toString() : null,
            description: keyword("metadata_desc_10"),
        },
    ];

    let videoTrack;
    if (report.videoTracks[0]) {
        videoTrack = [
            {
                title: keyword("track_name_1"),
                value: report.videoTracks[0].id,
                description: keyword("track_name_1"),
            },
            {
                title: keyword("track_name_2"),
                value: (report.videoTracks[0].references && report.videoTracks[0].references.length > 0) ? report.videoTracks[0].references.toString() : null,
                description: keyword("track_name_2"),
            },
            {
                title: keyword("track_name_3"),
                value: (report.videoTracks[0].created) ? report.videoTracks[0].created.toString() : null,
                description: keyword("track_name_3"),
            },
            {
                title: keyword("track_name_4"),
                value: (report.videoTracks[0].modified) ? report.videoTracks[0].modified.toString() : null,
                description: keyword("track_name_4"),
            },
            {
                title: keyword("track_name_5"),
                value: report.videoTracks[0].movie_duration,
                description: keyword("track_name_5"),
            },
            {
                title: keyword("track_name_6"),
                value: report.videoTracks[0].layer,
                description: keyword("track_name_6"),
            },
            {
                title: keyword("track_name_7"),
                value: report.videoTracks[0].alternate_group,
                description: keyword("track_name_7"),
            },
            {
                title: keyword("track_name_8"),
                value: report.videoTracks[0].volume,
                description: keyword("track_name_8"),
            },
            {
                title: keyword("track_name_9"),
                value: report.videoTracks[0].track_width,
                description: keyword("track_name_9"),
            },
            {
                title: keyword("track_name_10"),
                value: report.videoTracks[0].track_height,
                description: keyword("track_name_10"),
            },
            {
                title: keyword("track_name_11"),
                value: report.videoTracks[0].timescale,
                description: keyword("track_name_11"),
            },
            {
                title: keyword("track_name_12"),
                value: report.videoTracks[0].duration,
                description: keyword("track_name_12"),
            },
            {
                title: keyword("track_name_13"),
                value: report.videoTracks[0].codec,
                description: keyword("track_name_13"),
            },
            {
                title: keyword("track_name_14"),
                value: report.videoTracks[0].language,
                description: keyword("track_name_14"),
            },
            {
                title: keyword("track_name_15"),
                value: report.videoTracks[0].nb_samples,
                description: keyword("track_name_15"),
            },
            {
                title: keyword("track_name_16"),
                value: report.videoTracks[0].size,
                description: keyword("track_name_16"),
            },
            {
                title: keyword("track_name_17"),
                value: report.videoTracks[0].bitrate,
                description: keyword("track_name_17"),
            },
        ];
    }


    let audioTrack;
    if (report.tracks[1] && report.tracks[1].audio)
        audioTrack = [
            {
                title: keyword("audio_name_1"),
                value: report.tracks[1].id,
                description: keyword("audio_desc_1"),
            },
            {
                title: keyword("audio_name_2"),
                value: (report.tracks[1].references && report.tracks[1].references.length > 0) ? report.tracks[1].references.toString : null,
                description: keyword("audio_desc_2"),
            },
            {
                title: keyword("audio_name_3"),
                value: (report.tracks[1].created) ? report.tracks[1].created.toString() : null,
                description: keyword("audio_desc_3"),
            },
            {
                title: keyword("audio_name_4"),
                value: (report.tracks[1].modified) ? report.tracks[1].modified.toString() : null,
                description: keyword("audio_desc_4"),
            },
            {
                title: keyword("audio_name_5"),
                value: report.tracks[1].movie_duration,
                description: keyword("audio_desc_5"),
            },
            {
                title: keyword("audio_name_6"),
                value: report.tracks[1].layer,
                description: keyword("audio_desc_6"),
            },
            {
                title: keyword("audio_name_7"),
                value: report.tracks[1].alternate_group,
                description: keyword("audio_desc_7"),
            },
            {
                title: keyword("audio_name_8"),
                value: report.tracks[1].volume,
                description: keyword("audio_desc_8"),
            },
            {
                title: keyword("audio_name_9"),
                value: report.tracks[1].track_width,
                description: keyword("audio_desc_9"),
            },
            {
                title: keyword("audio_name_10"),
                value: report.tracks[1].track_height,
                description: keyword("audio_desc_10"),
            },
            {
                title: keyword("audio_name_11"),
                value: report.tracks[1].timescale,
                description: keyword("audio_desc_11"),
            },
            {
                title: keyword("audio_name_12"),
                value: report.tracks[1].duration,
                description: keyword("audio_desc_12"),
            },
            {
                title: keyword("audio_name_13"),
                value: report.tracks[1].codec,
                description: keyword("audio_desc_13"),
            },
            {
                title: keyword("audio_name_14"),
                value: report.tracks[1].language,
                description: keyword("audio_desc_14"),
            },
            {
                title: keyword("audio_name_15"),
                value: report.tracks[1].nb_samples,
                description: keyword("audio_desc_15"),
            },
            {
                title: keyword("audio_name_16"),
                value: report.tracks[1].size,
                description: keyword("audio_desc_16"),
            },
            {
                title: keyword("audio_name_17"),
                value: report.tracks[1].bitrate,
                description: keyword("audio_desc_17"),
            },
        ];

    const dispatch = useDispatch();
    return (
        <Paper className={classes.root}>
            <CloseResult onClick={() => dispatch(cleanMetadataState())}/>
            <Typography variant={"h5"}>
                {keyword("metadata_title")}
            </Typography>
            <div>
                <Table size="small" aria-label="a dense table">
                    <TableBody>
                        {
                            videoMetadata &&
                            videoMetadata.map((value, key) => {
                                if (value.value)
                                    return (
                                        <TableRow key={key}>
                                            <Tooltip title={value.description} placement="right">
                                                <TableCell component="th" scope="row">
                                                    {value.title}
                                                </TableCell>
                                            </Tooltip>
                                            <TableCell align="right">{value.value}</TableCell>
                                        </TableRow>
                                    );
                            })
                        }
                    </TableBody>
                </Table>
            </div>
            <Box m={3}/>
            <Typography variant={"h5"}>
                {keyword("track_title")}
            </Typography>
            <div>
                <Table size="small" aria-label="a dense table">
                    <TableBody>
                        {
                            videoTrack &&
                            videoTrack.map((value, key) => {
                                if (value.value)
                                    return (
                                        value.value &&
                                        <TableRow key={key}>
                                            <Tooltip title={value.description} placement="right">
                                                <TableCell component="th" scope="row">
                                                    {value.title}
                                                </TableCell>
                                            </Tooltip>
                                            <TableCell align="right">{value.value}</TableCell>
                                        </TableRow>
                                    );
                            })
                        }
                    </TableBody>
                </Table>
            </div>
            <Box m={3}/>
            <Typography variant={"h5"}>
                {keyword("audio_title")}
            </Typography>
            <div>
                <Table size="small" aria-label="a dense table">
                    <TableBody>
                        {
                            audioTrack &&
                            audioTrack.map((value, key) => {
                                if (value.value)
                                    return (
                                        value.value &&
                                        <TableRow key={key}>
                                            <Tooltip title={value.description} placement="right">
                                                <TableCell component="th" scope="row">
                                                    {value.title}
                                                </TableCell>
                                            </Tooltip>
                                            <TableCell align="right">{value.value}</TableCell>
                                        </TableRow>
                                    );
                            })
                        }
                    </TableBody>
                </Table>
            </div>
        </Paper>
    );
};
export default MetadataVideoResult;