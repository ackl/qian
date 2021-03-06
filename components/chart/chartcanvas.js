import React from 'react';
import { ChartCanvas } from "react-stockcharts";

// extend react-stockchart ChartCanvas to fix scroll bug
export class ChartCanvas extends ChartCanvas {
    constructor() {
        super()
    }

    handleMouseEnter(e) {
        super.handleMouseEnter(e)
        document.body.style.overflow = "hidden"
    }

    handleMouseLeave(e) {
        super.handleMouseLeave(e)
        document.body.style.overflow = "auto"
    }
}
