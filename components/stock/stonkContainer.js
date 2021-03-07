import { useCallback, useState } from 'react'
import React from 'react'
import useSWR from 'swr'
import Price from './price'
import Spinner from '../spinner'
import Profile from './profile'
import EarningsChart from './earningsChart'
import KeyStats from './keystats'
import ChartComponent from '../chart/chartwrapper'
import Grid from '@material-ui/core/Grid';
import Link from 'next/link'
import StockChart from './stockChart'

const fetcher = url => fetch(url).then(r => r.json())

const buildUrl = (ticker, timeframe) => {
    return `${process.env.NEXT_PUBLIC_YAHOOFINANCEAPI}/stock/${ticker}/history/${timeframe}`
}

export default function StonkContainer(props) {

    const [url, setUrl] = useState(buildUrl(props.symbol, 365));

    const {
        data: fundemental,
        error: error_f
    } = useSWR(`${process.env.NEXT_PUBLIC_YAHOOFINANCEAPI}/stock/${props.symbol}`, fetcher)

    const {
        data: quote,
        error: error_quote
    } = useSWR(`${process.env.NEXT_PUBLIC_YAHOOFINANCEAPI}/stock/${props.symbol}/quote`, fetcher, )

    const handleChangeTimeframe = useCallback((timeframe) => {
            setUrl(buildUrl(props.symbol, timeframe))
        }, [url],
    );


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
                <Profile price={fundemental.price} assetProfile={fundemental.assetProfile} esg={fundemental.esgScores} />
            </Grid>
            {fundemental.earnings &&
            <Grid item xs={12} md={3}>
                <EarningsChart earnings={fundemental.earnings} />
            </Grid>
            }

            <StockChart ticker={props.symbol} volume={true} />

            <Grid item xs={12} md={3}>
                <KeyStats stats={fundemental.defaultKeyStatistics} summaryDetail={fundemental.summaryDetail} />
            </Grid>
        </Grid>
    )
}
