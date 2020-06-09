import fetch from "node-fetch";
const cheerioModule = require("cheerio");

export default function getTpa() {
  fetch("https://shop.perfumersapprentice.com/specsheetlist.aspx").then(
    async (res) => {
      const $ = cheerioModule.load(await res.text());

      const flavors = [{}];

      $("tr").each(function () {
        const flavor = $(this).children().first();
        flavors.push({
          name: flavor.text().replace(/(\r\n|\n|\r)/gm, ""),
        });
      });
      console.log(flavors);
    }
  );
}
