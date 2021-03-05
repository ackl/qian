import React from 'react';
import { render } from 'react-dom';
import Chart from './chart';
//import { getData } from "./utils"
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Spinner from '../spinner';

class ChartComponent extends React.Component {
	render() {
		if (this.props.data == null) {
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
                {this.props.title &&
                    <h3>{this.props.title}</h3>
                }
                <Chart type="svg" data={this.props.data} volume={this.props.volume} />
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
}

export default ChartComponent
