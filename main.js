import { crawlPage } from "./crawl.js";
import { printReport } from "./report.js";

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
