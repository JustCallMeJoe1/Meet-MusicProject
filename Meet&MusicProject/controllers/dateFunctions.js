//Conversion Methods. All the mappings from Military Times to normal people times. I hate HTML.
exports.convertNumberToMonth = (monthNumber) => {
    let formattedMonth = "";
    switch(monthNumber) {
        case "01":
            formattedMonth = "January";
            break;
        case "02":
            formattedMonth = "February";
            break;
        case "03":
            formattedMonth = "March";
            break; 
        case "04":
            formattedMonth = "April";
            break;
        case "05":
            formattedMonth = "May";
            break;
        case "06":
            formattedMonth = "June";
            break;
        case "07":
            formattedMonth = "July";
            break;
        case "08":
            formattedMonth = "August";
            break;
        case "09":
            formattedMonth = "September";
            break;
        case "10":
            formattedMonth = "October";
            break;
        case "11":
            formattedMonth = "November";
            break;
        case "12":
            formattedMonth = "December";
            break;
        default:
            formattedMonth = "An error has occurred processing the month."                                     
    }
    return formattedMonth;
}

exports.convertNumberToPrefix = (dayNumber) => {
    let dayEnding = "";
        switch(dayNumber) {
            case "01":
                dayEnding = "st";
                break;
            case "02":
                dayEnding = "nd";
                break;
            case "03":
                dayEnding = "rd";
                break; 
            case "04":
                dayEnding = "th";
                break;
            case "05":
                dayEnding = "th";
                break;
            case "06":
                dayEnding = "th";
                break;
            case "07":
                dayEnding = "th";
                break;
            case "08":
                dayEnding = "th";
                break;
            case "09":
                dayEnding = "th";
                break;
            case "10":
                dayEnding = "th";
                break;
            case "11":
                dayEnding = "th";
                break;
            case "12":
                dayEnding = "th";
                break;
            case "13":
                dayEnding = "th";
                break;
            case "14":
                dayEnding = "th";
                break;
            case "15":
                dayEnding = "th";
                break; 
            case "16":
                dayEnding = "th";
                break;
            case "17":
                dayEnding = "th";
                break;
            case "18":
                dayEnding = "th";
                break;
            case "19":
                dayEnding = "th";
                break;
            case "20":
                dayEnding = "th";
                break;
            case "21":
                dayEnding = "st";
                break;
            case "22":
                dayEnding = "nd";
                break;
            case "23":
                dayEnding = "rd";
                break;
            case "24":
                dayEnding = "th";
                break;
            case "25":
                dayEnding = "th";
                break;
            case "26":
                dayEnding = "th";
                break;
            case "27":
                dayEnding = "th";
                break; 
            case "28":
                dayEnding = "th";
                break;
            case "29":
                dayEnding = "th";
                break;
            case "30":
                dayEnding = "th";
                break;
            case "31":
                dayEnding = "st";
                break;
            default:
                dayEnding = "An error has occurred processing the prefix."
            }
    return dayEnding;
}

exports.convertTime = (milHour) => {
    let normalNumber = "";
    switch(milHour) {
        case "01":
            normalNumber = "01";
            break;
        case "02":
            normalNumber = "02";
            break;
        case "03":
            normalNumber = "03";
            break; 
        case "04":
            normalNumber = "04";
            break;
        case "05":
            normalNumber = "05";
            break;
        case "06":
            normalNumber = "06";
            break;
        case "07":
            normalNumber = "07";
            break;
        case "08":
            normalNumber = "08";
            break;
        case "09":
            normalNumber = "09";
            break;
        case "10":
            normalNumber = "10";
            break;
        case "11":
            normalNumber = "11";
            break;
        case "12":
            normalNumber = "12";
            break;
        case "13":
            normalNumber = "01";
            break;
        case "14":
            normalNumber = "02";
            break;
        case "15":
            normalNumber = "03";
            break; 
        case "16":
            normalNumber = "04";
            break;
        case "17":
            normalNumber = "05";
            break;
        case "18":
            normalNumber = "06";
            break;
        case "19":
            normalNumber = "07";
            break;
        case "20":
            normalNumber = "08";
            break;
        case "21":
            normalNumber = "09";
            break;
        case "22":
            normalNumber = "10";
            break;
        case "23":
            normalNumber = "11";
            break;
        case "00":
            normalNumber = "12";
            break;
    }
    return normalNumber;
}

exports.convertPeriod = (periodTime) => {
    let returnedPeriod = "";
    if (periodTime < 12) {
        returnedPeriod = "AM";
    } else {
        returnedPeriod = "PM";
    }
    return returnedPeriod;
}