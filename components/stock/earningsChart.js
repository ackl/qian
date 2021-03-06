import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import dynamic from 'next/dynamic'
import Button from '@material-ui/core/Button';
import { withTheme } from '@material-ui/styles';

// need to import plotly like this as it depends on APIs only found in browser
const Plot = dynamic(import('react-plotly.js'), {
    ssr: false
})

class EarningsChart extends React.Component {
    constructor() {
        super()
        console.log('earnings chart', this.props)
        this.state = {
            data: [],
            layout: {},
            style: { display: 'block' },
            config: { displayModeBar: false },
            isQuarterly: true
        };
    }

    getDataFromProps(isQuarterly, key) {
        return this.props.earnings.financialsChart[isQuarterly ? 'quarterly' : 'yearly'].map(x => x[key])
    }

    getData(isQuarterly) {
        const xAxis = this.getDataFromProps(isQuarterly, 'date')

        return [
            {type: 'bar', x: xAxis, y: this.getDataFromProps(isQuarterly, 'earnings'), name: 'Earnings'},
            {type: 'bar', x: xAxis, y: this.getDataFromProps(isQuarterly, 'revenue'), name: 'Revenue'},
        ]
    }

    componentDidMount() {
        this.setState(Object.assign({}, this.state, {
            data: this.getData(this.state.isQuarterly),
            layout: {
                margin: {
                    l: 0, r: 0, b: 0, t: 0
                },
                height: 250,
                paper_bgcolor: this.props.theme.palette.background.paper,
                plot_bgcolor: this.props.theme.palette.background.paper,
                legend: {
                    orientation: 'h'
                },
                font: {
                    color: '#efefef',
                    family: 'Courier, Monaco, monospace'

                },
                dragmode: false
            }
        }))
    }

    handleClick = (e) => {
        this.setState(Object.assign({}, this.state, {
            data: this.getData(!this.state.isQuarterly),
            isQuarterly: !this.state.isQuarterly
        }))
    }

    render() {
        return (
            <Card className="fullheight">
                <CardContent className="earnings-card">
                    <Button onClick={this.handleClick} disabled={this.state.isQuarterly}> Quarterly </Button>
                    <Button onClick={this.handleClick} disabled={!this.state.isQuarterly}> Annual </Button>

                    <Plot
                        config={this.state.config}
                        style={this.state.style}
                        data={this.state.data}
                        layout={this.state.layout}
                    />
                </CardContent>
            </Card>
        )
    }
}

export default withTheme(EarningsChart)
