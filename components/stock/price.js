import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import styles from './price.module.scss';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import numeral from 'numeral';

export default function Price(props)  {
    let currency = props.price.currencySymbol

    if (props.price.currencySymbol === '£') {
        currency = 'p'
    }

    return (
        <Card className="fullheight">
            <CardContent>
                <style jsx>{`
                    p {
                        margin-bottom: 0;
                    }
                    h2 {
                        margin: 0;
                    }
                    span {
                        font-size: 0.9rem;
                    }
                `}</style>
                <p>{ props.price.quoteSourceName }</p>
                <h2>
                    { currency }{ numeral(props.price.regularMarketPrice).format('0,0.00') } {' '}
                </h2>

        {props.price.regularMarketChange &&
                <span className={props.price.regularMarketChange > 0 ? styles.up : styles.down}>
                { numeral(props.price.regularMarketChange).format('0,0.00') } {' '}
                ({ numeral(props.price.regularMarketChangePercent).format('0.000%') })
                </span>
        }

                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell> Open </TableCell>
                            <TableCell> { props.price.regularMarketOpen } </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell> High </TableCell>
                            <TableCell> { props.price.regularMarketDayHigh } </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell> Low </TableCell>
                            <TableCell> { props.price.regularMarketDayLow } </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell> Previous Close </TableCell>
                            <TableCell> { props.price.regularMarketPreviousClose } </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                <p></p>
            </CardContent>
        </Card>
    )
}
