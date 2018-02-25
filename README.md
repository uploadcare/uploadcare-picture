# Uploadcare picture

Uploadcare responsive `<picture>` component using [Uploadcare CDN API](https://uploadcare.com/docs/delivery/file_api/#processing)

[![travis](https://travis-ci.org/uploadcare/picture.svg?branch=master)](https://travis-ci.org/uploadcare/picture)
[![codecov](https://codecov.io/gh/uploadcare/picture/branch/master/graph/badge.svg)](https://codecov.io/gh/uploadcare/picture)
[![devDependencies](https://david-dm.org/uploadcare/picture/dev-status.svg)](https://david-dm.org/uploadcare/picture)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/bcedec48c564420bba78d5dbcf655f34)](https://www.codacy.com/app/akurganow/picture?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=uploadcare/picture&amp;utm_campaign=Badge_Grade)
[![Stories in Ready](https://badge.waffle.io/uploadcare/picture.svg?label=ready&title=Ready)](http://waffle.io/uploadcare/picture)

## Install

You can get it on npm

```
npm install uploadcare-picture
```

## Usage

You can use function directly

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

or use one of [adapters](#adapters)

## Options

- `width` (String | Number) required if not set `sizes.default`
  Width of `<img />` element

- `sizes` (Object) required if not set `width`
  In object key is media query and value size of picture for media query

- `formats` (Array<String>) optional, default ['auto']
  Array of formats for picture sources

- `pixel_density` (Array<Number | String> | Number | String) optional
  Array of values or value of pixel density for resize picture sources

- `name` (String) optional
  Name of file

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
