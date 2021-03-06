import React from 'react'
import useSWR from 'swr'
import Price from './price'
import Spinner from '../spinner'
import Profile from './profile'
import EarningsChart from './earningsChart'
import KeyStats from './keystats'
import ChartComponent from '../chart/chartwrapper'
import Grid from '@material-ui/core/Grid';

const fetcher = url => fetch(url).then(r => r.json())

export default function StonkContainer(props) {
    const { data: fundemental } = useSWR(`${process.env.NEXT_PUBLIC_YAHOOFINANCEAPI}/stock/${props.symbol}`, fetcher)

    const { data: OHLC } = useSWR(`${process.env.NEXT_PUBLIC_YAHOOFINANCEAPI}/stock/${props.symbol}/history`, url => fetch(url)
        .then(r => r.json())
        .then(data => {
            return data.map(x => {
                x.date = new Date(x.date)
                return x
            })
        })
    )

    const { data: quote } = useSWR(`${process.env.NEXT_PUBLIC_YAHOOFINANCEAPI}/stock/${props.symbol}/quote`, fetcher, { refreshInterval: 3000 })

    if (!fundemental || !OHLC || !quote) {
        return <Spinner />
    }

    if (fundemental.message) {
        return <p>{ fundemental.message }</p>
    }

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <h1>{ fundemental.price.symbol } [{ fundemental.price.exchangeName }]</h1>
                <a className="header-link" href={`https://finance.yahoo.com/quote/AAPL/${fundemental.price.symbol}`} target="_blank">Yahoo Finance</a>
                <a className="header-link" href={`https://www.marketwatch.com/investing/stock/${fundemental.price.symbol}`} target="_blank">MarketWatch</a>
            </Grid>

            <Grid item xs={12} md={3}>
                <Price price={quote} />
            </Grid>

            <Grid item xs={12} md={6}>
                <Profile price={fundemental.price} assetProfile={fundemental.assetProfile} esg={fundemental.esgScores} />
            </Grid>
            {fundemental.earnings &&
            <Grid item xs={12} md={3}>
                <EarningsChart earnings={fundemental.earnings} />
            </Grid>
            }
            <Grid item xs={12} md={9}>
                <ChartComponent data={OHLC} volume={true} />
            </Grid>

            <Grid item xs={12} md={3}>
                <KeyStats stats={fundemental.defaultKeyStatistics} summaryDetail={fundemental.summaryDetail} />
            </Grid>
        </Grid>
    )
}
