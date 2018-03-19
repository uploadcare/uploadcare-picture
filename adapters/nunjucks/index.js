import getPictureObject from '../../index'
import stringifyPicture from '../../modules/picture-stringifier'

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
    const {uuid, ...options} = opts
    const picture = getPictureObject(uuid, options)

    return stringifyPicture(picture)
  }
}

export default Picture
