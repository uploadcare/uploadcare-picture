import {getSources} from './get-sources'
import {getImage} from './get-image'
import {cleanKeys} from './clean-keys'

export function checkWarnsEnv(opts) {
  const env = process && process.env && process.env.NODE_ENV === 'production'
  const noWarns = opts && opts.no_warnings

  return !!(env || noWarns)
}

export function getPictureObject(uuid, opts) { // eslint-disable-line max-statements
  const noWarns = checkWarnsEnv(opts)

  if (!uuid || typeof uuid !== 'string') {
    throw new Error('You must pass to the function uuid as first argument')
  }

  if (opts && opts.pixel_density && !(opts.width || opts.sizes)) {
    throw new Error('With pixel_density you must pass width or sizes')
  }

  if (!noWarns && opts && !(opts.width || (opts.sizes && opts.sizes.default))) {
    console.warn('Setting width or sizes.default is recommended') // eslint-disable-line no-console
  }

  if (!noWarns && opts && opts.sizes && !opts.sizes.default) {
    console.warn('Empty default size') // eslint-disable-line no-console
  }

  const picture = {}

  const sources = getSources(uuid, opts)
  const image = getImage(uuid, opts)

  picture.image = cleanKeys(image)

  if (!!sources) picture.sources = sources

  return picture
}
