import React, {Component} from "react";
import Text from "./Text";
import {Link, setNavigate} from "lite-react-router";

class Page1 extends Component {

    link = () => {
        setNavigate("/page2");
    }

    render() {
        return (
            <>
                <div id="container1" className="containers">
                    <Text>TEST TEXT Page1</Text>
                </div>
                <button onClick={this.link}>Button to /page2 - error route</button>
                <Link to={"/page2/111"}>goto /page2/111 test NavLink</Link>
                <Link to={"/page2/111/555"}>goto /page2/111/555</Link>
                <Link to={"/page2/222"} blank>goto /page2/222 _blank</Link>
                <Link to={"/page2/333"} hard>goto /page2/333 with reload page</Link>

                <Link to={"/page3"}>goto /page3 route content</Link>
                <Link to={"/page4/rrr/tttt"}>goto /page4 with any params</Link>

                <Link to={"/page5/param1/param2"}>goto /page5 with 2 params</Link>
                <Link to={"/page6/param1/param2/param3"}>goto /page6 with 3 params</Link>

                <Link to={"/page7/param1/param2"}>goto /page7 with 2 params</Link>
                <Link to={"/page8/param1/param2/param3"}>goto /page8 with 3 params</Link>
            </>
        )
    }
}

export default Page1;
