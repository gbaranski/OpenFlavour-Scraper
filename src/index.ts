import getCapella from './Capella/index';
import getTpa from './TPA/index';
import getInawera, {getMaxInaweraPages} from './Inawera';
import getFlavourArt from './FlavourArt';
import getFlavorWest from './FlavorWest';
import getFlavorah from './Flavorah';
import {FlavourInterface} from './types';
import fetch from 'node-fetch';
(async () => {
  console.log(process.env.SERVER_URL);
  console.log('Begin scraping!');
  const vendors = [];
  const maxInaweraPages = getMaxInaweraPages();

  vendors.push(getInawera(await maxInaweraPages));
  vendors.push(getTpa());
  vendors.push(getCapella());
  vendors.push(getFlavourArt());
  vendors.push(getFlavorWest());
  vendors.push(getFlavorah());

  const totalResults: FlavourInterface[] = [];
  await Promise.all(vendors);

  vendors.forEach(async (_vendor: Promise<[]>) => {
    (await _vendor).forEach(async (_flavor: FlavourInterface) => {
      if (_flavor.name) {
        totalResults.push(_flavor);
      }
    });
  });

  await fetch(`${process.env.SERVER_URL}/api/addFlavour`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      token: process.env.TOKEN,
    },
    // ignore that next line, typescript is wrong
    body: JSON.stringify(await totalResults),
  });
  console.log('Done!');
})();
