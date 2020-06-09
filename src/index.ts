import getCapella from "./Capella/index";
import getTpa from "./TPA/index";
import getInawera, { getMaxPages } from "./Inawera";

async function main() {
  console.log("Scraping inawera");
  console.log("Retreiving max pages");
  const maxInaweraPages = await getMaxPages();
  console.log(`Max inawera pages: ${maxInaweraPages}`);
  console.log("Retreiving inawera data");
  await getInawera(maxInaweraPages);
  console.log("Retreived inawera data");
}
main();
