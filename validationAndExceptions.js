import {NEPALI_CALENDAR_DATA} from './constants.js'

const YEAR_LIMITS = ['2000', '2099'];

export const validateWithBSBounds = (dayDate, month, year) => {
    if (year < YEAR_LIMITS[0] || year > YEAR_LIMITS[1]) 
        throw new Error(`Year out of bound. Valid range is between 2000 BS. to 2099 BS.`);

    if(month < 1 || month > 12)
        throw new Error(`Month out of bound. Valid range is between 1 - 12.`);
    
    const monthlyDaysArray = NEPALI_CALENDAR_DATA[Number(year) - 2000][0]

    // since we take months from 1 - 12 instead of 0 - 11, we sub 1 as array indexes from 0
    if(dayDate < 1 || dayDate > monthlyDaysArray[month - 1])
        throw new Error(`Day date out of bound. The month has its last date as ${monthlyDaysArray[month - 1]}`);
    
    return true;
};
