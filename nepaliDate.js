import {convertTo_BS, convertTo_AD} from './converter.js'
import {validateWithBSBounds} from './validationAndExceptions.js'
import {breakDate, weekDaysMap, dateFormatter} from './formatter.js'

class NepaliDate {
    // static format = 'DD-MM-YYYY'
    // can be used to get specfic format cases may be

    constructor(dateString) {
        if(dateString && dateString.length === 10){
            const {dayDate, month, year} = breakDate(dateString)
            validateWithBSBounds(dayDate, month, year)

            this.dayDate = dayDate;
            this.month = month;
            this.year = year;
            
            const now = new Date()
            this.hours = now.getHours()
            this.minutes = now.getMinutes()
            this.seconds = now.getSeconds()
        } else{
            this.dayDate = new Date().getDate();
            this.month = new Date().getMonth() + 1;
            this.year = new Date().getFullYear();

            const {year, month, dayDate} = convertTo_BS(this.dayDate, this.month, this.year)
            validateWithBSBounds(dayDate, month, year)

            this.dayDate = dayDate;
            this.month = month;
            this.year = year;
            
            const now = new Date()
            this.hours = now.getHours()
            this.minutes = now.getMinutes()
            this.seconds = now.getSeconds()
        }
    }

    // value and string manipulations start **may be completed**
    valueOf(){
        return `${this.dayDate.toString().padStart(2, '0')}-${this.month.toString().padStart(2, '0')}-${this.year}`
    }

    toString() {
        return this.valueOf();
    }
    // value and string manipulations end

    // getter setter for day's date, day's name, month, year start
    getDayDate(){
        return this.dayDate.toString().padStart(2, '0')
    }

    setDayDate(dayDate){
        validateWithBSBounds(dayDate, this.month, this.year)
        this.dayDate = dayDate
    }

    getDayIndex(){
        const {dayDate_AD, month_AD, year_AD} = convertTo_AD(this.dayDate, this.month, this.year)
        return new Date(`${month_AD}-${dayDate_AD}-${year_AD}`).getDay() + 1
    }

    getDayFullName(){
        const {dayDate_AD, month_AD, year_AD} = convertTo_AD(this.dayDate, this.month, this.year)
        const dayIndex =  new Date(`${month_AD}-${dayDate_AD}-${year_AD}`).getDay()
        return weekDaysMap[dayIndex + 1]?.fullEN;
    }

    getMonth(){
        return this.month.toString().padStart(2, '0')
    }

    setMonth(month){
        validateWithBSBounds(this.dayDate, month, this.year)
        this.month = month        
    }

    getYear(){
        return this.year.toString()
    }

    setYear(year){
       validateWithBSBounds(this.dayDate, this.month, year)
       this.year = year
    }
    // getter setter for day's date, day's name, month, year end

    // getter setter for hour, minutes, seconds start
    getHours(){
        return this.hours
    }

    setHours(hours){
        this.hours = hours
    }

    getMinutes(){
        return this.minutes
    }

    setMinutes(minutes){
        this.minutes = minutes
    }

    getSeconds(){
        return this.seconds
    }

    setSeconds(seconds){
        this.seconds = seconds
    }
    // getter setter for hour, minutes, seconds end

    // getter setter for time start | setter as: (hours, minutes, seconds)
    getTime(){
        return `${this.hours.toString().padStart(2, '0')}:${this.minutes.toString().padStart(2, '0')}:${this.seconds.toString()
            .padStart(2, '0')}`
    }

    setTime(hours, minutes, seconds){
        this.hours = hours
        this.minutes = minutes
        this.seconds = seconds
    }
    // getter setter for time (hh:mm:ss) end

    // getter setter for date and time start | setter as: (date, month, year, hours, minutes, seconds)
    getDateTime(){
        const dateString = `${this.dayDate.toString().padStart(2, '0')}-${this.month.toString().padStart(2, '0')}-${this.year}`
        const timeString = `${this.hours.toString().padStart(2, '0')}:${this.minutes.toString().padStart(2, '0')}:${this.seconds.toString()
            .padStart(2, '0')}`

        return `${dateString} | ${timeString}`
    }

    setDateTime(date, month, year, hours, minutes, seconds){
        validateWithBSBounds(date, month, year)
        this.dayDate = date
        this.month = month
        this.year = year
        this.hours = hours
        this.minutes = minutes
        this.seconds = seconds
    }
    // getter setter for date and time end

    // function to convert to AD date start
    getAD(){
        const {dayDate_AD, month_AD, year_AD} = convertTo_AD(this.dayDate, this.month, this.year)
        return `${dayDate_AD.toString().padStart(2, '0')}-${month_AD.toString().padStart(2, '0')}-${year_AD}`
    }
    // function to convert to AD date end

    now(){
        return this.getDateTime()
    }
}

export default NepaliDate
