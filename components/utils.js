import moment from 'moment-timezone'

//TODO
const HOLIDAYS = {
}

export function getCountdownData(market_tz, open, close) {
    const now = moment();
    const market_now = now.clone().tz(market_tz)
    const marketDate = market_now.format('YYYY-MM-DD')

    let marketOpen = moment.tz(`${marketDate}${open[0]}`, market_tz)
    let marketClose = moment.tz(`${marketDate}${close[close.length - 1]}`, market_tz)

    let marketClosePM = moment.tz(`${marketDate}${close[0]}`, market_tz)
    let marketOpenPM = moment.tz(`${marketDate}${open[open.length - 1]}`, market_tz)

    let countdownDate = marketClose;
    let marketEvent = 'close';

    if (now.isBetween(marketOpen, marketClose)) {
        if (open.length > 1) {
            let isLunch = now.isBetween(marketOpenPM, marketClosePM)
            let isPM = now.isSameOrAfter(marketOpenPM)

            if (isLunch) {
                countdownDate = marketOpenPM
                marketEvent = 'open'
            } else if (!isPM) {
                countdownDate = marketClosePM
                marketEvent = 'close'
            }
        }
    } else {
        if (now.isAfter(marketClose)) {
            const market_tmrw = market_now.add(1, 'd')
            const marketDate = market_tmrw.format('YYYY-MM-DD')

            marketOpen = moment.tz(`${marketDate}${open[0]}`, market_tz)
        }

        countdownDate = marketOpen;
        marketEvent = 'open';
    }

    return {
        date: countdownDate,
        marketEvent
    }
}

