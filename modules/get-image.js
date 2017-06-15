import {buildOptions} from './build-options'
import {buildSrc} from './build-src'
import {buildSrcSet} from './build-srcset'
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
 * [getImage description]
 * @param  {String} uuid
 * @param  {Object} opts
 * @return {Object}
 */
export function getImage(uuid, opts) {
  if (opts && opts.pixel_density && !opts.pixel_density.length) throw Error('pixel_density must be an array')

  const options = buildOptions(opts)
  const src = buildSrc(uuid, options)
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
