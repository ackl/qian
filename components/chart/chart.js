import React from "react";
import PropTypes from "prop-types";

import { format } from "d3-format";
import { timeFormat } from "d3-time-format";

import { Chart } from "react-stockcharts";
import { ChartCanvasEx } from "./chartcanvas";

import {
	BarSeries,
	CandlestickSeries,
	LineSeries,
} from "react-stockcharts/lib/series";

import { XAxis, YAxis } from "react-stockcharts/lib/axes";

import {
	CrossHairCursor,
	EdgeIndicator,
	CurrentCoordinate,
	MouseCoordinateX,
	MouseCoordinateY,
} from "react-stockcharts/lib/coordinates";

import { Label } from "react-stockcharts/lib/annotation";
import { discontinuousTimeScaleProvider } from "react-stockcharts/lib/scale";
import { OHLCTooltip, MovingAverageTooltip } from "react-stockcharts/lib/tooltip";
import { ema } from "react-stockcharts/lib/indicator";
import { fitWidth } from "react-stockcharts/lib/helper";
import { last } from "react-stockcharts/lib/utils";

class CandleStickChart extends React.Component {
	render() {
        const axisColour = '#efefef'
        const fontFamily = 'Monaco, Lucida Console, monospace'

		const margin = { left: 80, right: 80, top: 30, bottom: 50 };
		const height = 400;
		const { type, data: initialData, width, ratio } = this.props;

		const [yAxisLabelX, yAxisLabelY] = [
			width - margin.left - 40,
			(height - margin.top - margin.bottom) / 2
		];

		const xScaleProvider = discontinuousTimeScaleProvider
			.inputDateAccessor(d => d.date);
		const {
			data,
			xScale,
			xAccessor,
			displayXAccessor,
		} = xScaleProvider(initialData);

		const start = xAccessor(last(data));
		const end = xAccessor(data[Math.max(0, data.length - 150)]);
		const xExtents = [start, end];

		return (
			<ChartCanvasEx height={height}
                    clamp={true}
					ratio={ratio}
					width={width}
					margin={margin}
					type={type}
					data={data}
					xScale={xScale}
					xAccessor={xAccessor}
					displayXAccessor={displayXAccessor}
                    seriesName=""
					xExtents={xExtents}>

                {this.props.volume &&
				<Chart id={2} origin={(w, h) => [0, h - 150]} height={150} yExtents={d => d.volume}>
					<XAxis axisAt="bottom" orient="bottom" stroke={axisColour} tickStroke={axisColour} fontFamily={fontFamily}/>
					<YAxis axisAt="left" orient="left" ticks={5} stroke={axisColour} tickStroke={axisColour} tickFormat={format(".2s")} fontFamily={fontFamily}/>
					<BarSeries yAccessor={d => d.volume} fill="rgba(164, 197, 238, 0.37)" />
				</Chart>
                }

				<Chart id={1}
						yExtents={[d => [d.high, d.low]]}
						padding={{ top: 10, bottom: 20 }}>

					<XAxis axisAt="bottom" orient="bottom" stroke={axisColour} tickStroke={axisColour} fontFamily={fontFamily}/>

					<MouseCoordinateX
						at="bottom"
						orient="bottom"
                        fontFamily={fontFamily}
						displayFormat={timeFormat("%Y-%m-%d")} />

					<MouseCoordinateY
						at="right"
						orient="right"
                        dx={10}
                        fontFamily={fontFamily}
						displayFormat={format(".2f")} />

					<YAxis axisAt="right" orient="right" ticks={5} stroke={axisColour} tickStroke={axisColour} fontFamily={fontFamily}/>

					<CandlestickSeries
                        fill = {d => d.close > d.open ? "#6B8" : "#d26"}
                        wickStroke = {d => d.close > d.open ? "#6B8" : "#d26"}
                    />

					<OHLCTooltip origin={[-40, 0]}/>

				</Chart>
				<CrossHairCursor strokeDasharray="LongDashDot" stroke={axisColour} snapX={false} />

			</ChartCanvasEx>
		);
	}
}

CandleStickChart.propTypes = {
	data: PropTypes.array.isRequired,
	width: PropTypes.number.isRequired,
	ratio: PropTypes.number.isRequired,
	type: PropTypes.oneOf(["svg", "hybrid"]).isRequired,
};

CandleStickChart.defaultProps = {
	type: "svg",
};

CandleStickChart = fitWidth(CandleStickChart);

export default CandleStickChart;

