import useSWR from 'swr'
import Grid from '@material-ui/core/Grid';
import ChartComponent from '../components/chart/chartwrapper'
import Spinner from '../components/spinner'

const fetcher = url => fetch(url).then(r => r.json())

export default function DashboardCharts(props) {

    let url = `${process.env.NEXT_PUBLIC_YAHOOFINANCEAPI}/stock/${props.ticker}/history/1y`

    if (props.ticker == 'BTC') {
        url = 'https://api.coingecko.com/api/v3/coins/bitcoin/ohlc?vs_currency=gbp&days=365'
    }

    let { data, error } = useSWR(url, fetcher)

    if (!data) return (
            <Grid item xs={12}>
                <Spinner />
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

    if (error) return <div>failed to load</div>

    if (data) {
        return (
            <Grid item xs={12}>
            <ChartComponent data={data} volume={props.volume} title={props.title} />
            </Grid>
        )
    }
}
