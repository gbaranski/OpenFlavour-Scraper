import fetch from "node-fetch";
const cheerioModule = require("cheerio");

export default async function getCapella() {
  const res = await fetch(
    "https://www.capellaflavors.com/flavors?product_list_limit=all&product_list_mode=list"
  );
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
  return flavors;
}
