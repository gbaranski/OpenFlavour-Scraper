import fetch from "node-fetch";
const cheerioModule = require("cheerio");

export default async function getTpa() {
  const flavors = [{}];
  await fetch("https://shop.perfumersapprentice.com/specsheetlist.aspx").then(
    async (res) => {
      const $ = cheerioModule.load(await res.text());

      $("tr").each(function () {
        const flavor = $(this).children().first();
        flavors.push({
          name: flavor.text().replace(/(\r\n|\n|\r)/gm, ""),
        });
      });
    }
  );
  flavors.shift();
  return flavors;
}
