function getCurrentTimeStampString() {
    const date = new Date();
    return date.toISOString();
}

function getCurrentTimeDifferenceInSeconds(date) {
    const timeStamp_1 = new Date();
    const timeStamp_2 = new Date(date);
    return (timeStamp_1.getTime() - timeStamp_2.getTime()) / 1000;
}

function getTimeDifferenceInSeconds(date_1, date_2) {
    const timeStamp_1 = new Date(date_1);
    const timeStamp_2 = new Date(date_2);
    return (timeStamp_1.getTime() - timeStamp_2.getTime()) / 1000;
}

export {
    getCurrentTimeStampString,
    getTimeDifferenceInSeconds,
    getCurrentTimeDifferenceInSeconds
};
