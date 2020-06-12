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
  const maxInaweraPages = await getMaxInaweraPages();

  vendors.push(await getInawera(maxInaweraPages));
  vendors.push(await getTpa());
  vendors.push(await getCapella());
  vendors.push(await getFlavourArt());
  vendors.push(await getFlavorWest());
  vendors.push(await getFlavorah());

  const totalResults: FlavourInterface[] = [];
  vendors.forEach((_vendor) => {
    _vendor.forEach(async (_flavor: FlavourInterface) => {
      totalResults.push(_flavor);
    });
  });
  await fetch(`${process.env.SERVER_URL}/api/addFlavour`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      token: process.env.TOKEN,
    },
    body: JSON.stringify(totalResults),
  });
  console.log('Done!!');
})();
