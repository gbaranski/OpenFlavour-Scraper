import fetch from "node-fetch";
const cheerioModule = require("cheerio");

export default async function getCapella() {
  fetch(
    "https://www.capellaflavors.com/flavors?product_list_limit=all&product_list_mode=list"
  ).then(async (res) => {
    const $ = cheerioModule.load(await res.text());

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
  });
}
