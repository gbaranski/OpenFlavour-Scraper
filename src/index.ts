import getCapella from "./Capella/index";
import getTpa from "./TPA/index";
import getInawera, { getMaxInaweraPages } from "./Inawera";

async function main() {
  const results = {
    InaweraResults: [],
    CapellaResults: [],
    TpaResults: [],
  };
  console.log("Begin scraping!");
  const maxInaweraPages = await getMaxInaweraPages();
  //   getInawera(maxInaweraPages);
  //   getCapella();
  results.TpaResults.push(await getTpa());
  console.log(results);
}
main();
