import { useEffect } from "react";
import axios from "axios"
import { useDispatch } from "react-redux";
import { setError } from "../../../../../redux/actions/errorActions";
import useLoadLanguage from "../../../../../Hooks/useLoadLanguage";
import tsv from "../../../../../LocalDictionary/components/NavItems/tools/Forensic.tsv";
import { setGifLoading } from "../../../../../redux/actions/tools/gifActions";
import { saveAs } from 'file-saver';

const useGetGif = (images, delayInput) => {
    const keyword = useLoadLanguage("components/NavItems/tools/Forensic.tsv", tsv);
    const dispatch = useDispatch();


    useEffect(() => {

        const handleError = (e) => {
            if (keyword(e) !== "")
                dispatch(setError(keyword(e)));
            else
                dispatch(setError(keyword("please_give_a_correct_link")));
            dispatch(setGifLoading());
        };


        const downloadGif = (response) => {
            console.log(response.data);
            const file = new Blob([response.data], { type: 'image/gif' })
            saveAs(file, "image.gif")
        }

        if (images && delayInput) {
            var body = {
                inputURLs: [
                    images.image1,
                    images.image2,
                ],
                delay: delayInput
            }

            axios({
                method: "post",
                url: "https://demo-medialab.afp.com/envisu-tools/createAnimated",
                data: body,
                responseType: 'blob',
            })
                .then(response => downloadGif(response))
                .catch(error => {
                    handleError("gif_error_" + error.status);
                });


        };



    }, [keyword, dispatch]);
};
export default useGetGif;