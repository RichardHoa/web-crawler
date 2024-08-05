export function normalizeURL(url) {
    const urlObject = new URL(url);
    if (urlObject.pathname.endsWith("/")) {
        urlObject.pathname = urlObject.pathname.slice(0, -1);
    }
    return `${urlObject.host}${urlObject.pathname}` 
}









