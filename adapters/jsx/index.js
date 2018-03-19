import React from 'react'
import getPictureObject from '../../index'

const renderSource = source => (
  <source
    key={source.srcset}
    srcSet={source.srcset}
    sizes={source.sizes}
    media={source.media}
    type={source.type} />
)
const renderSources = sources => sources.map(renderSource)
const renderImage = image => (
  <img
    src={image.src}
    srcSet={image.srcset}
    width={image.width}
    sizes={image.sizes}
    alt={image.alt} />
)

const Picture = ({uuid, ...rest}) => {
  const tree = getPictureObject(uuid, rest)

  return (
    <picture>
      {renderSources(tree.sources)}
      {renderImage(tree.image)}
    </picture>
  )
}

export default Picture
