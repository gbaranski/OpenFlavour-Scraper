import getCapella from "./Capella/index";
import getTpa from "./TPA/index";
import getInawera, { getMaxPages } from "./Inawera";

async function main() {
  const maxInaweraPages = await getMaxPages();
  getInawera(maxInaweraPages);
}
main();
