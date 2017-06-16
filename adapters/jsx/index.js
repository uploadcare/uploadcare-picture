import React, {Component} from 'react'
import getPictureObject from 'uploadcare-picture'

class Picture extends Component {
  renderSources = (sources) => sources.map(this.renderSource)

  renderSource = (source) =>
    <source
      key={source.srcset}
      src={source.src}
      srcSet={source.srcset}
      width={source.width}
      sizes={source.sizes}
      media={source.media}
      type={source.type} />

  renderImage = (image) =>
    <img
      src={image.src}
      srcSet={image.srcset}
      width={image.width}
      sizes={image.sizes}
      alt={image.alt} />

  render() {
    const tree = getPictureObject(this.props.uuid, this.props)

    return <picture>
      {this.renderSources(tree.sources)}
      {this.renderImage(tree.image)}
    </picture>
  }
}

export default Picture
