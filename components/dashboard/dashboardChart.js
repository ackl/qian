import Grid from '@material-ui/core/Grid';

import { fetcherBuilder } from '../utils'
import ChartComponent from '../chart/chartwrapper'

const buildUrl = (ticker, timeframe) => {
    if (ticker == 'BTC') {
        return `https://api.coingecko.com/api/v3/coins/bitcoin/ohlc?vs_currency=gbp&days=${timeframe}`
    }

    return `${process.env.NEXT_PUBLIC_YAHOOFINANCEAPI}/stock/${ticker}/history/${timeframe}`
}

export default function DashboardChart(props) {
    let fetcher;

    if (props.ticker == 'BTC') {

        fetcher = fetcherBuilder((data) => {
            return data.map(x => ({
                date: new Date(x[0]),
                open: x[1],
                high: x[2],
                low: x[3],
                close: x[4],
            }))
        })
    } else {
        fetcher = fetcherBuilder()
    }

    return (
        <Grid item xs={12}>
            <ChartComponent 
                volume={props.volume}
                title={props.title}
                ticker={props.ticker}
                buildUrl = {buildUrl}
                fetcher={fetcher}
            />
        </Grid>
    )
}
