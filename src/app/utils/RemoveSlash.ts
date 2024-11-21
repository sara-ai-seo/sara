export function removeTrailingSlash(str: string):string {
    if (typeof str !== 'string') {
        throw new Error('Input must be a string');
    }

    if (str.endsWith('/')) {
        return str.slice(0, -1);
    } else {
        return str;
    }
}
