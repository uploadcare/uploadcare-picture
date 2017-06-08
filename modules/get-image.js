import {buildOptions} from './build-options'
import {buildCDNUrl} from './build-cdn-url'
import {cleanKeys} from './clean-keys'

/**
 * [buildWidth description]
 * @param  {[type]} width [description]
 * @return {[type]}       [description]
 */
export function buildWidth(width) {
  if (!!width) {
    return width
  }
}

/**
 * [checkPrevDensity description]
 * @param  {[type]} cur   [description]
 * @param  {[type]} prev  [description]
 * @param  {[type]} width [description]
 * @return {[type]}       [description]
 */
export function checkLastDensity(uuid, last, opts) {
  const current = buildCDNUrl(uuid, {
    resize: opts.density,
    width: opts.width,
    oversize: opts.oversize,
    max_resize: opts.max_resize,
  })

  return current !== last
}

/**
 * [checkSrcSet description]
 * @param  {[type]} options [description]
 * @return {[type]}         [description]
 */
function checkSrcSet(opts) {
  const isPixels = (/\wpx$/i).test(opts.width)
  const isNumber = typeof opts.width === 'number'

  return opts.width &&
    opts.pixel_density &&
    (isPixels || isNumber)
}

/**
 * [buildSrcSet description]
 * @param  {[type]} width [description]
 * @param  {[type]} pd    [description]
 * @return {[type]}       [description]
 */
export function buildSrcSet(uuid, opts) {
  let srcset = ''
  let last = opts.src

  const needSrcSet = checkSrcSet(opts)

  if (needSrcSet) {
    opts.pixel_density.forEach(density => {
      const needAddDensity = checkLastDensity(uuid, last, {
        density: density,
        width: opts.width,
        oversize: opts.oversize,
        max_resize: opts.max_resize,
      })

      if (needAddDensity) {
        last = buildCDNUrl(uuid, {
          resize: density,
          width: opts.width,
          oversize: opts.oversize,
          max_resize: opts.max_resize,
        })
        srcset += `${last} ${density}, `
      }
    })

    return srcset
      ? srcset.replace(/\,\s$/gi, '')
      : null
  }
}

/**
 * [getImage description]
 * @param  {String} uuid
 * @param  {Object} opts
 * @return {Object}
 */
export function getImage(uuid, opts) {
  if (!opts) throw new Error('Set options')
  if (opts.pixel_density && !opts.pixel_density.length) throw Error('pixel_density must be an array')

  const options = buildOptions(opts)
  const src = buildCDNUrl(uuid, {
    width: options.width,
    oversize: options.oversize,
    max_resize: options.max_resize,
  })
  const srcset = buildSrcSet(uuid, {
    src,
    width: options.width,
    pixel_density: options.pixel_density,
    oversize: options.oversize,
    max_resize: options.max_resize,
  })
  const width = buildWidth(options.width)
  const image = cleanKeys({
    src,
    srcset,
    width,
  })

  return image
}
