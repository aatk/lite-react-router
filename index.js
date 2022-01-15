import React, {Component} from "react";
import stateManager from 'lite-react-statemanager';

export class Router extends Component {

    constructor(props) {
        super(props);

        this.state = {
            location: document.location.pathname
        }

        stateManager.setState({location: document.location.pathname}, this);
    }

    rerender = (state) => {
        this.forceUpdate();
    }

    componentDidMount() {
        stateManager.subscribeState({location: {Router: this.rerender}});
    }

    render() {
        return (this.props.children);
    }
}

export class Routes extends Component {

    constructor(props) {
        super(props);

        this.state = {
            location: document.location.pathname
        }
    }

    componentDidMount() {
        stateManager.subscribeState({location: {Router: this}});
    }

    render() {
        let nowPage = stateManager.state.location;

        let RenderRoute = undefined;
        let children = this.props.children;
        if (!Array.isArray(children)) {
            children = [children];
        }

        let allChildren = [];
        for (let indexChildren in children) {
            let Route = children[indexChildren];
            if (Array.isArray(Route)) {
                //Это масив, его внутренности надо добавить в список роутов
                allChildren = [...allChildren, ...Route];
            }
            else if (Route.type.toString() === 'Symbol(react.fragment)') {
                //Это фрагмент, его внутренности надо добавить в список роутов
                allChildren = [...allChildren, ...Route.props.children];
            }
            else {
                allChildren.push(Route)
            }
        }

        for (let indexChildren in allChildren) {
            let RouteInList = allChildren[indexChildren];

            if ((RouteInList.props !== undefined) && (RouteInList.props.path !== undefined)) {

                let renderPage = RouteInList.props.path;
                if (RouteInList.props.exact) {
                    if (nowPage === renderPage) {
                        RenderRoute = RouteInList;
                        break;
                    }
                } else {
                    //math
                    renderPage = renderPage.replace(/:\w+/g,'(\\w+)');
                    renderPage = renderPage.replace(/\*/g,'([\\w|\\W]+)');
                    let pattern = new RegExp('^' + renderPage + '$');
                    let args = nowPage.match(pattern);
                    if (args) {
                        let urlParams = args.slice(1, args.length);
                        stateManager.setState({urlParams: urlParams});
                        RenderRoute = RouteInList;
                        break;
                    }
                }
            } else {
                RenderRoute = RouteInList;
                break;
            }
        }

        if (RenderRoute === undefined) {
            return React.createElement(React.Fragment, {},{});
        }
        return React.createElement( RenderRoute , {}, {});
    }
}

export class Route extends Component {

    render() {
        let result = undefined;
        let RenderComponent = undefined;
        if (this.props.component !== undefined) {
            if (this.props.component.prototype !== undefined) {
                RenderComponent = this.props.component;
                result = React.createElement( RenderComponent, {}, {});
            } else {
                let props = {
                    location: {...document.location}
                };
                props.location.math = this.props.path;

                RenderComponent = this.props.component;
                result = React.createElement( RenderComponent, {...props});
            }
        } else if (this.props.render !== undefined) {
            RenderComponent = this.props.render(this.props);
            result = React.createElement( RenderComponent, {} );
        } else {
            RenderComponent = this.props.children;
            result = React.createElement( RenderComponent, {} );
        }

        return result;
    }
}


export class Link extends Component {

    onClickLink = (e) => {
        e.preventDefault();
        if (this.props.blank) {
            window.open(this.props.to, '_blank');
        } else {
            setNavigate(this.props.to, this.props.hard);
        }
        return false;
    }

    render() {
        let block = (<a href={this.props.to} className={this.props.className} onClick={this.onClickLink}>{this.props.children}</a>);
        return block;
    }
}

export class NavLink extends Link {

    constructor(props) {
        super(props);

        this.state = {
            location: document.location.pathname
        }
    }

    componentDidMount() {
        stateManager.subscribeState({location: {NavLink: this}});
    }

    componentWillUnmount() {
        stateManager.unsubscribeState({location: ["NavLink"]});
    }

    render() {
        let className = this.props.className;
        if (this.state.location === this.props.to) {
            if (this.props.activeClassName) {
                className = className + ' ' + this.props.activeClassName;
            }
        }
        let block = (<a href={this.props.to} className={className} onClick={this.onClickLink}>{this.props.children}</a>);
        return block;
    }
}

export function setNavigate(url, hardReload = false) {
    if (hardReload){
        document.location = url;
    }
    else {
        window.history.pushState({}, url, url);
        stateManager.setState({location: url});
    }
}

export function getParams() {
    let params = stateManager.state.urlParams;
    return params;
}

window.addEventListener('popstate', function(e) {
    stateManager.setState({location: document.location.pathname});
});
