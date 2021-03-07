import useSWR from 'swr'
import { useCallback, useState } from 'react'
import Chart from './chart';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Spinner from '../spinner';
import Button from '@material-ui/core/Button';
import PropTypes from "prop-types";

function ChartComponent(props) {
    const [url, setUrl] = useState(props.buildUrl(props.ticker, 365));

    let { data, error } = useSWR(url, props.fetcher)

    const handleChangeTimeframe = useCallback((timeframe) => {
            setUrl(props.buildUrl(props.ticker, timeframe))
        }, [url],
    );

    if (error) return (
        <Card> <CardContent>
        <p> failed to load: {props.title} </p>
        </CardContent> </Card>
    )

    if (!data) {
        return (
            <Card>
            <CardContent>
                <Spinner />
            </CardContent>
            </Card>
        )
    }

    if (data.length == 1) {
        setUrl(props.buildUrl(props.ticker, 1))
    }

    return (
        <Card>
            <CardContent>
                <Button onClick={e => handleChangeTimeframe(1)}> 1d </Button>
                <Button onClick={e => handleChangeTimeframe(7)}> 7d </Button>
                <Button onClick={e => handleChangeTimeframe(30)}> 30d </Button>
                <Button onClick={e => handleChangeTimeframe(90)}> 3m </Button>
                <Button onClick={e => handleChangeTimeframe(180)}> 6m </Button>
                <Button onClick={e => handleChangeTimeframe(365)}> 1y </Button>
                {props.ticker != 'BTC' &&
                <Button onClick={e => handleChangeTimeframe(0)}> ytd </Button>
                }
                <Button onClick={e => handleChangeTimeframe('max')}> max </Button>

                {props.title &&
                    <h3>{props.title}</h3>
                }

                <Chart type="svg" data={data} volume={props.volume} />
            </CardContent>

            <style jsx>{`
                h3 {
                    text-align: center;
                    margin: 0;
                }
            `}</style>
        </Card>
    )
}

ChartComponent.propTypes = {
	buildUrl: PropTypes.func.isRequired,
	fetcher: PropTypes.func.isRequired,
};

export default ChartComponent
