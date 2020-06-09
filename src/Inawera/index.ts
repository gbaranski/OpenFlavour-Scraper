import fetch from "node-fetch";

const cheerioModule = require("cheerio");

export async function getMaxInaweraPages() {
  const res = await fetch(
    "http://www.inaweraflavours.com/en/7-e-flavours?n=50&id_category=7&p=1"
  );
  const $ = cheerioModule.load(await res.text());
  return $("#pagination > ul > li:nth-child(6) > a").text();
}

export default async function getInawera(maxPages: number) {
  const promises = Array.from({ length: maxPages }, (v, x) => x + 1).map(
    async (currentPage) => {
      let url = `http://www.inaweraflavours.com/en/7-e-flavours?n=50&id_category=7&p=${currentPage}`;
      const res = await fetch(url);
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
      return flavorsOnPage;
    }
  );

  const allFlavours = await Promise.all(promises);
  return [].concat.apply([], allFlavours);
}
