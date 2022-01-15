import React, {Component} from "react";
import Text from "./Text";
import {NavLink, setNavigate, getParams} from "../../index";

class Page2 extends Component {

    render() {
        let pathname = "i don't know :(";
        if (this.props.location !== undefined) {
            pathname = this.props.location.pathname;
        } else {
            let urlParams = getParams();
            if (urlParams !== undefined) {
                if (urlParams.length > 0) {
                    pathname = urlParams.join("--");
                }
            }
        }

        return (
            <>
                <h1>{pathname}</h1>
                <div id="container1" className="containers">
                    <Text>TEST TEXT Page2</Text>
                    <Text>{this.props.children}</Text>
                </div>
                <button onClick={()=>setNavigate("/")}>goto page1</button>

                <NavLink to={"/page2/111"} activeClassName={"active"}> ЭТО СТРАНИЦА /page2/111</NavLink>
            </>
        )
    }
}

export default Page2;
