import {Component} from "react";

class Text extends Component {

    render() {
        return (
            <p id="test">
                {this.props.children}
            </p>
        );
    }

}

export default Text;
