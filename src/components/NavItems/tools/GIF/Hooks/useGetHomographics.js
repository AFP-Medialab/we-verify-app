import { useEffect } from "react";
import axios from "axios"
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setStateLoading, setStateShow, setStateError} from "../../../../../redux/actions/tools/gifActions";
import { setError } from "../../../../../redux/actions/errorActions";
import useLoadLanguage from "../../../../../Hooks/useLoadLanguage";
import tsv from "../../../../../LocalDictionary/components/NavItems/tools/Forensic.tsv";
import useAuthenticatedRequest from "../../../../Shared/Authentication/useAuthenticatedRequest"

const useGetHomographics = (files, mode) => {
    const keyword = useLoadLanguage("components/NavItems/tools/CheckGIF.tsv", tsv);
    const dispatch = useDispatch();
    const toolState = useSelector(state => state.gif.toolState);

    const authenticatedRequest = useAuthenticatedRequest();

    useEffect(() => {


        const handleError = (e) => {
            if (keyword(e) !== ""){
                dispatch(setError(keyword(e)));
                console.log("ERROR HOMO: " + keyword(e));
            }else{
                dispatch(setError(keyword("error_homo")));
            }
            
            dispatch(setStateError());

        };

        const getImages = (response) => {
            console.log("RESPONSE RECIEVED");
            //console.log(response);

            if(response.data.status === "KO"){
                handleError("error_homo");
            }else{
                var homoImage1 = "https://demo-medialab.afp.com/weverify-wrapper" + response.data.results.output0;
                var homoImage2 = "https://demo-medialab.afp.com/weverify-wrapper" + response.data.results.output1;

                //console.log(homoImage1);
                //console.log(homoImage2);

                dispatch(setStateShow(homoImage1, homoImage2));
            }

        }

        if (files && mode === 1 && toolState === 3) {
            console.log("UPLOADING IMAGES");

            dispatch(setStateLoading());
            //console.log(files.file1);
            //console.log(files.file2);

            var bodyFormData = new FormData();
            bodyFormData.append('file_0', files.file1);
            bodyFormData.append('file_1', files.file2);
        

            const axiosConfig = {
                method: "post",
                url: "https://demo-medialab.afp.com/weverify-wrapper/ipol/homographic",
                data: bodyFormData,
                headers: { 
                    "Content-Type": "multipart/form-data",
                },
            } 
            
            authenticatedRequest(axiosConfig)
                .then(response => getImages(response))
                .catch(error => {
                    handleError("gif_error_" + error.status);
            });
            
                
        };


        if (files && mode === 2 && toolState === 3) {
            console.log("UPLOADING IMAGES");

            dispatch(setStateLoading());
            //console.log(files.file1);
            //console.log(files.file2);

            var bodyUrlFormData = new URLSearchParams();
            bodyUrlFormData.append('url_0', files.url_0);
            bodyUrlFormData.append('url_1', files.url_1);


            const axiosConfig = {
                method: "post",
                url: "https://demo-medialab.afp.com/weverify-wrapper/ipol/homographic/url",
                data: bodyUrlFormData,
                headers: { 
                    "Content-Type": "application/x-www-form-urlencoded", 
                },
            }

            authenticatedRequest(axiosConfig)
                .then(response => getImages(response))
                .catch(error => {
                    handleError("gif_error_" + error.status);
                });


        };

        

    }, [files, mode, keyword, dispatch]);
};
export default useGetHomographics;