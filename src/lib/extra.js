/* eslint-disable prettier/prettier */
import Icon from 'react-native-vector-icons/Ionicons';

export const getData = async () => {
    const sources = await Promise.all([Icon.getImageSource('md-map', 30),
    Icon.getImageSource('ios-menu', 30),
    ]).then(sourceData => {

        return [sourceData[0], sourceData[1]];
    }).catch(error => {
        console.error(error.message);
    });
    return sources;
};

// use for sorting data based on timeStamp
export const sortedData = (sampleData) => {
    return sampleData.sort(function (a, b) {
        const currentDay = a.timeStamp;
        const nextDay = b.timeStamp;
        return nextDay - currentDay;
    });

};

// for 12 hours time format
export const getLocalFormat = (timeString) => {

    let dt = new Date(timeString);
    let hours = dt.getHours(); // gives the value in 24 hours format
    let AmOrPm = hours >= 12 ? 'pm' : 'am';
    hours = (hours % 12) || 12;
    const minutes = dt.getMinutes();
    const finalTime = hours + ':' + minutes + AmOrPm;
    return finalTime; // final time Time is - 22:10
};

// for 24 hours time format
export function tim(data) {
    return new Date(data).toLocaleTimeString();
}

// cleaning of string & shortening of string to required uint
export function cleanStr(yourString, maxLength) {
    yourString = yourString.replace(/&nbsp;&nbsp;/g, " ");
    let trimmedString = yourString.substr(0, maxLength);
    //re-trim if we are in the middle of a word
    if (trimmedString.length > maxLength) {
        trimmedString = trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(" ")))
    }
    return trimmedString;
}


