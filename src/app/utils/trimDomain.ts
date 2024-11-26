export function trimDomain(url: string): string | null {
    try {
        // Ensure the URL starts with a scheme
        if (!/^https?:\/\//i.test(url)) {
            url = 'http://' + url; // Add default scheme if missing
        }

        const hostname = new URL(url).hostname;

        // Remove 'www.' prefix if it exists
        return hostname.startsWith('www.') ? hostname.slice(4) : hostname;
    } catch (error) {
        console.error("Invalid URL provided:", url, error);
        return null; // Return null or handle as needed
    }
}