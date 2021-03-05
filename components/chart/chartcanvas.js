import React from 'react';
import { ChartCanvas } from "react-stockcharts";

export class MyChartCanvas extends ChartCanvas {
    constructor() {
        super()
    }

    handleMouseEnter(e) {
        super.handleMouseEnter(e)
        document.body.style.overflow = "hidden"
        console.log('mouse entered');
    }

    handleMouseLeave(e) {
        super.handleMouseLeave(e)
        document.body.style.overflow = "auto"
        console.log('mouse left');
    }
}
