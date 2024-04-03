export const convertNumberToSocialType = (number: number) => new Intl.NumberFormat().format(number);

export const convertTimestampToDateObject = (timestamp: number) => {
    const date = new Date(timestamp);
    return new Intl.DateTimeFormat("en-GB", {
        year: "numeric",
        month: "long",
        day: "numeric",
    }).format(date);
};
