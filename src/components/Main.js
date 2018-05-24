import React, { Component } from "react";

import Loader from "./Loader";
import SearchBar from "./SearchBar";
import Results from "./Results";
import { ALL_CRYPTOS_URL, CRYPTO_URL } from "../config";

class Main extends Component {
    constructor() {
        super();
        this.state = {
            pageLoading: true,
            isFetching: false,
            isTyping: false,
            data: [],
            cryptos: {},
            currentCrypto: {
                name: "Bitcoin",
                symbol: "BTC",
                quotes: {
                    USD: {
                        price: 8237.59,
                        percent_change_24h: 2.51
                    }
                }
            },
            searchText: "BTC"
        };

        this.fetchData = this.fetchData.bind(this);
        this.fetchCrypto = this.fetchCrypto.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
    }

    componentDidMount() {
        document.body.classList.add("loading");
        setTimeout(() => {
            this.setState({
                pageLoading: false
            });
            document.body.classList.remove("loading");
            document.body.classList.add("is-loaded");
        }, 3000);
        this.fetchData();
    }

    async onTextChange(e) {
        this.setState({
            searchText: e.target.value.toLowerCase()
        });

        if (this.state.isTyping) return;

        await this.setState({
            isTyping: true
        });

        setTimeout(() => {
            this.setState({
                isTyping: false
            });
            if (this.state.searchText.length) {
                return this.fetchCrypto(this.state.searchText);
            }
        }, 1500);
    }

    async fetchData() {
        await this.setState({
            isFetching: true
        });

        if (!sessionStorage.getItem("data")) {
            const response = await fetch(ALL_CRYPTOS_URL);
            const cryptos = await response.json();
            sessionStorage.setItem("data", JSON.stringify(cryptos.data));
            await this.setState({
                data: cryptos.data,
                isFetching: false
            });
            return this.fetchCrypto("BTC");
        }

        await this.setState({
            data: JSON.parse(sessionStorage.getItem("data")),
            isFetching: false
        });
        return this.fetchCrypto("BTC");
    }

    async fetchCrypto(text) {
        this.setState({
            isFetching: true
        });

        let searchText = text.toLowerCase();

        const crypto =
            this.state.data.filter(x => {
                return (
                    x.name.toLowerCase() === searchText ||
                    x.symbol.toLowerCase() === searchText
                );
            })[0] || null;

        if (!crypto) {
            await this.setState({
                isFetching: false
            });
            return this.state.currentCrypto;
        }

        const response = await fetch(`${CRYPTO_URL}/${crypto.id}/`);
        const result = await response.json();
        const { name, symbol } = result.data;

        const obj = Object.assign({}, this.state.cryptos);
        obj[name] = result.data;
        obj[symbol] = result.data;

        await this.setState({
            cryptos: obj,
            currentCrypto: result.data,
            isFetching: false
        });
        return this.state.currentCrypto;
    }

    render() {
        return ( 
            <div className="main">
                <Loader loading={this.state.pageLoading} /> 
                <div className="container">
                    <Results 
                        crypto={this.state.currentCrypto}
                        isFetching={this.state.isFetching}
                        isTyping={this.state.isTyping}
                    /> 
                    <SearchBar 
                        onTextChange={this.onTextChange}
                        searchText={this.state.searchText}
                        isTyping={this.state.isTyping}
                    /> 
                </div> 
            </div>
        );
    }
}

export default Main;
