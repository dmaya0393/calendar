// Format structure: dateFormat_timeFormat_dayNameFormat_language(optional)
// examples:

// DMY_T12_DS        | date is in numeric values | 12hr time format | shortDayNaming | (Nothing is needed for the case of nepali texts)
// DMY_T12_DS_EN     | date is in numeric values | 12hr time format | shortDayNaming | (EN for english texts case)

// MDY_T24_DF        | date is in numeric values | 24hr time format | fullDayNaming | (Nothing is needed for the case of nepali texts)
// MDY_T24_DF_EN     | date is in numeric values | 24hr time format | fullDayNaming | (EN for english texts case)

// DMonY_T12_DF      | Mon = short month name | 12hr time format | fullDayNaming | (Nothing is needed for the case of nepali texts)
// DMonY_T12_DF_EN   | Mon = short month name | 12hr time format | fullDayNaming | (EN for english texts case)
// DMonY_T12_DF_NP-EN  | Mon = short month name | 12hr time format | fullDayNaming | (NP-EN Nepali naming in English Character: eg: Baisakh)

// DMonthY_T12_DF      | Month = full month name | 12hr time format | fullDayNaming | (Nothing is needed for the case of nepali texts)
// DMonthY_T12_DF_EN   | Month = full month name | 12hr time format | fullDayNaming | (EN for english texts case)
// DMonthY_T12_DF_NP-EN  | Month = full month name | 12hr time format | fullDayNaming | (NP-EN Nepali naming in English Character: eg: Baisakh)

// FULL LIST AVAILABLE IN 'availableFormats.txt' file.


const numbersMap = {
    1:'१', 2:'२', 3:'३', 4:'४', 5:'५', 6:'६', 7:'७', 8:'८', 9:'९', 0:'०'
}

export const weekDaysMap = {
    1: {full: 'आइतबार', short: 'आइत', fullEN: 'Sunday', shortEN:'Sun'},
    2: {full: 'सोमबार', short: 'सोम', fullEN: 'Monday', shortEN:'Mon'},
    3: {full: 'मंगलबार', short: 'मंगल', fullEN: 'Tuesday', shortEN:'Tue'},
    4: {full: 'बुधबार', short: 'बुध', fullEN: 'Wednesday', shortEN:'Wed'},
    5: {full: 'बिहिबार', short: 'बिहि', fullEN: 'Thursday', shortEN:'Thu'},
    6: {full: 'शुक्रबार', short: 'शुक्र', fullEN: 'Friday', shortEN:'Fri'},
    7: {full: 'शनिबार', short: 'शनि', fullEN: 'Saturday', shortEN:'Sat'}
}

const monthMap = {
    1: {full: 'बैशाख', short: 'बै', fullNP_EN: 'Baisakh', shortNP_EN: 'Bai', fullEN: 'January', shortEN: 'Jan'},
    2: {full: 'जेठ', short: 'जे', fullNP_EN: 'Jestha', shortNP_EN: 'Jes', fullEN: 'February', shortEN: 'Feb'},
    3: {full: 'असार', short: 'अ', fullNP_EN: 'Asar', shortNP_EN: 'Asa', fullEN: 'March', shortEN: 'Mar'},
    4: {full: 'श्रावण', short: 'श्रा', fullNP_EN: 'Shrawan', shortNP_EN: 'Shr', fullEN: 'April', shortEN: 'Apr'},
    5: {full: 'भाद्र', short: 'भा', fullNP_EN: 'Bhadra', shortNP_EN: 'Bhd', fullEN: 'May', shortEN: 'May'},
    6: {full: 'आश्विन', short: 'आ', fullNP_EN: 'Aswin', shortNP_EN: 'Asw', fullEN: 'June', shortEN: 'Jun'},
    7: {full: 'कार्तिक', short: 'का', fullNP_EN: 'Kartik', shortNP_EN: 'Kar', fullEN: 'July', shortEN: 'Jul'},
    8: {full: 'मंसिर', short: 'मं', fullNP_EN: 'Mangsir', shortNP_EN: 'Man', fullEN: 'August', shortEN: 'Aug'},
    9: {full: 'पौष', short: 'पौ', fullNP_EN: 'Poush', shortNP_EN: 'Pou', fullEN: 'September', shortEN: 'Sep'},
    10: {full: 'माघ', short: 'मा', fullNP_EN: 'Magh', shortNP_EN: 'Mag', fullEN: 'October', shortEN: 'Oct'},
    11: {full: 'फाल्गुण', short: 'फा', fullNP_EN: 'Falgun', shortNP_EN: 'Fal', fullEN: 'November', shortEN: 'Nov'},
    12: {full: 'चैत्र', short: 'चै', fullNP_EN: 'Chaitra', shortNP_EN: 'Cha', fullEN: 'December', shortEN: 'Dec'},
}

export const breakDate = (dateString) =>{
    const parts = dateString.split(/[-\/\s]/);
    return {dayDate: parts[0], month: parts[1], year: parts[2]}
}

const breakTime = (timeString) =>{
    const parts = timeString.split(/[:]/);
    return {hour: parts[0], minutes: parts[1], seconds: parts[2]}
}

const formatType = (format) =>{
    const parts = format.split(/_/);
    const language = parts.slice(3).join('_')

    return {dateFormat: parts[0], timeFormat:parts[1], dayFormat:parts[2], language:language || 'NP'}
}

// entry point for the formatting of  date. | DOESNT HANDLE THE SECONDS CASE FOR TIME ** IS NOT HANDLED ANYWHERE AS WELL **
export const dateFormatter = (dateObject, format) =>{
    const {dateFormat, timeFormat, dayFormat, language} = formatType(format)
    if (language === 'NP' || language === 'EN' || language === 'NP-EN'){
        const {dayDate, month, year} = breakDate(dateObject.toString())
        const {hour, minutes} = breakTime(dateObject.getTime())
        const dayIndex = dateObject.getDayIndex()
    
        const formattedDay = dayFormatter(dayIndex, dayFormat, language)
        const formattedTime = timeFormatter(hour, minutes, timeFormat, language)
        const {formattedDayDate, formattedMonth, formattedYear} = numeralsAdjuster(dayDate, month, year, dateFormat, language)
    
        return formatSwitcher(formattedDayDate, formattedMonth, formattedYear, formattedDay, formattedTime, format)
    } else{
        throw new Error(`Invalid language notation.
            Supported notations are: EN and NP-EN.
            Specify nothing for Nepali language case.
            eg: DMY_T12_DS (defaults to Nepali)
            eg: DMY_T12_DS_EN (for English)
            eg: DMY_T12_DS_NP-EN (for Nepali pronunciation written with English characters.)
            `);
    }
}

// function to move the date parts (dayDate, month, year) as required in a format. 
const formatSwitcher = (formattedDayDate, formattedMonth, formattedYear, formattedDay, formattedTime, format) =>{
    let datePart;
    const timePart = formattedTime
    const dayPart = formattedDay

    if (format.startsWith('DMY') || format.startsWith('DMonY') || format.startsWith('DMonthY'))
        datePart = `${formattedDayDate}-${formattedMonth}-${formattedYear}`;
    else if (format.startsWith('MDY') || format.startsWith('MonDY') || format.startsWith('MonthDY'))
        datePart = `${formattedMonth}-${formattedDayDate}-${formattedYear}`;
    else if (format.startsWith('YMD') || format.startsWith('YMonD') || format.startsWith('YMonthD'))
        datePart = `${formattedYear}-${formattedMonth}-${formattedDayDate}`;
    else if (format.startsWith('YDMonth') || format.startsWith('YDMon') || format.startsWith('YDM'))
        datePart = `${formattedYear}-${formattedDayDate}-${formattedMonth}`;

    return {datePart, timePart, dayPart}
}

// maps the date parts on basis of received format. maps as: english numerals to nepali numerals, english nemerals to short and full named
// month for languages (NP:Nepali, EN:English, NP-EN: Nepali Pronunciation In English eg, 'Baisakh')
// dateFormatter(new NepaliDate(), 'formatString') | List of available formats can be found in 'availableFormats.txt' file
const numeralsAdjuster = (dayDate, month, year, dateFormat, language) =>{
    if(dateFormat === 'DMY' || dateFormat === 'MDY' || dateFormat === 'YMD' || dateFormat === 'YDM'){
        if(language === 'EN'){
            return {formattedDayDate: dayDate, formattedMonth: month, formattedYear: year}

        } else {
            month = numeralsMapper(month)
            year = numeralsMapper(year)
            dayDate = numeralsMapper(dayDate)

            return {formattedDayDate: dayDate, formattedMonth: month, formattedYear: year}
        }
    } else if(dateFormat === 'DMonY' || dateFormat === 'MonDY' || dateFormat === 'YMonD' || dateFormat === 'YDMon'){
        if(language === 'EN'){
            month = monthMap[Number(month)]?.shortEN
            return {formattedDayDate: dayDate, formattedMonth: month, formattedYear: year}

        }else if(language === 'NP-EN'){
            month = monthMap[Number(month)]?.shortNP_EN
            return {formattedDayDate: dayDate, formattedMonth: month, formattedYear: year}
        } else{
            month = monthMap[Number(month)]?.short
            year = numeralsMapper(year)
            dayDate = numeralsMapper(dayDate)
            return {formattedDayDate: dayDate, formattedMonth: month, formattedYear: year}
        }
    } else if(dateFormat === 'DMonthY' || dateFormat === 'MonthDY' || dateFormat === 'YMonthD' || dateFormat === 'YDMonth'){
        if(language === 'EN'){
            month = monthMap[Number(month)]?.fullEN
            return {formattedDayDate: dayDate, formattedMonth: month, formattedYear: year}

        }else if(language === 'NP-EN'){
            month = monthMap[Number(month)]?.fullNP_EN
            return {formattedDayDate: dayDate, formattedMonth: month, formattedYear: year}
        } else{
            month = monthMap[Number(month)]?.full
            year = numeralsMapper(year)
            dayDate = numeralsMapper(dayDate)
            return {formattedDayDate: dayDate, formattedMonth: month, formattedYear: year}
        }
    } else{
        throw new Error(`Invalid format. Please use a valid format. You can check 'availableFormats.txt' to see all valid formats.`);
    }
}

// formats time for 12 or 24 hour format for the given language type: language is received via format while using dateFormatter function as
// dateFormatter(new NepaliDate(), 'formatString') | List of available formats can be found in 'availableFormats.txt' file
const timeFormatter = (hour, minutes, timeFormat, language)=>{
    let dayInterval = 'AM'
    if(timeFormat === 'T12'){
        if(hour > 12){
            hour = hour - 12
            dayInterval = 'PM'
        }
        language === 'NP' ? hour = numeralsMapper(hour) : hour = hour
        return `${hour}:${minutes} ${dayInterval}`
    }else{
        if(language === 'NP'){
            hour = numeralsMapper(hour)
            minutes = numeralsMapper(minutes)
        }

        return `${hour}:${minutes}`
    }
}

// Helper to MAP English Numerals To Nepali Numerals
const numeralsMapper = (num) => {
    return num.toString().split('').map(digit => numbersMap[digit]).join('');
};

// gets days name in short or full for the given language type: language is received via format while using dateFormatter function as:
// dateFormatter(new NepaliDate(), 'formatString') | List of available formats can be found in 'availableFormats.txt' file
const dayFormatter = (dayIndex, dayFormat, language) =>{
    if(dayFormat === 'DS'){
        if(language === 'NP'){
            return weekDaysMap[dayIndex]?.short
        }else{
            return weekDaysMap[dayIndex]?.shortEN
        }
    }else{
        if(language === 'NP'){
            return weekDaysMap[dayIndex]?.full
        }else{
            return weekDaysMap[dayIndex]?.fullEN
        }
    }
}





