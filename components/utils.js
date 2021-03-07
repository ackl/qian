import moment from 'moment-timezone'

const HOLIDAYS = {
    'Asia/Hong_Kong': {
        '2021-04-02': false,
        '2021-04-05': false,
        '2021-04-06': false,
        '2021-05-19': false,
        '2021-06-14': false,
        '2021-07-01': false,
        '2021-09-22': false,
        '2021-10-14': false,
        '2021-12-24': ['T09:30', 'T12:00'],
        '2021-12-27': false,
        '2021-12-31': ['T09:30', 'T12:00'],
    },

    'Europe/London': {
        '2021-04-02': false,
        '2021-04-05': false,
        '2021-05-03': false,
        '2021-05-31': false,
        '2021-08-30': false,
        '2021-12-24': ['T08:00', 'T12:30'],
        '2021-12-27': false,
        '2021-12-28': false,
        '2021-12-31': ['T08:00', 'T12:30'],
    },

    'America/New_York': {
        '2021-04-02': false,
        '2021-05-31': false,
        '2021-07-05': false,
        '2021-09-06': false,
        '2021-10-25': false,
        '2021-10-26': ['T09:30', 'T13:00'],
        '2021-12-24': false,
    }
}

function checkIfHoliday(date, market_tz) {
    const day = date.isoWeekday()

    // check if weekend
    if (day == 6 || day == 7) {
        return true;
    }

    if (date.format('YYYY-MM-DD') in HOLIDAYS && !HOLIDAYS[date.format('YYYY-MM-DD')]) {
        return true;
    }
}

function checkIfPartial(date, market_tz) {
    if (date.format('YYYY-MM-DD') in HOLIDAYS && HOLIDAYS[date.format('YYYY-MM-DD')]) {
        return HOLIDAYS[date.format('YYYY-MM-DD')]
    }
}

export function getCountdownData(market_tz, open, close) {
    const now = moment();
    const market_now = now.clone().tz(market_tz)

    // If we're on a market holiday, skip days until we're not
    while (checkIfHoliday(market_now, market_tz)) {
        market_now.add(1, 'd')
    }

    const DATE_STRING = market_now.format('YYYY-MM-DD')

    let marketOpen = moment.tz(`${DATE_STRING}${open[0]}`, market_tz)
    let marketClose = moment.tz(`${DATE_STRING}${close[close.length - 1]}`, market_tz)

    let marketClosePM = moment.tz(`${DATE_STRING}${close[0]}`, market_tz)
    let marketOpenPM = moment.tz(`${DATE_STRING}${open[open.length - 1]}`, market_tz)

    let countdownToDate = marketClose;
    let countdownToEvent = 'close';

    // See if we're on a partial trading hours day
    const partial = checkIfPartial(market_now, market_tz)

    if (partial) {
        marketOpen = marketOpenPM = partial[0]
        marketClose = marketClosePM = partial[1]
    }

    // Are we currently within opening hours?
    if (now.isBetween(marketOpen, marketClose)) {

        // If market has midday break
        if (open.length > 1) {
            const isLunch = now.isBetween(marketOpenPM, marketClosePM)
            const isPM = now.isSameOrAfter(marketOpenPM)

            if (isLunch) {
                countdownToDate = marketOpenPM
                countdownToEvent = 'open'
            } else if (!isPM) {
                countdownToDate = marketClosePM
                countdownToEvent = 'close'
            }
        }
    } else {
        if (now.isAfter(marketClose)) {
            const market_tmrw = market_now.add(1, 'd')

            while (checkIfHoliday(market_tmrw, market_tz)) {
                market_tmrw.add(1, 'd')
            }

            const marketNextDate = market_tmrw.format('YYYY-MM-DD')

            const partialNext = checkIfPartial(market_tmrw, market_tz)

            if (partialNext) {
                marketOpen = partial[0]
            }

            marketOpen = moment.tz(`${marketNextDate}${open[0]}`, market_tz)
        }

        countdownToDate = marketOpen;
        countdownToEvent = 'open';
    }

    return {
        date: countdownToDate,
        countdownToEvent
    }
}


function defaultFetcherCallback(data) {
    return data.map(x => {
        x.date = new Date(x.date)
        return x
    })
}

export function fetcherBuilder(cb = defaultFetcherCallback) {
    return url => fetch(url).then(x => x.json()).then(data => {
        if (!cb) return data
        return cb(data)
    })

}
