import getPictureObject from '../index'
import stringifyPicture from '../modules/picture-stringifier'

/**
 * Nunjucks uploadcarePicture extension
 */
function Picture() {
  this.tags = ['uploadcarePicture']

  this.parse = function(parser, nodes) {
    const tok = parser.nextToken()
    const args = parser.parseSignature(null, true)

    parser.advanceAfterBlockEnd(tok.value)

    return new nodes.CallExtension(this, 'run', args)
  }

  this.run = function(context, opts) {
    const sizes = {}

    opts.sizes &&
      opts.sizes.split(',').forEach(function(size) {
        const splited = size.split('=').map(el => el.trim())
        const fixed = splited[1].trim()
        const fixedNum = parseInt(fixed)

        if (fixedNum.toString() === fixed) {
          sizes[splited[0]] = fixedNum
        }
        else {
          sizes[splited[0]] = fixed
        }
      })

    const pixelDensity = opts.pixel_density
      ? opts.pixel_density.split(',').map(el => {
        const fixed = el.trim()
        const fixedNum = parseInt(fixed)

        if (fixedNum.toString() === fixed) {
          return fixedNum
        }
        else {
          return fixed
        }
      })
      : null

    const options = {
      width: opts.width,
      sizes: opts.sizes ? sizes : null,
      formats: opts.formats && opts.formats.split(',').map(el => el.trim()),
      pixel_density: pixelDensity,
      name: opts.name,
      oversize: opts.oversize,
    }

    const picture = getPictureObject(opts.uuid, options)
    const pictureString = stringifyPicture(picture)

    return pictureString
  }
}

export default Picture
