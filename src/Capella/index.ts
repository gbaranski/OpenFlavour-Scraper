import fetch from 'node-fetch';
import {FlavourInterface} from '../types';
const cheerioModule = require('cheerio');

export default async function getCapella() {
  const res = await fetch(
    'https://www.capellaflavors.com/flavors?product_list_limit=all&product_list_mode=list',
  );
  const $ = cheerioModule.load(await res.text());

  const flavors: FlavourInterface[] = [];

  $('.product-item-link').each(function () {
    const flavor = $(this);
    flavors.push({
      name: flavor
        .text()
        .trim()
        .replace(/(\r\n|\n|\r)/gm, ''),
      manufacturer: 'Capella',
    });
  });
  flavors.shift();
  console.log('Done Capella');
  return flavors;
}
