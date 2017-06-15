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
  const sourceNotNeeded = Boolean(!options.format && options.media === 'default')

  if (!sourceNotNeeded) {
    const src = buildSrc(uuid, {
      width: buildWidth(options.sizes || options.width),
      oversize: options.oversize,
      max_resize: options.max_resize,
      format: options.format,
      name: options.name,
    })
    const srcset = buildSrcSet(uuid, {
      src,
      width: buildWidth(options.sizes || options.width),
      pixel_density: options.pixel_density,
      oversize: options.oversize,
      max_resize: options.max_resize,
      format: options.format,
      name: options.name,
    })
    const source = cleanKeys({
      type: options.format ? `image/${options.format}` : null,
      media: options.media === 'default'
      ? null
      : options.media,
      sizes: options.sizes,
      src,
      srcset,
    })

    return source
  }
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

  let sources = []
  const options = buildOptions(opts)
  const formatsLength = options.formats ? options.formats.length : 1
  const sizesKeys = options.sizes ? Object.keys(options.sizes) : []
  const sizesLength = sizesKeys.length || 1

  let formatsIndex = 0
  let sizesIndex = 0
  let sourcesLength = formatsLength * sizesLength

  for (let ind = 0; ind < sourcesLength; ind++) {
    const format = options.formats ? options.formats[formatsIndex] : null
    const media = options.sizes ? sizesKeys[sizesIndex] : null
    const sizes = options.sizes ? options.sizes[sizesKeys[sizesIndex]] : null

    sources.push(buildSource(uuid, {
      ...options,
      format,
      media,
      sizes,
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

  sources = sources.filter(source => !!source)

  return sources.length > 0 ? sources : null
}
