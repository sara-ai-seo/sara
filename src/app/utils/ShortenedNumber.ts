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

    const isNegative = number < 0;
    const absNumber = Math.abs(number);

    let shortenedNumber: string;

    if (absNumber >= 1000000) {
        shortenedNumber = parseFloat((absNumber / 1000000).toFixed(2)).toString() + 'M';
    } else if (absNumber >= 1000) {
        shortenedNumber = parseFloat((absNumber / 1000).toFixed(2)).toString() + 'K';
    } else {
        shortenedNumber = parseFloat(absNumber.toFixed(2)).toString();
    }

    return isNegative ? "-" + shortenedNumber : shortenedNumber;
}