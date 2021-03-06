import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import StonkContainer from '../../components/stock/stonkContainer'
import Spinner from '../../components/spinner'
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';

export default function Stonk() {
    const router = useRouter()
    const { query, isReady } = useRouter()

    console.log('running', query.symbol)

    if (!isReady) {
        return <Spinner />
    }

    return (
        <>
            <Head>
                <title>{ query.symbol.toUpperCase() }</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Box>
                <Container>
                    <StonkContainer symbol={query.symbol}></StonkContainer>
                </Container>
            </Box>
        </>
    )
}
