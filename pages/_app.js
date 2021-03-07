import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import '../styles/global.scss'

const theme = createMuiTheme({
    palette: {
        type: 'dark', // Switching the dark mode on is a single property value change.
        background: {
            paper: '#101722',
            default: '#0d1317'
        },
    },
    typography: {
        fontFamily: [
            'Anonymous Pro',
            'Monaco',
            'monospace'
        ].join(','),
    }
});

export default function App({ Component, pageProps }) {
    return (
        <MuiThemeProvider theme={theme}>
            <CssBaseline />
            <Component {...pageProps} />
        </MuiThemeProvider>
    )
}

