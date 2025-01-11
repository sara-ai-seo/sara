// export function ShortenNumber(number: number | undefined): string {
//     if (number !== undefined) {
//         if (number >= 1000000) {
//             return (number / 1000000).toFixed(1) + 'M';
//         } else if (number >= 1000) {
//             return (number / 1000).toFixed(1) + 'K';
//         } else {
//             return number.toString();
//         }
//     } else {
//         return ""; // Or any other default value or error handling you prefer
//     }
// }



export function ShortenNumber(number: number | undefined): string {
    if (number === undefined) {
        return "";
    }

    const isNegative = number < 0; // Check if the number is negative
    const absNumber = Math.abs(number); // Get the absolute value

    let shortenedNumber: string;

    if (absNumber >= 1000000) {
        shortenedNumber = (absNumber / 1000000).toFixed(1) + 'M';
    } else if (absNumber >= 1000) {
        shortenedNumber = (absNumber / 1000).toFixed(1) + 'K';
    } else {
        shortenedNumber = absNumber.toString();
    }

    return isNegative ? "-" + shortenedNumber : shortenedNumber; 
}