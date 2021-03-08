import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import dynamic from 'next/dynamic'

import styles from './marketCountdown.module.scss';

const Countdown = dynamic(() => import('react-countdown'), {
    ssr: false
})

export default function MarketCountdown({ countdown }) {
    const MarketCountdownCards = Object.keys(countdown).map((k, i) => {
        return (
            <Grid item xs={12} md={2} key={i}>
                <Card>
                    <CardContent className={countdown[k].countdownToEvent == 'open' ? styles.close : styles.open}>
                        <h1>{k}</h1>
                        <h1> <Countdown daysInHours date={new Date(countdown[k].date)} /> </h1>
                        <h2>until {countdown[k].countdownToEvent}</h2>
                    </CardContent>
                </Card>
            </Grid>
        )
    })

    return MarketCountdownCards
}
