import Head from 'next/head'
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import MarketCountdown from '../components/dashboard/marketCountdown'
import DashboardChart from '../components/dashboard/dashboardChart'
import Search from '../components/dashboard/search'
import { getCountdownData } from '../components/utils'

export default function Main(props) {
    return (
        <>
            <Head>
                <title>cash rules everything around me</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Box>
                <Container>
                    <main className="dashboard-main">
                        <Grid container spacing={3} justify="center">
                            <Search />

                            <MarketCountdown countdown={props.MarketCountdownData} />

                            <DashboardChart ticker="BTC" volume={false} title="BTC" />

                            <DashboardChart ticker="^GSPC" volume={true} title="SPY" />

                            <DashboardChart ticker="000001.SS" volume={true} title="SHANGHAI"  />

                            <DashboardChart ticker="^HSI" volume={true} title="HONG KONG" />

                            <DashboardChart ticker="^FTSE" volume={true} title="FTSE" />

                            <DashboardChart ticker="GLD" volume={true} title="GOLD" />

                            <DashboardChart ticker="OIL" volume={true} title="OIL" />
                        </Grid>
                    </main>
                </Container>
            </Box>
        </>
    )
}

export async function getServerSideProps(context) {
    return {
        props: {
            MarketCountdownData: {
                NYSE: getCountdownData('America/New_York', ['T09:30'], ['T16:00']),
                LSE: getCountdownData('Europe/London', ['T08:00', 'T12:02'], ['T12:00', 'T16:30']),
                HKEX: getCountdownData('Asia/Hong_Kong', ['T09:30', 'T13:00'], ['T12:00', 'T16:00'])
            }
        }
    }
}
