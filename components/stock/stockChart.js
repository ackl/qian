import Grid from '@material-ui/core/Grid';
import ChartComponent from '../chart/chartwrapper'
import { fetcherBuilder } from '../utils'

const buildUrl = (ticker, timeframe) => {
    return `${process.env.NEXT_PUBLIC_YAHOOFINANCEAPI}/stock/${ticker}/history/${timeframe}`
}

export default function StockChart(props) {
    return (
        <Grid item xs={12} md={9}>
            <ChartComponent
                volume={props.volume}
                title={props.title}
                ticker={props.ticker}
                buildUrl = {buildUrl}
                fetcher={fetcherBuilder()}
            />
        </Grid>
    )
}
