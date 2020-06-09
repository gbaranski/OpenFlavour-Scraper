import getCapella from "./Capella/index";
import getTpa from "./TPA/index";
import getInawera, { getMaxInaweraPages } from "./Inawera";

async function main() {
  console.log("Begin scraping!");
  const maxInaweraPages = await getMaxInaweraPages();
  getInawera(maxInaweraPages);
  getCapella();
  getTpa();
}
main();
