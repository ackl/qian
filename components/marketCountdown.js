import React from 'react'
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import styles from './marketCountdown.module.scss';

import moment from 'moment-timezone'
import dynamic from 'next/dynamic'
import { getCountdownData } from './utils'

const Countdown = dynamic(() => import('react-countdown'), {
    ssr: false
})

const US_MARKET_COUNTDOWN_DATA = getCountdownData('America/New_York', ['T09:30'], ['T16:00'])
const UK_MARKET_COUNTDOWN_DATA = getCountdownData('Europe/London', ['T08:00', 'T12:02'], ['T12:00', 'T16:30'])
const HK_MARKET_COUNTDOWN_DATA = getCountdownData('Asia/Hong_Kong', ['T09:30', 'T13:00'], ['T12:00', 'T16:00'])

export default class MarketCountdown extends React.Component {
    render () {
        return (
            <>
            <Grid item xs={12} md={2}>
                <Card>
                    <CardContent className={UK_MARKET_COUNTDOWN_DATA.marketEvent == 'open' ? styles.close : styles.open}>
                        <h1>LSE</h1>
                        <h1> <Countdown daysInHours date={new Date(UK_MARKET_COUNTDOWN_DATA.date.format())} /> </h1>
                        <h2>until {UK_MARKET_COUNTDOWN_DATA.marketEvent}</h2>
                    </CardContent>
                </Card>
            </Grid>

            <Grid item xs={12} md={2}>
                <Card>
                    <CardContent className={US_MARKET_COUNTDOWN_DATA.marketEvent == 'open' ? styles.close : styles.open}>
                        <h1>NYSE</h1>
                        <h1> <Countdown daysInHours date={new Date(US_MARKET_COUNTDOWN_DATA.date.format())} /> </h1>
                        <h2>until {US_MARKET_COUNTDOWN_DATA.marketEvent}</h2>
                    </CardContent>
                </Card>
            </Grid>

            <Grid item xs={12} md={2}>
                <Card>
                    <CardContent className={HK_MARKET_COUNTDOWN_DATA.marketEvent == 'open' ? styles.close : styles.open}>
                        <h1>HKEX</h1>
                        <h1> <Countdown daysInHours date={new Date(HK_MARKET_COUNTDOWN_DATA.date.format())} /> </h1>
                        <h2>until {HK_MARKET_COUNTDOWN_DATA.marketEvent}</h2>
                    </CardContent>
                </Card>
            </Grid>
            </>
        )
    }
}
