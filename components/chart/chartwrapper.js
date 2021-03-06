import Chart from './chart';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Spinner from '../spinner';

export default function ChartComponent(props) {
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
