import {buildCDNUrl} from './build-cdn-url'

export function buildSrc(uuid, opts) {
  return buildCDNUrl(uuid, {
    width: opts.width,
    oversize: opts.oversize,
    max_resize: opts.max_resize,
    format: opts.format,
    name: opts.name,
  })
}
