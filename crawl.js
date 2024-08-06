import { JSDOM } from 'jsdom';


export function normalizeURL(url) {
    const urlObject = new URL(url);
    if (urlObject.pathname.endsWith("/")) {
        urlObject.pathname = urlObject.pathname.slice(0, -1);
    }
    return `${urlObject.host}${urlObject.pathname}` 
}

export function getURLsFromHTML(html,baseURL) {
    const urlArrays = [];
    const dom = new JSDOM(html);
    const links = dom.window.document.querySelectorAll('a');
    for (const link of links) {
        const href = link.getAttribute('href');
        if (href) {
            const url = new URL(href, baseURL);
            urlArrays.push(url.href);
        } else {
            throw new Error("Link has no href attribute");
        }
    }
    return urlArrays

}







