import getCapella from "./Capella/index";
import getTpa from "./TPA/index";
import getInawera, { getMaxInaweraPages } from "./Inawera";
import { FlavourInterface } from "./types";
import fetch from "node-fetch";

(async () => {
  console.log(process.env.SERVER_URL);
  console.log("Begin scraping!");
  const vendors = [];
  const maxInaweraPages = await getMaxInaweraPages();
  vendors.push(await getInawera(maxInaweraPages));
  vendors.push(await getTpa());
  vendors.push(await getCapella());

  const totalResults: FlavourInterface[] = [];
  vendors.forEach((_vendor) => {
    _vendor.forEach(async (_flavor: FlavourInterface) => {
      totalResults.push(_flavor);
    });
  });
  console.log(JSON.stringify(totalResults));
  await fetch(`${process.env.SERVER_URL}/api/addFlavour`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(totalResults),
  });
  console.log("Done!!");
})();
