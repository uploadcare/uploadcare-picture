/**
 * [buildFormat description]
 * @param  {[type]} format [description]
 * @return {[type]}        [description]
 */
export function buildFormat(format) {
  return `-/format/${format || 'auto'}/`
}

/**
 * [maxNumber description]
 * @param  {[type]} number   [description]
 * @param  {[type]} oversize [description]
 * @return {[type]}          [description]
 */
export function maxNumber(width, oversize, maxResize) {
  const number = parseInt(width)

  if (number > maxResize && oversize === 'dangerously unlimited') {
    return ''
  }
  else if (number > maxResize) {
    return `-/resize/${maxResize}x/`
  }
  else {
    return `-/resize/${number}x/`
  }
}

/**
 * [buildResize description]
 * @param  {[type]} resize [description]
 * @return {[type]}        [description]
 */
export function buildResize(resize, opts) {
  let rsz = resize

  if (!rsz) rsz = '1x'

  const rex = /.*(\w)$/gi
  const sym = rsz.replace(rex, '$1')

  if (sym === 'x') {
    if (!opts.width) throw new Error('Please set width')

    return maxNumber((opts.width * parseInt(rsz)), opts.oversize, opts.max_resize)
  }
  else if (sym === 'w') {
    return maxNumber(rsz.replace(/\D/gi, ''), opts.oversize, opts.max_resize)
  }
  else {
    throw new Error(`pixel_density \'${rsz}\' wrong format`)
  }

  return ''
}

/**
 * [buildWidthNumber description]
 * @param  {[type]} width [description]
 * @return {[type]}       [description]
 */
export function buildWidthNumber(width) {
  if (typeof width === 'number') {
    return width
  }
  else if (typeof width === 'string' && (/\wpx$/i).test(width)) {
    return parseInt(width)
  }
  else {
    return null
  }
}

/**
 * [buildCDNUrl description]
 * @param  {String} uuid
 * @param  {Object} opts
 * @return {Object}
 */
export function buildCDNUrl(uuid, opts) {
  const width = buildWidthNumber(opts.width)
  const cdn = 'https://ucarecdn.com/'
  let url = `${cdn}${uuid}/`

  if (!!width) {
    const resize = buildResize(opts.resize, {
      width,
      oversize: opts.oversize,
      max_resize: opts.max_resize,
    })

    url += resize
  }

  const format = buildFormat(opts.format)

  url += format

  return url
}
