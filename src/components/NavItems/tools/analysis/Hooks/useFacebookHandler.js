import {useEffect, useState} from "react";

const useFacebookHandler = (url) => {
    const [finalUrl, setFinalUrl] = useState(undefined);
    const [facebookToken, setFacebookToken] = useState(null);
    const [showFacebookIframe, setFacebookIframe]= useState(false);


    useEffect(() => {
        window.addEventListener("message", (e) => {
            if (e.origin === "https://caa.iti.gr"){
                setFacebookToken(e.data[1]);
                setFacebookIframe(false);
            }
        });
        return () => {
            window.removeEventListener("message", (e) => {
                if (e.origin === "https://caa.iti.gr"){
                    setFacebookToken(e.data[1]);
                    setFacebookIframe(false);
                }
            });
        }
    }, []);

    useEffect(()=> {
        if (!url || url === "")
            return;
        if (url && url.startsWith("https://www.facebook.com")){
            if (facebookToken === null)
                setFacebookIframe(true);
            else
                setFacebookIframe(false);
        }
        setFinalUrl(url);
    }, [url]);



    return [finalUrl, facebookToken, showFacebookIframe]
};
export default useFacebookHandler;