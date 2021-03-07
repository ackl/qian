import { useCallback, useState } from 'react'
import React from 'react'
import useSWR from 'swr'
import Price from './price'
import Spinner from '../spinner'
import Profile from './profile'
import EarningsChart from './earningsChart'
import KeyStats from './keystats'
import Grid from '@material-ui/core/Grid';
import Link from 'next/link'
import { fetcherBuilder } from '../utils'
import ChartComponent from '../chart/chartwrapper'

const buildUrl = (ticker, timeframe) => {
    return `${process.env.NEXT_PUBLIC_YAHOOFINANCEAPI}/stock/${ticker}/history/${timeframe}`
}

export default function StonkContainer(props) {
    const {
        data: fundemental,
        error: error_f
    } = useSWR(`${process.env.NEXT_PUBLIC_YAHOOFINANCEAPI}/stock/${props.symbol}`, fetcherBuilder(null))

    const {
        data: quote,
        error: error_quote
    } = useSWR(`${process.env.NEXT_PUBLIC_YAHOOFINANCEAPI}/stock/${props.symbol}/quote`, fetcherBuilder(null), )

    if (error_f || error_quote) {
        return <h1>Something went wrong...</h1>
    }

    if (!fundemental || !quote) {
        return <Spinner fullpage={true} />
    }

    if (fundemental.message) {
        return <p>{ fundemental.message }</p>
    }

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <h1>{ fundemental.price.symbol } [{ fundemental.price.exchangeName }]</h1>
                <Link href="/">back</Link>
                <a className="header-link" href={`https://finance.yahoo.com/quote/AAPL/${fundemental.price.symbol}`} target="_blank">Yahoo Finance</a>
                <a className="header-link" href={`https://www.marketwatch.com/investing/stock/${fundemental.price.symbol}`} target="_blank">MarketWatch</a>
            </Grid>

            <Grid item xs={12} md={3}>
                <Price price={quote} />
            </Grid>

            <Grid item xs={12} md={6}>

                {fundemental.assetProfile
                ?  <Profile price={fundemental.price} assetProfile={fundemental.assetProfile} />
                :  <h3>Asset profile not available</h3>
                }

            </Grid>

            <Grid item xs={12} md={3}>
                {fundemental.earnings
                ? <EarningsChart earnings={fundemental.earnings} />
                : <h3>Asset earnings not available</h3>
                }
            </Grid>

            <Grid item xs={12} md={9}>
                <ChartComponent
                    volume={true}
                    ticker={props.symbol}
                    buildUrl = {buildUrl}
                    fetcher={fetcherBuilder()}
                />
            </Grid>

            <Grid item xs={12} md={3}>
                {(fundemental.defaultKeyStatistics && fundemental.summaryDetail)
                ? <KeyStats stats={fundemental.defaultKeyStatistics} summaryDetail={fundemental.summaryDetail} />
                : <h3>Key stats not available</h3>
                }
            </Grid>
        </Grid>
    )
}
