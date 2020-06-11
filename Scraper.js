const { filters, range } = require('./utils.js')
const { $ } = require('./selectors.js')

const fs = require('fs')

const Xray = require('x-ray')

const phantom = require('x-ray-phantom')
const phantom_opts = {
  webSecurity: false,
  images: false,
  weak: false,
}

const x = Xray({
  filters: filters,
})
  .delay(100, 400)
  .concurrency(4)
  .throttle(10)

const fmScrolls = range(0, 24000, 2000)

const fmX = Xray({
  filters: filters,
}).driver(
  phantom(phantom_opts, function (nightmare, done) {
    done
      .useragent(
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.113 Safari/537.36'
      )
      .goto(nightmare.request.req.url)
    fmScrolls.forEach((p) => {
      done.scrollTo(p, 0).wait(500)
    })
  })
)

const wfScrolls = range(100, 32000, 300)

const wfX = Xray({
  filters: filters,
}).driver(
  phantom(phantom_opts, function (nightmare, done) {
    done
      .useragent(
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.113 Safari/537.36'
      )
      .goto(nightmare.request.req.url)
    wfScrolls.forEach((p) => {
      done.scrollTo(p, 0).wait(200)
    })
  })
)

async function getTPA() {
  const items = [
    {
      flavor: 'a h2',
      link: 'a@href',
      company: 'a@href | getDomain',
      image: $.tpa.image,
    },
  ]
  try {
    return x($.tpa.url, ['.big-links li a@href'])
      .then((bigLinks) =>
        Promise.all(bigLinks.map((link) => x(link, '.equal-rows', items)))
      )
      .then((res) => {
        const json = JSON.stringify(res.flat(), null, 4)
        fs.writeFile('./flavors/tpa.json', json, (err) => console.log(err))
      })
  } catch (error) {
    console.log(error)
  }
}

async function getFM() {
  try {
    fmX('https://www.flavormonks.com/our_flavors/', '.products li', [
      {
        flavor: 'h2 | trim',
        link: 'a@href',
        image: $.fm.image,
        company: '.woocommerce-LoopProduct-link@href | getDomain',
      },
    ])
      //.then(r => console.log(r))
      .write('./flavors/fm.json')
  } catch (err) {
    console.log(err)
  }
}

async function getWF() {
  try {
    wfX(
      'https://www.wonderflavours.com/collections/super-concentrated-flavours',
      'div.grid-product__wrapper',
      [
        {
          flavor: `span.grid-product__title | trim`,
          link: 'a.grid-product__meta@href',
          company: `a.grid-product__meta@href | getDomain`,
          image: $.wf.image,
        },
      ]
    ).write('./flavors/wf.json')
  } catch (err) {
    console.log(err)
  }
}

class Scraper {
  constructor(brand) {
    this.brand = brand
    this.url = $[brand].url
    this.container = $[brand].container
    this.flavor = $[brand].flavor
    this.link = $[brand].link
    this.paginate = $[brand].paginate
    this.image = $[brand].image
    this.limit = $[brand].limit
  }

  async scrape() {
    if (this.brand === 'tpa') {
      await getTPA()
    } else if (this.brand === 'fm') {
      await getFM()
    } else if (this.brand === 'wf') {
      await getWF()
    } else {
      await x(this.url, this.container, [
        {
          flavor: `${this.flavor} | trim${
            this.brand === 'flv' ? ' | splitFLV' : ''
          }`,
          link: this.link,
          image: this.image,
          company: this.link + ' | getDomain',
        },
      ])
        .paginate(`${this.paginate ? this.paginate : ''}`)
        .limit(this.limit)
        .write(`./flavors/${this.brand}.json`)
    }
  }
}

module.exports = { Scraper }
