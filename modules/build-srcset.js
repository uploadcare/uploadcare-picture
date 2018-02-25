import {buildCDNUrl} from './build-cdn-url'

export function checkLastDensity(uuid, last, opts) {
  const current = buildCDNUrl(uuid, {
    resize: opts.density,
    width: opts.width,
    oversize: opts.oversize,
    max_resize: opts.max_resize,
    format: opts.format,
    name: opts.name,
  })

  return current === last ? null : current
}

function checkSrcSet(opts) {
  const isPixels = (/\wpx$/i).test(opts.width)
  const isNumber = typeof opts.width === 'number'

  return Boolean(opts.width &&
    opts.pixel_density &&
    (isPixels || isNumber)
  )
}

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
        format: opts.format,
        name: opts.name,
      })

      if (!!needAddDensity) {
        last = needAddDensity
        srcset += `${last} ${density}, `
      }
    })

    return srcset
      ? srcset.replace(/\,\s$/gi, '')
      : null
  }
}
