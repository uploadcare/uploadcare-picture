export function pixelDensityFromNumber(number) {
  const num = parseInt(number)
  const array = []

  if (typeof num !== 'number' || isNaN(num)) throw new Error('pixel density must be a number')

  for (let idx = 2; idx <= num && idx <= 16; idx++) { // eslint-disable-line no-plusplus
    array.push(idx)
  }

  return array
}

export function pixelDensityFromString(string) {
  if ((/\d+\w?$/gi).test(string)) {
    return string
  }
  else {
    return pixelDensityFromNumber(parseInt(string))
  }
}

export function buildPixelDensity(pd) {
  let pdCount
  let pdArray = []

  if (typeof pd === 'number') {
    pdCount = parseInt(pd)
    pdArray = pixelDensityFromNumber(pdCount === 1 ? 2 : pdCount)
  }
  else if (typeof pd === 'string') {
    pdArray = [pixelDensityFromString(pd)]
  }
  else if (pd.length > 0) {
    pdArray = pd
  }
  else {
    throw new Error('pixel_density has wrong format')
  }

  pdArray = pdArray.map(density => {
    if (typeof density === 'number') {
      return `${density}x`
    }
    else {
      return density
    }
  })

  return pdArray
}
