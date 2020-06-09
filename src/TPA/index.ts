const request = require("request");
const cheerioModule = require("cheerio");

export default function getTpa() {
  request(
    {
      method: "GET",
      url: "https://shop.perfumersapprentice.com/specsheetlist.aspx",
    },
    (err, res, body) => {
      const $ = cheerioModule.load(body);

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
