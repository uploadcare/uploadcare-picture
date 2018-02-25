# Uploadcare picture

This is a component that makes your `<picture>` responsive using
Uploadcare [Image Processing](https://uploadcare.com/features/image_processing).

[![travis](https://travis-ci.org/uploadcare/picture.svg?branch=master)](https://travis-ci.org/uploadcare/picture)
[![codecov](https://codecov.io/gh/uploadcare/picture/branch/master/graph/badge.svg)](https://codecov.io/gh/uploadcare/picture)
[![devDependencies](https://david-dm.org/uploadcare/picture/dev-status.svg)](https://david-dm.org/uploadcare/picture)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/bcedec48c564420bba78d5dbcf655f34)](https://www.codacy.com/app/akurganow/picture?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=uploadcare/picture&amp;utm_campaign=Badge_Grade)
[![Stories in Ready](https://badge.waffle.io/uploadcare/picture.svg?label=ready&title=Ready)](http://waffle.io/uploadcare/picture)

## Install

You can get the component via npm:

```
npm install uploadcare-picture
```

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

## Options

- `width` (String | Number); required; if not set, `sizes.default`

  Sets the width of an `<img />` element

- `sizes` (Object); required; if not set, `width`

  Keys in the object are media queries while sizes define your picture dimensions for them

- `formats` (Array&lt;String&gt;); optional; defaults to ['auto']

  An array holding the allowed formats for your picture sources

- `pixel_density` (Array&lt;Number | String&gt; | Number | String); optional; default, `[1, 2]`

  An array of pixel density values (or a single value) for resizing your picture sources
  
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
