import { normalizeURL } from "./crawl";

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
  ).toBe("www.example.com/path/to/resource/this/is/a/very/long/path/with/lots/of/segments/and/many/query/parameters");
});
