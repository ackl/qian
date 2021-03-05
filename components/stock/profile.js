import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

export default function Profile(props)  {
    return (
        <Card className="fullheight">
            <CardContent>
                <h2>{ props.price.longName }</h2>
                <b> { props.assetProfile.sector } - { props.assetProfile.industry }</b>
                <p> { props.assetProfile.longBusinessSummary }</p>
                <style jsx>{`
                    p {
                        font-size: 0.7rem;
                    }
                `}</style>
            </CardContent>
        </Card>
    )
}
