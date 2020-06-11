const filters = {
  trim: function (value) {
    return typeof value === 'string'
      ? value
          .trim()
          .replace(
            /\s+flavor|\s+DIY.+|\s+Concentrate.*|\s+flavour|\s+comestible.+|\s+by Inawera|\.+|\s+13ml|\*+/gi,
            ''
          )
      : value
  },
  splitFLV: function (value) {
    if (value) {
      return value.split(' | ')[0]
    }
    return
  },
  getDomain: function (value) {
    //console.log(value)
    return typeof value === 'string'
      ? value.match(/(?!(?![^httpswwwstoreshop]))(\w+?)(?=\.com)/g)[0]
      : value
  },
  tpaImage: function (value) {
    return typeof value === 'string'
      ? `https://shop.perfumersapprentice.com/images/Product/large/${
          value.match(/(?:(?!.com\/p\-)\d+)/)[0]
        }.jpg`
      : value
  },
}

const range = (start, end, step) =>
  Array.from(
    (function* (a, b, s = 1) {
      while (a < b) {
        yield a
        a += s
      }
    })(start, end, step)
  )

module.exports = { filters, range }
