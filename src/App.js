import './App.css';
import React, {Component} from "react";
import Page1 from "./component/page1";
import Page2 from "./component/page2";
import ErrorPage from "./component/errorpage";

import {Router, Routes, Route} from '../index';

class App extends Component {

    componentDidCatch(error, info) {
        console.log("ERROR!!!");
    }

    render() {

        let dynRoute = [
            {path: "/page5/:id/:second"},
            {path: "/page6/:id/:second/:any"}
        ]
        let loaderRoutes = dynRoute.map((element, index) => (<Route key={index} path={element.path} component={Page2} />));

        let dynRouteFragment = [
            {path: "/page7/:id/:second"},
            {path: "/page8/:id/:second/:any"}
        ]
        let loaderFragmentRoutes = dynRouteFragment.map((element, index) => (<Route key={index} path={element.path} component={Page2} />));

        return (
            <Router>
                <div className="App">
                    <header className="App-header">
                        <Routes>
                            <Route exact path={"/"} component={Page1} />
                            <Route path={"/page1/:id"} component={Page2}>/page1/:id</Route>
                            <Route path={"/page2/:id"} component={Page2}>/page2/:id</Route>
                            <Route path={"/page2/:id/:second"} component={Page2}>/page2/:id/:second</Route>
                            <Route path={"/page3"} >Content in route tag</Route>
                            <Route path={"/page4/*"} component={(props) => (<Page2 {...props}/>)}/>
                            {loaderRoutes}
                            <>{loaderFragmentRoutes}</>
                            <Route component={ErrorPage} />
                        </Routes>
                    </header>
                    <footer>footer</footer>
                </div>
            </Router>
        );
    }

}

export default App;
