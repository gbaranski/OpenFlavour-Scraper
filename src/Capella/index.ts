const request = require("request");
const cheerioModule = require("cheerio");

export default function getCapella() {
  request(
    {
      method: "GET",
      url:
        "https://www.capellaflavors.com/flavors?product_list_limit=all&product_list_mode=list",
    },
    (err, res, body) => {
      const $ = cheerioModule.load(body);

      const flavors = [{}];

      $(".product-item-link").each(function () {
        const flavor = $(this);
        flavors.push({
          name: flavor
            .text()
            .trim()
            .replace(/(\r\n|\n|\r)/gm, ""),
        });
      });
      console.log(flavors);
    }
  );
}
