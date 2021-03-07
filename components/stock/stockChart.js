import { useCallback, useState } from 'react'
import useSWR from 'swr'
import Grid from '@material-ui/core/Grid';
import ChartComponent from '../chart/chartwrapper'
import Spinner from '../spinner'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

//const fetcher = url => fetch(url).then(r => r.json())

const fetcher = url => fetch(url).then(x => x.json()).then(data => {
        return data.map(x => {
            x.date = new Date(x.date)
            return x
        })
    })

const buildUrl = (ticker, timeframe) => {
    return `${process.env.NEXT_PUBLIC_YAHOOFINANCEAPI}/stock/${ticker}/history/${timeframe}`
}

export default function StockChart(props) {
    const [url, setUrl] = useState(buildUrl(props.ticker, 365));

    let { data, error } = useSWR(url, fetcher)

    const handleChangeTimeframe = useCallback((timeframe) => {
            setUrl(buildUrl(props.ticker, timeframe))
        }, [url],
    );

    if (!data) return (
        <Grid item xs={12} md={9}>
        <Card> <CardContent>
            <Spinner />
        </CardContent> </Card>
        </Grid>
    )

    if (error) return (
        <Grid item xs={12} md={9}>
            <Card> <CardContent>
            <p> failed to load: {props.title} </p>
            </CardContent> </Card>
        </Grid>
    )

    if (data) {
        return (
            <Grid item xs={12} md={9}>
                <ChartComponent data={data} volume={props.volume} title={props.title} onChangeTimeframe={handleChangeTimeframe} supportsYTD={props.ticker != 'BTC'} />
            </Grid>
        )
    }
}
