import {normalizeURL, getURLsFromHTML}  from "./crawl.js";


// const normalURL = normalizeURL("https://blog.boot.dev/path/")
// console.log(normalURL)
const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Page with 10 Links</title>
</head>
<body>
    <h1>Welcome to the Page with 10 Links</h1>
    <ul>
        <li><a href="https://boot.dev" target="_blank">Link 1</a></li>
        <li><a href="https://boot.dev/deep-path/one" target="_blank">Link 2</a></li>
        <li><a href="https://boot.dev/deep-path/two" target="_blank">Link 2</a></li>
        <li><a href="https://boot.dev/deep-path/one/two/three" target="_blank">Link 2</a></li>
        <li><a href="https://boot.dev/deep-path/one/two/three/four/five" target="_blank">Link 2</a></li>
    </ul>
</body>
</html>
`;

const urlArrays = getURLsFromHTML(html, "https://boot.dev")
console.log(urlArrays)
