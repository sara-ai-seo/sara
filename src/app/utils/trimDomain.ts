export function trimDomain(url:string) {
    let hostname = new URL(url).hostname;
    if (hostname.startsWith('www.')) {
        hostname = hostname.slice(4);
    }

    return hostname;
}