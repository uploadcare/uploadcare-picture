import {buildPixelDensity} from './build-pixel-density'

export function buildOptions(opts) { // eslint-disable-line max-statements
  const pixelDensity = buildPixelDensity((opts && opts.pixel_density) || [1, 2])
  const defaults = {
    pixel_density: pixelDensity,
    max_resize: 3000,
  }
  let options = {}

  if (typeof opts === 'string' || typeof opts === 'number') {
    options.width = opts
  }
  else {
    options = opts
  }

  if (options && options.pixel_density) {
    options.pixel_density = buildPixelDensity(options.pixel_density)
  }
  else if (options && !options.pixel_density) {
    delete options.pixel_density
  }

  options = Object.assign({}, defaults, options)

  return options
}
