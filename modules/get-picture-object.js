import {getSources} from './get-sources'
import {getImage} from './get-image'
import {cleanKeys} from './clean-keys'

/**
 * [checkWarnsEnv description]
 * @param  {[type]} opts [description]
 * @return {[type]}      [description]
 */
export function checkWarnsEnv(opts) {
  const env = process && process.env && process.env.NODE_ENV === 'production'
  const noWarns = opts && opts.no_warnings

  return !!(env || noWarns)
}

/**
 * [getPictureObject description]
 * @param  {String} uuid Unique file identifier
 * @param  {Object} options
 * @return {Object} picture object
 */
export function getPictureObject(uuid, opts) { // eslint-disable-line max-statements
  const noWarns = checkWarnsEnv(opts)

  if (!uuid) {
    throw new Error('You must pass to the function uuid as first argument')
  }

  if (opts && opts.pixel_density && !(opts.width || opts.sizes)) {
    throw new Error('With pixel_density you must pass width or sizes')
  }

  if (opts && !opts.width && !noWarns) {
    console.warn('Setting width is recomended') // eslint-disable-line no-console
  }

  if (opts && (opts.sizes && !opts.sizes.default) && !noWarns) {
    console.warn('Empty default size') // eslint-disable-line no-console
  }

  const picture = {}

  const sources = getSources(uuid, opts)
  const image = getImage(uuid, opts)

  picture.image = cleanKeys(image)

  if (!!sources) picture.sources = sources

  return picture
}
