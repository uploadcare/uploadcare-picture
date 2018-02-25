export function buildName(fmt, nm) {
  const rexp = /(\w+)\.?\w*$/i
  const format = fmt ? `.${fmt}` : ''
  let name = nm ? nm.replace(rexp, '$1') : null

  name = name ? `${name}${format}` : ''

  return name
}
