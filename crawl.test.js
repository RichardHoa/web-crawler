import { normalizeURL, getURLsFromHTML } from "./crawl";

test("normalizedURL | URL with /", () => {
  expect(normalizeURL("https://blog.boot.dev/path/")).toBe(
    "blog.boot.dev/path"
  );
});

test("normalizedURL | URL without /", () => {
  expect(normalizeURL("https://jestjs.io/docs/getting-started")).toBe(
    "jestjs.io/docs/getting-started"
  );
});

test("normalizedURL | Really long URL", () => {
  expect(
    normalizeURL(
      "https://www.example.com/path/to/resource/this/is/a/very/long/path/with/lots/of/segments/and/many/query/parameters?param1=value1&param2=value2&param3=value3&param4=value4&param5=value5&param6=value6&param7=value7&param8=value8&param9=value9&param10=value10&param11=value11&param12=value12&param13=value13&param14=value14&param15=value15&param16=value16&param17=value17&param18=value18&param19=value19&param20=value20&param21=value21&param22=value22&param23=value23&param24=value24&param25=value25&param26=value26&param27=value"
    )
  ).toBe(
    "www.example.com/path/to/resource/this/is/a/very/long/path/with/lots/of/segments/and/many/query/parameters"
  );
});

test("normalizedURL | URL without / Capitalized", () => {
  expect(normalizeURL("https://JESTJS.io/docs/getting-started")).toBe(
    "jestjs.io/docs/getting-started"
  );
});


test("getURLsFromHTML | HTML with multiple links", () => {
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
  
  const expectedArray = [
    "https://boot.dev/",
    "https://boot.dev/deep-path/one",
    "https://boot.dev/deep-path/two",
    "https://boot.dev/deep-path/one/two/three",
    "https://boot.dev/deep-path/one/two/three/four/five",
  ];

  expect(getURLsFromHTML(html, "https://boot.dev")).toEqual(expectedArray);
});



test("getURLsFromHTML | HTML with one link", () => {
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
      </ul>
  </body>
  </html>
  `;
  const expectedArray = [
    "https://boot.dev/",

  ];

  expect(getURLsFromHTML(html, "https://boot.dev")).toEqual(expectedArray);

});


test("getURLsFromHTML | HTML with relative link", () => {
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
          <li><a href="super-complicated/deep/path/to/resource" target="_blank">Link 1</a></li>
      </ul>
  </body>
  </html>
  `;
  
  const expectedArray = [
    "https://boot.dev/super-complicated/deep/path/to/resource",
  ];

  expect(getURLsFromHTML(html, "https://boot.dev")).toEqual(expectedArray);

});
