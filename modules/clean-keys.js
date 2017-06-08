/**
 * [cleanKeys description]
 * @param  {[type]} obj [description]
 * @return {[type]}     [description]
 */
function cleanKeys(obj) {
  const cleanObj = {}
  const keys = Object.keys(obj)

  keys.forEach(key => {
    if (!!obj[key] &&
      typeof obj[key] === 'object' &&
      obj[key].length === undefined &&
      Object.keys(obj[key]).length > 0
    ) {
      const clearKey = cleanKeys(obj[key])

      if (Object.keys(clearKey).length > 0) cleanObj[key] = clearKey
    }
    else if (!!obj[key] &&
      typeof obj[key] === 'object' &&
      !!obj[key].length
    ) {
      const clearKey = obj[key].filter(item => !!item)

      if (clearKey.length > 0) cleanObj[key] = clearKey
    }
    else if (typeof obj[key] !== 'object' &&
      typeof obj[key] !== 'undefined'
    ) {
      cleanObj[key] = obj[key]
    }
  })

  return cleanObj
}

export {cleanKeys}
