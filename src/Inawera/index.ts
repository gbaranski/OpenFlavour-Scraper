import fetch from "node-fetch";

const cheerioModule = require("cheerio");

export async function getMaxPages() {
  const res = await fetch(
    "http://www.inaweraflavours.com/en/7-e-flavours?n=50&id_category=7&p=1"
  );
  const $ = cheerioModule.load(await res.text());
  return $("#pagination > ul > li:nth-child(6) > a").text();
}

export default async function getInawera(maxPages: number) {
  let currentPage = 1;
  const flavors = [{}];

  while (currentPage <= maxPages) {
    console.log(`Scraping page ${currentPage}`);
    let url = `http://www.inaweraflavours.com/en/7-e-flavours?n=50&id_category=7&p=${currentPage}`;

    currentPage += 1;

    fetch(url).then(async (res) => {
      const $ = cheerioModule.load(await res.text());
      const flavorsOnPage = [{}];
      $("h3").each(function () {
        const flavor = $(this);
        flavorsOnPage.push({
          name: flavor
            .text()
            .trim()
            .replace(/(\r\n|\n|\r)/gm, ""),
        });
      });
      flavorsOnPage.shift(); // removed empty arr
      flavorsOnPage.shift(); // removes "subcategories " element
      console.log(flavorsOnPage);
      flavors.push(flavorsOnPage);
    });
  }
}
