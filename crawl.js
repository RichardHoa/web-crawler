import { JSDOM } from "jsdom";

export function normalizeURL(url) {
  const urlObject = new URL(url);
  if (urlObject.pathname.endsWith("/")) {
    urlObject.pathname = urlObject.pathname.slice(0, -1);
  }
  return `${urlObject.host}${urlObject.pathname}`;
}

export function getURLsFromHTML(html, baseURL) {
  const urlArrays = [];
  const dom = new JSDOM(html);
  const links = dom.window.document.querySelectorAll("a");

  links.forEach((link, index) => {
    const href = link.getAttribute("href");
    if (href) {
        const url = new URL(href, baseURL);
        urlArrays.push(url.href);
      } else {
          console.log(`Link ${link} has no href attribute`);
        throw new Error("Link has no href attribute");
      }
  });
  return urlArrays;
}

export async function crawlPage(baseURL, currentURL= baseURL, pages={}) {
  try {
    const baseDomain = new URL(baseURL).hostname;
    const currentDomain = new URL(currentURL).hostname;

    if (baseDomain !== currentDomain) {
      return pages;
    }

    const normalizeCurrentURL = normalizeURL(currentURL);
    // console.log("-----------------------------------")
    // console.log(`Processing: ${normalizeCurrentURL}`);
    
    if (pages[normalizeCurrentURL]) {
        pages[normalizeCurrentURL]++;
        return pages;
    } else {
        pages[normalizeCurrentURL] = 1;
    }
    // console.log(`Pages: ${JSON.stringify(pages)}`);

    const html = await helperCrawlPage(currentURL);

    const urlArrays = getURLsFromHTML(html, baseURL);
    for (const url of urlArrays) {
    //   console.log(`crawlPage(${baseURL}, ${url}, ${JSON.stringify(pages)})`);
      pages = await crawlPage(baseURL, url, pages);
    }

    return pages;

  } catch (error) {
    // Handle any errors that occurred during fetch
    console.error(`Error: ${error.message}`);
  }
}

async function helperCrawlPage(url) {
  const response = await fetch(url);

  if (!response.ok) {
    console.error(`Error: Received status code ${response.status}`);
    return;
  }

  const contentType = response.headers.get("content-type");
  if (!contentType || !contentType.includes("text/html")) {
    console.error(
      `Error: Expected content-type text/html but received ${contentType}`
    );
    return;
  }

  const html = await response.text();
  return html;
}
