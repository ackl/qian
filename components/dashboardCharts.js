import { useCallback, useState } from 'react'
import useSWR from 'swr'
import Grid from '@material-ui/core/Grid';
import ChartComponent from '../components/chart/chartwrapper'
import Spinner from '../components/spinner'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const fetcher = url => fetch(url).then(r => r.json())

const buildUrl = (ticker, timeframe) => {
    if (ticker == 'BTC') {
        return `https://api.coingecko.com/api/v3/coins/bitcoin/ohlc?vs_currency=gbp&days=${timeframe}`
    }

    return `${process.env.NEXT_PUBLIC_YAHOOFINANCEAPI}/stock/${ticker}/history/${timeframe}`
}

export default function DashboardCharts(props) {

    const [url, setUrl] = useState(buildUrl(props.ticker, 365));

    let { data, error } = useSWR(url, fetcher)

    const handleChangeTimeframe = useCallback((timeframe) => {
            setLoaded(data)
            setUrl(buildUrl(props.ticker, timeframe))
        }, [url],
    );

    if (!data) return (
            <Grid item xs={12}>
            <Card> <CardContent>
                <Spinner />
            </CardContent> </Card>
            </Grid>
    )

    if (props.ticker == 'BTC') {
        data = data.map(x => ({
            date: new Date(x[0]),
            open: x[1],
            high: x[2],
            low: x[3],
            close: x[4],
        }))
    } else {
        data = data.map(x => {
            x.date = new Date(x.date)
            return x
        })
    }

    if (error) return (
        <Grid item xs={12}>
            <Card> <CardContent>
            <p> failed to load: {props.title} </p>
            </CardContent> </Card>
        </Grid>
    )

    if (data) {
        return (
            <Grid item xs={12}>
                <ChartComponent data={data} volume={props.volume} title={props.title} onChangeTimeframe={handleChangeTimeframe} supportsYTD={props.ticker != 'BTC'} />
            </Grid>
        )
    }
}
