export function ShortenNumber(number: number | undefined): string {
    if (number !== undefined) {
        if (number >= 1000000) {
            return (number / 1000000).toFixed(1) + 'M';
        } else if (number >= 1000) {
            return (number / 1000).toFixed(1) + 'K';
        } else {
            return number.toString();
        }
    } else {
        return ""; // Or any other default value or error handling you prefer
    }
}
