import React from 'react'
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import moment from 'moment-timezone'
import dynamic from 'next/dynamic'

import { getCountdownData } from '../utils'
import styles from './marketCountdown.module.scss';

const Countdown = dynamic(() => import('react-countdown'), {
    ssr: false
})

const MarketCountdownData = {
    NYSE: getCountdownData('America/New_York', ['T09:30'], ['T16:00']),
    LSE: getCountdownData('Europe/London', ['T08:00', 'T12:02'], ['T12:00', 'T16:30']),
    HKEX: getCountdownData('Asia/Hong_Kong', ['T09:30', 'T13:00'], ['T12:00', 'T16:00'])
}

export default class MarketCountdown extends React.Component {
    render () {
        const MarketCountdownCards = Object.keys(MarketCountdownData).map((k, i) => {
            return (
                <Grid item xs={12} md={2} key={i}>
                    <Card>
                        {console.log(k, MarketCountdownData[k].countdownToEvent)}
                        <CardContent className={MarketCountdownData[k].countdownToEvent == 'open' ? styles.close : styles.open}>
                            <h1>{k}</h1>
                            <h1> <Countdown daysInHours date={new Date(MarketCountdownData[k].date.format())} /> </h1>
                            <h2>until {MarketCountdownData[k].countdownToEvent}</h2>
                        </CardContent>
                    </Card>
                </Grid>
            )
        })

        return MarketCountdownCards
    }
}
