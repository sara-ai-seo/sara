// export function trimDomain(url:string) {
//     let hostname = new URL(url).hostname;
//     if (hostname.startsWith('www.')) {
//         hostname = hostname.slice(4);
//     }

//     return hostname;
// }

export function trimDomain(url: string) {
    try {
        // Ensure the URL is valid
        const validUrl = new URL(url);
        let hostname = validUrl.hostname;

        // Remove 'www.' if present
        if (hostname.startsWith('www.')) {
            hostname = hostname.slice(4);
        }

        return hostname;
    } catch (error) {
        console.error("Invalid URL provided:", url);
        return null; // or handle the error as needed
    }
}