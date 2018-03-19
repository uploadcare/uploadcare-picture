# Uploadcare Picture

<a href="https://uploadcare.com/?utm_source=github&utm_campaign=uploadcare-picture">
    <img align="right" width="64" height="64"
         src="https://ucarecdn.com/2f4864b7-ed0e-4411-965b-8148623aa680/uploadcare-logo-mark.svg"
         alt="">
</a>

This is an Uploadcare responsive `<picture>` component. It provides
more control over image behavior: you can adjust image sizes to different
media queries, control output formats, etc.

You also get:

* Less code
* All images served via [Uploadcare CDN](https://uploadcare.com/docs/delivery/)
* One uploaded image and all of its versions generated on-the-fly
  via [UC Image Processing](https://uploadcare.com/features/image_processing)

[![NPM version][npm-img]][npm-url] [![Build Status][travis-img]][travis-url]
 [![Code coverage][codecov-img]][codecov-url] [![devDependencies][devDependencies-img]][devDependencies-url]
 [![Uploadcare stack on StackShare][stack-img]][stack-url]

[npm-img]: http://img.shields.io/npm/v/uploadcare-picture.svg
[npm-url]: https://www.npmjs.org/package/uploadcare-picture
[travis-img]: https://api.travis-ci.org/uploadcare/uploadcare-picture.svg?branch=master
[travis-url]: https://travis-ci.org/uploadcare/uploadcare-picture
[stack-img]: https://img.shields.io/badge/tech-stack-0690fa.svg?style=flat
[stack-url]: https://stackshare.io/uploadcare/stacks/
[codecov-img]: https://codecov.io/gh/uploadcare/uploadcare-picture/branch/master/graph/badge.svg
[codecov-url]: https://codecov.io/gh/uploadcare/uploadcare-picture
[devDependencies-img]: https://david-dm.org/uploadcare/uploadcare-picture/dev-status.svg
[devDependencies-url]: https://david-dm.org/uploadcare/uploadcare-picture

## Install

You can get the component via npm:

```
npm install uploadcare-picture
```

You would not need an Uploadcare account for testing
purposes: just use [UUIDs](https://uploadcare.com/docs/concepts/#cdn)
provided in this readme.
However, implementing the component requires
you to have an Uploadcare account; you can get one
[here](https://uploadcare.com/accounts/signup/).

## Usage

The function can be used directly or through
one of the [adapters](#adapters).

```js
import getPictureObject from 'uploadcare-picture'

const uuid = '18d1c520-c52d-4c34-82a0-7e07dcbcf105'
const options = {
  sizes: {
    '(max-width: 1024px)': '768px',
    'default': '1024px'
  },
  formats: ['jpg', 'webp'],
  name: 'example'
}
const picture = getPictureObject(uuid, options)
```

The function provides an object in the output, like this:

```js
{
  sources: [
    {
      srcset: `https://ucarecdn.com/18d1c520-c52d-4c34-82a0-7e07dcbcf105/-/resize/768x/-/format/webp/example.webp 1x, https://ucarecdn.com/18d1c520-c52d-4c34-82a0-7e07dcbcf105/-/resize/1536x/-/format/webp/example.webp 2x`,
      type: 'image/webp',
      media: '(max-width: 1024px)',
      sizes: '768px',
    },
    {
      srcset: `https://ucarecdn.com/18d1c520-c52d-4c34-82a0-7e07dcbcf105/-/resize/1024x/-/format/webp/example.webp 1x, https://ucarecdn.com/18d1c520-c52d-4c34-82a0-7e07dcbcf105/-/resize/2048x/-/format/webp/example.webp 2x`,
      type: 'image/webp',
      sizes: '1024px',
    },
    {
      srcset: `https://ucarecdn.com/18d1c520-c52d-4c34-82a0-7e07dcbcf105/-/resize/768x/-/format/jpg/example.jpg 1x, https://ucarecdn.com/18d1c520-c52d-4c34-82a0-7e07dcbcf105/-/resize/1536x/-/format/jpg/example.jpg 2x`,
      type: 'image/jpg',
      media: '(max-width: 1024px)',
      sizes: '768px',
    },
    {
      srcset: `https://ucarecdn.com/18d1c520-c52d-4c34-82a0-7e07dcbcf105/-/resize/1024x/-/format/jpg/example.jpg 1x, https://ucarecdn.com/18d1c520-c52d-4c34-82a0-7e07dcbcf105/-/resize/2048x/-/format/jpg/example.jpg 2x`,
      type: 'image/jpg',
      sizes: '1024px',
    },
  ],
  image: {
    alt: 'example',
    src: `https://ucarecdn.com/18d1c520-c52d-4c34-82a0-7e07dcbcf105/-/resize/1024x/-/format/auto/example`,
    srcset: `https://ucarecdn.com/18d1c520-c52d-4c34-82a0-7e07dcbcf105/-/resize/2048x/-/format/auto/example 2x`,
    sizes: '1024px',
  },
}
```

You can further transpile such objects to `<picture>` via any library
or framework you like.

## Options

- `width` (String | Number); required; if not set, `sizes.default`

  Sets the width of an `<img />` element.

- `sizes` (Object); required; if not set, `width`

  Keys in the object are media queries while sizes define your picture dimensions for them.

- `formats` (Array&lt;String&gt;); optional; defaults to ['auto']

  An array holding the allowed formats for your picture sources.

- `pixel_density` (Array&lt;Number | String&gt; | Number | String); optional; default, `[1, 2]`

  An array of pixel density value(-s) for resizing your picture sources.
  
- `name` (String) optional

  An optional [RFC3986](https://tools.ietf.org/html/rfc3986#section-3.3)-compliant filename.

## Adapters

### JSX

```jsx
import UploadcarePicture from 'uploadcare-picture/adapters/jsx'

const Picture = () =>
  <UploadcarePicture
    uuid='18d1c520-c52d-4c34-82a0-7e07dcbcf105'
    formats={['webp', 'jpg']}
    sizes={{
      '(max-width: 1024px)': '768px',
      'default': 1024,
    }}
    name='example' />
```

### Nunjucks

```js
import {configure} from 'nunjucks'
import UploadcarePicture from 'uploadcare-picture/adapters/nunjucks'

const nunjucks = configure('templates', {autoescape: false})

nunjucks.addExtension('UploadcarePicture', new UploadcarePicture())

const template = `{% uploadcarePicture
  uuid='18d1c520-c52d-4c34-82a0-7e07dcbcf105',
  formats=['webp', 'jpg'],
  sizes={
    '(max-width: 1024px)': 768,
    'default': 1024
  },
  name='example'
%}`

const picture = nunjucks.renderString(template)
```

## Testing

Run linters and tests

```
npm test
```

## Feedback

GitHub issues and PRs are welcome. You can also post any questions
around the UC [Community Area](https://community.uploadcare.com/).
