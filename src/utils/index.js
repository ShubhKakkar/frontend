const moment = require('moment');

function getDateBefore(days) {
    let currentDate = moment();

    let newDate = currentDate.subtract(days, 'days');

    let formattedDate = newDate.format('YYYY-MM-DD');

    return formattedDate;
}

export default getDateBefore;