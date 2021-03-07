import Chart from './chart';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Spinner from '../spinner';
import Button from '@material-ui/core/Button';
import PropTypes from "prop-types";

function ChartComponent(props) {
    if (props.data == null) {
        return (
            <Card>
            <CardContent>
                <Spinner />
            </CardContent>
            </Card>
        )
    }

    return (
        <Card>
            <CardContent>
                <Button onClick={e => props.onChangeTimeframe(1)}> 1d </Button>
                <Button onClick={e => props.onChangeTimeframe(7)}> 7d </Button>
                <Button onClick={e => props.onChangeTimeframe(30)}> 30d </Button>
                <Button onClick={e => props.onChangeTimeframe(90)}> 3m </Button>
                <Button onClick={e => props.onChangeTimeframe(180)}> 6m </Button>
                <Button onClick={e => props.onChangeTimeframe(365)}> 1y </Button>
                {props.supportsYTD &&
                <Button onClick={e => props.onChangeTimeframe(0)}> ytd </Button>
                }
                <Button onClick={e => props.onChangeTimeframe('max')}> max </Button>
                {props.title &&
                    <h3>{props.title}</h3>
                }
                <Chart type="svg" data={props.data} volume={props.volume} />
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
	onChangeTimeframe: PropTypes.func.isRequired,
};

export default ChartComponent
