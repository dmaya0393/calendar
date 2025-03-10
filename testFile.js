
// const today = new NepaliDate()
// const npDate = document.querySelector('.nepali-date-np')
// npDate.textContent += " " + today.toString()

// const enDate = document.querySelector('.english-date')
// enDate.textContent += " " + today.toString()

// // console.log('Time',today.getDateTime())
// today.setDateTime(24,7,2082, 22,58,40)
// // console.log(today.getDateTime())


// const setDayDate = new NepaliDate('03-04-2000')
// setDayDate.setYear(2000)


// case of NP_random will also be true, which should not happen. 
const formattedDate1 = dateFormatter(new NepaliDate(), 'DMonthY_T24_DS')
const formattedDate2 = dateFormatter(new NepaliDate(), 'DMonthY_T24_DS_EN')       
const formattedDate3 = dateFormatter(new NepaliDate(), 'DMonthY_T24_DS_NP-EN')        // time is in nepali lang

const formattedDate4 = dateFormatter(new NepaliDate(), 'MonDY_T12_DS')
const formattedDate5 = dateFormatter(new NepaliDate(), 'MonDY_T12_DS_EN')
const formattedDate6 = dateFormatter(new NepaliDate(), 'MonDY_T12_DS_NP-EN') // time is in nepali lang

const formattedDate7 = dateFormatter(new NepaliDate(), 'YMonD_T12_DS')
const formattedDate8 = dateFormatter(new NepaliDate(), 'YMonD_T12_DS_EN')
const formattedDate9 = dateFormatter(new NepaliDate(), 'YMonD_T12_DS_NP-EN')    // time is in nepali lang

const formattedDate10 = dateFormatter(new NepaliDate(), 'YDM_T12_DS')
const formattedDate11 = dateFormatter(new NepaliDate(), 'YDM_T12_DS_EN')
const formattedDate12 = dateFormatter(new NepaliDate(), 'YDM_T12_DS_NP-EN')     // time is in nepali lang


console.log('Format', 'DMonthY_T24_DS')
console.log('1 Date NP', formattedDate1.datePart, formattedDate1.timePart, formattedDate1.dayPart)
console.log('2 Date EN', formattedDate2.datePart, formattedDate2.timePart, formattedDate2.dayPart)
console.log('3 Date NP_EN', formattedDate3.datePart, formattedDate3.timePart, formattedDate3.dayPart)

console.log('==========================================================================')

console.log('Format', 'MonDY_T12_DS')
console.log('4 Date NP', formattedDate4.datePart, formattedDate4.timePart, formattedDate4.dayPart)
console.log('5 Date EN', formattedDate5.datePart, formattedDate5.timePart, formattedDate5.dayPart)
console.log('6 Date NP_EN', formattedDate6.datePart, formattedDate6.timePart, formattedDate6.dayPart)

console.log('==========================================================================')

console.log('Format', 'YMonD_T12_DS')
console.log('7 Date NP', formattedDate7.datePart, formattedDate7.timePart, formattedDate7.dayPart)
console.log('8 Date EN', formattedDate8.datePart, formattedDate8.timePart, formattedDate8.dayPart)
console.log('9 Date NP_EN', formattedDate9.datePart, formattedDate9.timePart, formattedDate9.dayPart)

console.log('==========================================================================')

console.log('Format', 'YDM_T12_DS')
console.log('10 Date NP', formattedDate10.datePart, formattedDate10.timePart, formattedDate10.dayPart)
console.log('11 Date EN', formattedDate11.datePart, formattedDate11.timePart, formattedDate11.dayPart)
console.log('12 Date NP_EN', formattedDate12.datePart, formattedDate12.timePart, formattedDate12.dayPart)


// console.log('Full Date',new NepaliDate().now())


// console.log('default', formatDateAndTime(new NepaliDate()))

// console.log('month Full', formatDate(new NepaliDate('29-11-2081'), 'monthFull'))
// // console.log('monthFull_EN', formatDate(new NepaliDate(), 'monthFull_EN'))
// // console.log('monthShort', formatDate(new NepaliDate(), 'monthShort'))
// // console.log('monthShortNP_EN', formatDate(new NepaliDate(), 'monthShortNP_EN'))
// console.log('new', (formatDate(new NepaliDate(), 'new')).dateFormat)
// console.log('new', (formatDate(new NepaliDate(), 'new')).dayFormat)
// console.log('new', (formatDate(new NepaliDate(), 'new')).timeFormat)
// const fullDate = formatDate(new NepaliDate(`29-11-2081`))

// console.log('Full Date',fullDate.dayFormat, fullDate.dateFormat, fullDate.timeFormat)

// console.log('Nepali Date & T', ((formatDate(new NepaliDate(), 'new')).timeFormat), (formatDate(new NepaliDate(), 'new')).timeFormat))


{/* <p class="test-english-date">Test English Date EN:</p>
<p class="test-nepali-date-np">Test Nepali Date NP:</p> */}

// const todayTest = new NepaliDate("20-11-2081")
// const npDateTest = document.querySelector('.test-nepali-date-np')
// npDateTest.textContent += " " + todayTest.toString()

// const enDateTest = document.querySelector('.test-english-date')
// enDateTest.textContent += " " + new NepaliDate("20-11-2081").getAD()



// const npDayIndex = document.querySelector('.day-index-np')
// npDayIndex.textContent += " " + today.getDayIndex()

// const npDayFullName = document.querySelector('.day-full-name-np')
// npDayFullName.textContent += " " + today.getDayFullName()
// // const npDayDate = document.querySelector('.day-date-np')
// // npDayDate.textContent += " " + today.getDayDate()
// // const npMonth = document.querySelector('.month-np')
// // npMonth.textContent += " " + today.getMonth()
// // const npYear = document.querySelector('.year-np')
// // npYear.textContent += " " + today.getYear()

// const dateInputElement = document.querySelector('.nepali-date-reader');

// console.log('DAY NAME', new NepaliDate().toString())

// dateInputElement.addEventListener('input', () => {
//     let inputValue = dateInputElement.value;

//     // Remove any non-numeric characters (to make sure we're working only with digits)
//     inputValue = inputValue.replace(/\D/g, '');

//     // Limit the input to 8 characters (2 for day, 2 for month, 4 for year)
//     if (inputValue.length > 8) {
//         inputValue = inputValue.substring(0, 8); // Trim to 8 characters
//     }

//     // Add hyphens after the second and fourth characters to get the format "dd-mm-yyyy"
//     let formattedValue = '';
//     for (let i = 0; i < inputValue.length; i++) {
//         if (i === 2 || i === 4) {
//             formattedValue += '-';
//         }
//         formattedValue += inputValue[i];
//     }

//     // Update the input field with the formatted value
//     dateInputElement.value = formattedValue;
//     console.log(dateInputElement.value)

//     const nepaliDate = new NepaliDate(`${dateInputElement.value}`)
//     console.log(nepaliDate)
// });


// dateInputElement.addEventListener('input', () => {
//     let inputValue = dateInputElement.value;

//     // Remove any non-numeric characters to keep only digits
//     inputValue = inputValue.replace(/\D/g, '');

//     // Limit the input to 8 characters (2 for day, 2 for month, 4 for year)
//     if (inputValue.length > 8) {
//         inputValue = inputValue.substring(0, 8); // Trim to 8 characters
//     }

//     // Separate the input value into day, month, and year parts
//     let day = inputValue.slice(0, 2);  // First 2 digits are for the day
//     let month = inputValue.slice(2, 4);  // Next 2 digits are for the month
//     let year = inputValue.slice(4, 8);  // Last 4 digits are for the year

//     // Formatting the day, month, and year
//     let formattedValue = '';
//     if (day) formattedValue += day; // Add day if available
//     if (month) formattedValue += '-' + month; // Add month if available
//     if (year) formattedValue += '-' + year; // Add year if available

//     // Update the input field with the formatted value
//     dateInputElement.value = formattedValue;

//     // Log the formatted value for debugging
//     console.log(dateInputElement.value);

//     // Convert to Nepali date (if needed)
//     const nepaliDate = new NepaliDate(`${dateInputElement.value}`);
//     console.log(nepaliDate);
// });
