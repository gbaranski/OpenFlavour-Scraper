import fetch from 'node-fetch';
import {FlavourInterface} from '../types';
const cheerioModule = require('cheerio');

export default async function getFlavourArt() {
  const res = await fetch('https://www.flavourart.co.uk/flavour-list.html');
  const $ = cheerioModule.load(await res.text());
  const flavors: FlavourInterface[] = [];
  $('.accordionButton').each(function () {
    const flavor = $(this);
    flavors.push({
      name: flavor.text(),
      manufacturer: 'flavourart',
    });
  });
  console.log('Done FlavourArt');
  return flavors;
}
