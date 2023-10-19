
export function getCountDown(eventDate){
    const currentDate = new Date();
    const timeDifference = new Date(eventDate) - currentDate;
    const daysRemaining = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    return daysRemaining === 0 ? `Today` : `in ${daysRemaining} days`;
}