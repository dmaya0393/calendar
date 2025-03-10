import {NEPALI_CALENDAR_DATA, LEAP_YEAR_MONTHLY_DAYS_COUNT, NON_LEAP_YEAR_MONTHLY_DAYS_COUNT} from './constants.js'

export const convertTo_BS = (dayDate, month, year) =>{
    return daysCountAD_To_BSDate(daysCount_BetnInputDate_And_AD_Offset(dayDate, month, year))
}

export const convertTo_AD = (dayDate, month, year) =>{
    const BS_date_days_count = daysCount_BetnInputDate_And_BS_Offset(dayDate, month, year)
    const {dayDate_AD, month_AD, year_AD} = daysCountBS_To_ADDate(BS_date_days_count)
    return {dayDate_AD, month_AD, year_AD}
}

const leapYearCheck = (year) =>{
    return year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0)
}

// AD Offset date: April(04) 14, 1943
// the function initially keeps daysCount at '261'. It is the number of days the year 1943 has.
// And the remaining days from 1944 Jan 01 till the input date is calculated with the loops.
// month loop is considered from 1 to 12 unlike normal case of 0 to 11
const daysCount_BetnInputDate_And_AD_Offset = (dayDate, month ,year) =>{
    let onsetYear = 1944
    let onsetMonth = 1
    let onsetDate = 1
    let daysCount = 261
    let i = 1
    let breakFlag = false

    dayDate = Number(dayDate)
    month = Number(month)
    year = Number(year)

    while(!breakFlag){
        const monthlyDaysArray = leapYearCheck(onsetYear) ? LEAP_YEAR_MONTHLY_DAYS_COUNT : NON_LEAP_YEAR_MONTHLY_DAYS_COUNT
        while(onsetMonth <= 12 && !breakFlag){
            while( onsetDate <= monthlyDaysArray[onsetMonth-1] && !breakFlag){
                if( onsetDate === dayDate && onsetMonth === month && onsetYear === year)
                    breakFlag = true
                
                onsetDate++
                daysCount++
                i++
            }
            onsetDate = 1
            onsetMonth++
        }
        onsetMonth = 1
        onsetYear++
    }
    return daysCount
}

const daysCountAD_To_BSDate = (daysCount) =>{
    // onsetDay is the day index of 1943 April 14 ie, Saturday
    let year= 0, month=0, dayDate=1, onsetDay = 6, breakFlag;

    while(!breakFlag){
        const [yearData, totalDaysOfYear] = NEPALI_CALENDAR_DATA[year]
        if(daysCount > totalDaysOfYear){
            onsetDay = onsetDay + totalDaysOfYear
            daysCount = daysCount - totalDaysOfYear
        } else{
            while(month <= 11 && !breakFlag){
                if(daysCount > yearData[month]){
                    onsetDay = onsetDay + yearData[month]
                    daysCount = daysCount - yearData[month]
                } else{
                    while(daysCount !== 0){
                        onsetDay++
                        daysCount--
                        dayDate++
                        if(daysCount === 0)
                            breakFlag = true
                    }
                }
                month++
            }
        }
        year++
    }
    year = year + 1999
    return {year, month, dayDate}
}

// BS Offset Date: 2000 Baisakh 01
const daysCount_BetnInputDate_And_BS_Offset = (dayDate, month, year) =>{
    let daysCount = 0;
    // this is done to match the indexing thing with the NEPALI_CALENDAR_DATA array. its mostly dealing with 'i' in the code below.
    // however i dont completely understand its actual importance.
    const yearIndexIn_NEPALI_CALENDAR_DATA = year - 1999

    let i = 0
    while(i < yearIndexIn_NEPALI_CALENDAR_DATA){
        const yearCalendar = NEPALI_CALENDAR_DATA[i]
        const [monthlyDays, totalDays] = yearCalendar

        if(i+1 === yearIndexIn_NEPALI_CALENDAR_DATA){
            // j is supposed to be in relation with month
            // its initialised at 0, so that the condition when j is 11 it can still satisfy condition 'j < month' as month can be 12
            // also the check j + 1 === Number(month) is to match the case of 12 === 12 in case month comes as 12.
            // considering that i have set months index to be from 1 till 12
            let j = 0
            while(j < month){
                if(j+1 === Number(month)){
                    let k = 1
                    while(k <= dayDate){
                        daysCount++
                        k++
                    }
                }else{
                    daysCount = daysCount + monthlyDays[j]
                }
                j++
            }
        } else{
            daysCount = daysCount + totalDays
        }
        i++
    }
    return daysCount;
}

const daysCountBS_To_ADDate = (daysCount) =>{
    daysCount = daysCount + 103
    let baseYear = 1943
    let ad_Month = 0
    let breakYearlyIteration = false

    while(!breakYearlyIteration){
        const yearlyTotalDays = (leapYearCheck(baseYear) ? 366 : 365)
        while(daysCount > yearlyTotalDays){
            const yearlyTotalDays = (leapYearCheck(baseYear) ? 366 : 365)
            daysCount = daysCount - yearlyTotalDays
            baseYear++
        }

        if(daysCount < yearlyTotalDays)
            breakYearlyIteration = true
    }

    const monthlyDaysArray = leapYearCheck(baseYear) ? LEAP_YEAR_MONTHLY_DAYS_COUNT : NON_LEAP_YEAR_MONTHLY_DAYS_COUNT 
            while(daysCount > monthlyDaysArray[ad_Month]){
                daysCount = daysCount - monthlyDaysArray[ad_Month]
                ad_Month % 12
                ad_Month++
            }

    return {dayDate_AD: daysCount, month_AD: ad_Month + 1, year_AD: baseYear }
}
