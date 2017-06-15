import {buildCDNUrl} from './build-cdn-url'

/**
 * [buildSrc description]
 * @param  {[type]} uuid [description]
 * @param  {[type]} opts [description]
 * @return {[type]}      [description]
 */
export function buildSrc(uuid, opts) {
  return buildCDNUrl(uuid, {
    width: opts.width,
    oversize: opts.oversize,
    max_resize: opts.max_resize,
    format: opts.format,
  })
}
