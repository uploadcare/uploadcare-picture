/**
 * [buildName description]
 * @param  {[type]} name [description]
 * @param  {[type]} fmt  [description]
 * @return {[type]}      [description]
 */
export function buildName(fmt, nm) {
  const format = fmt ? `.${fmt}` : ''
  const name = nm ? `${nm}${format}` : ''

  return name
}

/**
 * [buildFormat description]
 * @param  {[type]} format [description]
 * @return {[type]}        [description]
 */
export function buildFormat(format, nm) {
  const name = buildName(format, nm)

  return `-/format/${format || 'auto'}/${name}`
}

/**
 * [maxNumber description]
 * @param  {[type]} number   [description]
 * @param  {[type]} oversize [description]
 * @return {[type]}          [description]
 */
export function maxNumber(width, oversize, maxResize) {
  const number = parseInt(width)

  if (!number || (number > maxResize && oversize === 'dangerously unlimited')) {
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

  const rex = /\d*(\D+)$/gi
  const sym = rsz.replace(rex, '$1')

  if (!opts || (opts && Object.keys(opts).length <= 0)) throw new Error('Please set options for resize')

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
  else if (typeof width === 'string' && (/\dpx$/i).test(width)) {
    return parseInt(width)
  }
  else {
    return null
  }
}

/**
 * [buildWidth description]
 * @param  {[type]} width [description]
 * @return {[type]}       [description]
 */
export function buildWidth(width, opts) {
  if (width && !(/\d/gi).test(width)) throw new Error('width wrong format')

  if (!width) {
    return ''
  }
  else if (typeof width === 'string' && (/\d+\w?$/gi).test(width)) {
    return buildResize(width, {
      oversize: opts.oversize,
      max_resize: opts.max_resize,
    })
  }
  else {
    return buildResize(opts.resize, {
      width,
      oversize: opts.oversize,
      max_resize: opts.max_resize,
    })
  }
}

/**
 * [buildCDNUrl description]
 * @param  {String} uuid
 * @param  {Object} opts
 * @return {Object}
 */
export function buildCDNUrl(uuid, opts) {
  const width = buildWidthNumber(opts.width) || opts.width
  const cdn = 'https://ucarecdn.com/'
  let url = `${cdn}${uuid}/`

  url += buildWidth(width, opts)

  const format = buildFormat(opts.format, opts.name)

  url += format

  return url
}
