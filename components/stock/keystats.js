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

export default function KeyStats(props)  {
    return (
        <Card className="fullheight keystats">
            <CardContent>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell>
                                <span> MC </span>
                                { numeral(props.summaryDetail.marketCap).format('0.000a') } 
                            </TableCell>

                            <TableCell>
                            <span>
                                <a target="_blank" href="https://www.investopedia.com/terms/e/ex-dividend.asp">
                                Ex-dividend date
                                </a>
                            </span>
                             { new Date(props.stats.lastDividendDate * 1000).toLocaleDateString('en-GB') } 
                            </TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell>
                                <span> Dividend </span>
                                { numeral(props.stats.lastDividendValue).format('0.000') } 
                            </TableCell>

                            <TableCell>
                            <span> Dividend (projected) </span>
                             { numeral(props.summaryDetail.dividendRate).format('0.00') } 
                            </TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell>
                                <span> Yield </span>
                                { numeral(props.summaryDetail.dividendYield).format('0.000%') } 
                            </TableCell>

                            <TableCell>
                            <span>β</span>
                            { numeral(props.stats.beta).format('0,0.000') }
                            </TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell>
                            <span> EPS (TTM) </span>
                             { numeral(props.stats.trailingEps).format('0,0.000') } 
                            </TableCell>

                            <TableCell> 
                            <span> EPS (projected) </span>
                            { numeral(props.stats.forwardEps).format('0,0.000') } 
                            </TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell>
                            <span> P/E (TTM) </span>
                            { numeral(props.summaryDetail.trailingPE).format('0,0.000') }
                            </TableCell>

                            <TableCell>
                            <span> P/E (projected) </span>
                            { numeral(props.stats.forwardPE).format('0,0.000') }
                            </TableCell>

                        </TableRow>

                        <TableRow>
                            <TableCell>
                            <span> Floated shares </span>
                            { numeral(props.stats.floatShares).format('0,0') }
                            </TableCell>

                            <TableCell>
                            <span> Shorted float </span>
                            { numeral(props.stats.shortPercentOfFloat).format('0.000%') }
                            </TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell>
                            <span> 52wk performance </span>
                            { numeral(props.stats['52WeekChange']).format('0.00%') }
                            </TableCell>

                            <TableCell>
                            <span> PEG </span>
                            { numeral(props.stats.pegRatio).format('0.000') }
                            </TableCell>
                        </TableRow>

                        <TableRow>
                        </TableRow>

                        <TableRow>
                        </TableRow>

                        <TableRow>
                        </TableRow>
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}
