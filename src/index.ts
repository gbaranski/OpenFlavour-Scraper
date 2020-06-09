import getCapella from "./Capella/index";
import getTpa from "./TPA/index";
import getInawera, { getMaxInaweraPages } from "./Inawera";

(async () => {
  const results = {
    InaweraResults: [],
    CapellaResults: [],
    TpaResults: [],
  };
  console.log("Begin scraping!");
  const maxInaweraPages = await getMaxInaweraPages();
  results.InaweraResults.push(await getInawera(maxInaweraPages));
  results.CapellaResults.push(await getCapella());
  results.TpaResults.push(await getTpa());
  console.log(results);
})();
