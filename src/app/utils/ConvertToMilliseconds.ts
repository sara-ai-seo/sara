export function ConvertToMilliuseconds(milliseconds: number) {
    // Convert milliseconds to minutes
    const minutes = Math.floor(milliseconds / 60000);
    // Calculate remaining seconds
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    // Format the output as "m:ss"
    return `${minutes}:${(seconds < 10 ? '0' : '')}${seconds}`;
}
