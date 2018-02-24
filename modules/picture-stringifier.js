/**
 * @param {pictureObject} obj
 * @returns string
 */
function stringify(obj) {
  let str = '<picture>'

  obj.sources.forEach(source => {
    str += '<source'
    Object.keys(source).forEach(key => {
      str += ` ${key}="${source[key]}"`
    })
    str += ' />'
  })

  str += '<img'
  Object.keys(obj.image).forEach(key => {
    str += ` ${key}="${obj.image[key]}"`
  })
  str += ' />'

  str += '</picture>'

  return str
}

export default stringify
