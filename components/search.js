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
                e.preventDefault();
                const symbol = e.target.querySelector('input').value;
                router.push('/stonk/[symbol]', `/stonk/${symbol}`, { shallow: true, })
            }}
        >
            <TextField label="Search by security ticker" />
        </form>
    )
}

