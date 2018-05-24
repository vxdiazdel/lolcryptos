import React, { Component } from "react";

import { emojis } from "../utils/emojis";

class Loader extends Component {
    constructor() {
        super();
        this.state = {
            emoji: "💰"
        };
    }

    componentDidMount() {
        this.loadEmojis(emojis);
    }

    loadEmojis(arr) {
        let timer;
        if (this.props.loading) {
            timer = setInterval(() => {
                this.setState({
                    emoji: arr[Math.floor(Math.random() * arr.length)]
                });
            }, 100);
        } else {
            clearInterval(timer);
        }
    }

    renderLoader() {
        if (this.props.loading) {
            return (
                <div className="loader" >
                    <span className="loader__emoji">{this.state.emoji}</span> 
                    <p className="loader__text">Loading</p> 
                </div>
            );
        }
        return null;
    }

    render() {
        return this.renderLoader();
    }
}

export default Loader;
