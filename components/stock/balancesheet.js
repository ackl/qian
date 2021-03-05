import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import styles from './price.module.scss';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

export default function BalanceSheet(props)  {
    return (
        <Card className="fullheight">
            <CardContent>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell> Open </TableCell>
                            <TableCell> { props.price.regularMarketOpen } </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                <p></p>
            </CardContent>
        </Card>
    )
}
