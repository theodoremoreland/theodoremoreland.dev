export default (dateString) => {
    const dateObject = new Date(dateString);
    const UTCDateObject = new Date(dateObject.getTime() - (dateObject.getTimezoneOffset() * 60000 ));
    const UTCDateString = UTCDateObject.toISOString().split("T")[0];
    return UTCDateString;
};