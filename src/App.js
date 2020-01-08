import React, {useEffect} from 'react';
import NavBar from "./components/NavBar/NavBar";
import {MuiThemeProvider} from "@material-ui/core";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import {HashRouter as Router, Route, Switch} from "react-router-dom";
import history from "./components/Shared/History/History";
import PopUp from "./components/PopUp/PopUp";
import ReactGA from 'react-ga';
//import auth from './auth.ts'; // Sample authentication provider

const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#fff',
            main: 'rgb(0,170,180)',
            dark: '#00707e'
        },
        secondary: {
            main: '#ffaf33',
        },
        error: {
            main: 'rgb(198,57,59)'
        }
    },
    typography: {
        useNextVariants: 'true',
    },
    overrides: {
        MuiButton: {
            containedPrimary: {
                color: 'white',
            },
        },
        MuiIcon:{
            root: {
                overflow: "visible"
            }
        }
    },
    zIndex:{
        drawer: 1099
    }
});

const NotFound = () => {
    return (
        <div>404 not found</div>
    )
};

function App() {

    useEffect(() => {
        const trackingId = process.env.REACT_APP_GOOGLE_ANALYTICS_KEY;
        ReactGA.initialize(trackingId, {
            debug: true,
            titleCase: false,
        });
        ReactGA.ga('set', 'checkProtocolTask', ()=>{});
        ReactGA.pageview('/popup.html');
        history.listen(location => {
            ReactGA.set({ page: location.pathname }); // Update the user's current page
            ReactGA.pageview(location.pathname); // Record a pageview for the given page
        });
    }, []);

    return (
        <Router history={history}>
            <MuiThemeProvider theme={theme}>
                <Switch>
                    <Route exact path={"/"} component={PopUp}/>
                    <Route path={"/app"} component={NavBar}/>
                    <Route component={NotFound}/>
                </Switch>
            </MuiThemeProvider>
        </Router>
    );
}

export default App;
