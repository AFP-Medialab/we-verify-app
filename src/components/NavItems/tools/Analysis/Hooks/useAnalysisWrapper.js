import axios from "axios"
import {useDispatch} from "react-redux";
import {setError} from "../../../../../redux/actions/errorActions";
import {useEffect} from "react";

export const useAnalysisWrapper = (setAnalysisLoading, setAnalysisResult, serviceUrl, apiUrl, processUrl, keyword) => {    
    const dispatch = useDispatch();

    useEffect(() => {
        
        const handleError = (error) => {
            if (keyword(error) !== "")
                dispatch(setError((keyword(error))));
            else
                dispatch(setError(error.toString()));
            dispatch(setAnalysisLoading(false));
        };

        const getReport = (id) => {
            axios.get(serviceUrl+"/reports/" + id)
                .then(response => {
                    if (keyword("table_error_" + response.data.status) !== "")
                        handleError("table_error_" + response.data.status.status);
                    else if (response.data.status !== "unavailable"){
                        dispatch(setAnalysisResult(processUrl, response.data, false, false));
                    }
                })
                .catch(errors => handleError(errors));
        };

        const handleJob = (data) => {
            if (keyword("table_error_" + data.status) !== "") {
                handleError("table_error_" + data.status);
            } else {
                waitUntilDonne(data);
            }
        };


        const waitUntilDonne = (data) => {
            axios.get(serviceUrl+"/jobs/" + data.id)
                .then(response => {
                    if (response.data.status === "done") {
                        getReport(response.data.media_id)
                    } else if ( keyword("table_error_" +  response.data.status) !== "") {
                        handleError("table_error_" + response.data.status);
                    } else if (response.data.status === "unavailable"){
                        handleError("table_error_unavailable")
                    }
                    else {
                        setTimeout(() => waitUntilDonne(response.data), 2000);
                    }
                })
                .catch(error => {
                
                })
        };


        if (!apiUrl)
            return;
        if (apiUrl === "")
            handleError("table_error_empty_url");
        else if (apiUrl.includes(" "))
            handleError("table_error_unavailable");
        else if (processUrl) {           
            dispatch(setAnalysisLoading(true));
            axios.post(apiUrl)
                .then(response => handleJob(response["data"]))
                .catch(error => handleError(error))
        }
        // eslint-disable-next-line
    }, [apiUrl, keyword, dispatch, processUrl]);
};