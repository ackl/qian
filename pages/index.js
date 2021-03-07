import Head from 'next/head'
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import MarketCountdown from '../components/dashboard/marketCountdown'
import DashboardChart from '../components/dashboard/dashboardChart'
import Search from '../components/dashboard/search'

export default function Main() {
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

                            <MarketCountdown />

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
