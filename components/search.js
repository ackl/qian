import { useRouter } from 'next/router'
import TextField from '@material-ui/core/TextField';

export default function Search() {
    const router = useRouter()
    return (
        <form
            noValidate
            autoComplete="off"
            className="search-form"
            onSubmit={(e) => {
                const ticker = e.target.querySelector('input').value;
                router.push(`/stonk/${ticker}`)
            }}
        >
            <TextField label="Search by security ticker" />
        </form>
    )
}

