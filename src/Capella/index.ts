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

      $(".product-item-link").each(function () {
        // @ts-ignore
        console.log($(this).text());
      });
    }
  );
}
