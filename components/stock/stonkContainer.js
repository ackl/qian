import React from 'react'
import useSWR from 'swr'
import Price from './Price'
import Spinner from '../spinner'
import Profile from './profile'
import EarningsChart from './earningsChart'
import KeyStats from './keystats'
import ChartComponent from '../chart/chartwrapper'
import Grid from '@material-ui/core/Grid';

export default class StonkContainer extends React.Component {
    constructor() {
        super()
        this.state = {
            fundemental: {},
            OHLC: []
        }
    }

    componentDidMount () {
        if (!this.props.symbol) return

        fetch(`${process.env.NEXT_PUBLIC_YAHOOFINANCEAPI}/${this.props.symbol}`)
            .then((response) => response.json())
            .then(data => {
                this.setState(prevState => ({
                    fundemental: data,
                    OHLC: prevState.OHLC
                }))
            });

        fetch(`${process.env.NEXT_PUBLIC_YAHOOFINANCEAPI}/stock/${this.props.symbol}/history`)
            .then(x => x.json())
            .then(data => {
                data = data.map(x => {
                    x.date = new Date(x.date)
                    return x
                })
                console.log("CHART DATA", data)

                this.setState(prevState => ({
                    fundemental: prevState.fundemental,
                    OHLC: data
                }))
            })

        //this.timerID = setInterval(() => this.updatePrice(), 3000);
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    updatePrice() {
        fetch(`${process.env.NEXT_PUBLIC_YAHOOFINANCEAPI}/stock/${this.props.symbol}/quote`)
        .then((response) => response.json())
        .then(data => {
            this.setState(prevState => ({
                fundemental: {
                    ...prevState.fundemental,
                    price: data
                },
                OHLC: data
            }))
        });
    }

    render () {
        if (this.state.fundemental) {
            if (this.state.fundemental.message) {
                return <p>{ this.state.fundemental.message }</p>
            }

            if (!this.state.fundemental.price) {
                return <Spinner />
            }

            return (
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <h1>{ this.state.fundemental.price.symbol } [{ this.state.fundemental.price.exchangeName }]</h1>
                        <a className="header-link" href={`https://finance.yahoo.com/quote/AAPL/${this.state.fundemental.price.symbol}`} target="_blank">Yahoo Finance</a>
                        <a className="header-link" href={`https://www.marketwatch.com/investing/stock/${this.state.fundemental.price.symbol}`} target="_blank">MarketWatch</a>
                    </Grid>

                    <Grid item xs={12} md={3}>
                        <Price price={this.state.fundemental.price} />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Profile price={this.state.fundemental.price} assetProfile={this.state.fundemental.assetProfile} esg={this.state.fundemental.esgScores} />
                    </Grid>
                    {this.state.fundemental.earnings &&
                    <Grid item xs={12} md={3}>
                        <EarningsChart earnings={this.state.fundemental.earnings} />
                    </Grid>
                    }
                    <Grid item xs={12} md={9}>
                        <ChartComponent data={this.state.OHLC} volume={true} />
                    </Grid>

                    <Grid item xs={12} md={3}>
                        <KeyStats stats={this.state.fundemental.defaultKeyStatistics} summaryDetail={this.state.fundemental.summaryDetail} />
                    </Grid>

                </Grid>
            )
        }
        return <Spinner />
    }
}
