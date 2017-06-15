import {buildOptions} from './build-options'
import {buildSrc} from './build-src'
import {buildSrcSet} from './build-srcset'
import {cleanKeys} from './clean-keys'

/**
 * [buildWidth description]
 * @param  {[type]} sizes [description]
 * @return {[type]}       [description]
 */
export function buildWidth(sizes) {
  return sizes
}

/**
 * [buildSource description]
 * @param  {[type]} options [description]
 * @return {[type]}         [description]
 */
export function buildSource(uuid, options) {
  const src = buildSrc(uuid, {
    width: buildWidth(options.sizes),
    oversize: options.oversize,
    max_resize: options.max_resize,
    format: options.format,
  })
  const srcset = buildSrcSet(uuid, {
    src,
    width: buildWidth(options.sizes),
    pixel_density: options.pixel_density,
    oversize: options.oversize,
    max_resize: options.max_resize,
    format: options.format,
  })
  const source = {
    type: options.format ? `image/${options.format}` : null,
    media: options.media === 'default'
      ? null
      : options.media,
    sizes: options.sizes,
    src,
    srcset,
  }

  return cleanKeys(source)
}

/**
 * [getSources description]
 * @param  {String} uuid
 * @param  {Object} opts
 * @return {Object}
 */
export function getSources(uuid, opts) { // eslint-disable-line max-statements
  if (!opts || Object.keys(opts).length <= 0) return null
  if (!opts.sizes && !opts.formats) return null

  const options = buildOptions(opts)
  const sources = []
  const formatsLength = options.formats ? options.formats.length : 1
  const sizesKeys = options.sizes ? Object.keys(options.sizes) : []
  const sizesLength = sizesKeys.length || 1

  let formatsIndex = 0
  let sizesIndex = 0
  let sourcesLength = formatsLength * sizesLength

  for (let ind = 0; ind < sourcesLength; ind++) {
    sources.push(buildSource(uuid, {
      format: options.formats ? options.formats[formatsIndex] : null,
      media: options.sizes ? sizesKeys[sizesIndex] : null,
      sizes: options.sizes ? options.sizes[sizesKeys[sizesIndex]] : null,
      pixel_density: options.pixel_density,
      oversize: options.oversize,
      max_resize: options.max_resize,
    }))

    if (sizesIndex < sizesLength - 1) {
      sizesIndex++
    }
    else {
      sizesIndex = 0

      if (formatsIndex < formatsLength - 1) {
        formatsIndex++
      }
      else {
        formatsIndex = 0
      }
    }
  }

  // console.log(sources)

  return sources.length > 0 ? sources : null
}
