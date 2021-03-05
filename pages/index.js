import Head from 'next/head'
import MarketCountdown from '../components/marketCountdown'
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import DashboardCharts from '../components/dashboardCharts'
import Search from '../components/search'
import Grid from '@material-ui/core/Grid';

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

                            <DashboardCharts ticker="BTC" volume={false} title="BTC" />

                            <DashboardCharts ticker="^GSPC" volume={true} title="SPY" />

                            <DashboardCharts ticker="000001.SS" volume={true} title="SHANGHAI"  />

                            <DashboardCharts ticker="^HSI" volume={true} title="HONG KONG" />

                            <DashboardCharts ticker="^FTSE" volume={true} title="FTSE" />

                            <DashboardCharts ticker="GLD" volume={true} title="GOLD" />

                            <DashboardCharts ticker="OIL" volume={true} title="OIL" />
                        </Grid>
                    </main>
                </Container>
            </Box>
        </>
    )
}
