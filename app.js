const { Scraper } = require('./Scraper.js')

const fa = new Scraper('fa')
const cap = new Scraper('cap')
const tpa = new Scraper('tpa')
const inw = new Scraper('inw')
const flv = new Scraper('flv')
const fw = new Scraper('fw')
const fm = new Scraper('fm')
const la = new Scraper('la')
const mb = new Scraper('mb')
const ooo = new Scraper('ooo')
const vt = new Scraper('vt')
const wf = new Scraper('wf')

const sites = [fa, cap, tpa, inw, flv, fw, fm, la, mb, ooo, vt, wf]

async function getAll() {
  try {
    await Promise.all(sites.map((site) => site.scrape()))
  } catch (err) {
    console.log(err)
  }
}

// getAll()
//getFMTest()

getAll()
