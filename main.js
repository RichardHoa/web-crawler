import { normalizeURL, getURLsFromHTML, crawlPage } from "./crawl.js";
import {printReport} from "./report.js";

// const normalURL = normalizeURL("https://blog.boot.dev/path/")
// console.log(normalURL)

// const html = `
// <!DOCTYPE html>
// <html lang="en">
// <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>Page with 10 Links</title>
// </head>
// <body>
//     <h1>Welcome to the Page with 10 Links</h1>
//     <ul>
//         <li><a href="https://boot.dev" target="_blank">Link 1</a></li>
//         <li><a href="https://boot.dev/deep-path/one" target="_blank">Link 2</a></li>
//         <li><a href="https://boot.dev/deep-path/two" target="_blank">Link 2</a></li>
//         <li><a href="https://boot.dev/deep-path/one/two/three" target="_blank">Link 2</a></li>
//         <li><a href="https://boot.dev/deep-path/one/two/three/four/five" target="_blank">Link 2</a></li>
//     </ul>
// </body>
// </html>
// `;

// const urlArrays = getURLsFromHTML(html, "https://boot.dev")
// console.log(urlArrays)

async function main() {
  const args = process.argv.slice(2);

  if (args.length !== 1) {
    console.error(
      "Error: Please provide exactly one argument. Usage: npm start <url>"
    );
    process.exit(1);
  } else {
    const url = args[0];
    console.log(`The url ${url} is being processed, please wait...`);

    const dict_report = await crawlPage(url);
    printReport(dict_report);
  }
}

main();
