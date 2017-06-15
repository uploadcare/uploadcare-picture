import {getSources} from '../modules/get-sources'

const uuid = '18d1c520-c52d-4c34-82a0-7e07dcbcf105'
const cdnurl = `https://ucarecdn.com/${uuid}/`

describe('getSources', () => {
  test('undefined options', () => {
    const expected = null

    expect(getSources(uuid)).toEqual(expected)
  })
  test('empty options', () => {
    const options = {}
    const expected = null

    expect(getSources(uuid, options)).toEqual(expected)
  })
  test('sources not need', () => {
    const options = {
      sizes: {},
      formats: [],
    }
    const expected = null

    expect(getSources(uuid, options)).toEqual(expected)
  })
  test('one format', () => {
    const options = {formats: ['jpg']}
    const expected = [
      {
        src: `${cdnurl}-/format/jpg/`,
        type: 'image/jpg',
      },
    ]

    expect(getSources(uuid, options)).toEqual(expected)
  })
  test('one size', () => {
    const options = {sizes: {'(max-width: 1024px)': 768}}
    const expected = [
      {
        src: `${cdnurl}-/resize/768x/-/format/auto/`,
        srcset: `${cdnurl}-/resize/1536x/-/format/auto/ 2x`,
        media: '(max-width: 1024px)',
        sizes: 768,
      },
    ]

    expect(getSources(uuid, options)).toEqual(expected)
  })
  test('one format and one size', () => {
    const options = {
      formats: ['jpg'],
      sizes: {'(max-width: 1024px)': 768},
    }
    const expected = [
      {
        src: `${cdnurl}-/resize/768x/-/format/jpg/`,
        srcset: `${cdnurl}-/resize/1536x/-/format/jpg/ 2x`,
        media: '(max-width: 1024px)',
        type: 'image/jpg',
        sizes: 768,
      },
    ]

    expect(getSources(uuid, options)).toEqual(expected)
  })
  test('two formats and one size', () => {
    const options = {
      formats: ['jpg', 'webp'],
      sizes: {'(max-width: 1024px)': 768},
    }
    const expected = [
      {
        src: `${cdnurl}-/resize/768x/-/format/jpg/`,
        srcset: `${cdnurl}-/resize/1536x/-/format/jpg/ 2x`,
        media: '(max-width: 1024px)',
        type: 'image/jpg',
        sizes: 768,
      },
      {
        src: `${cdnurl}-/resize/768x/-/format/webp/`,
        srcset: `${cdnurl}-/resize/1536x/-/format/webp/ 2x`,
        media: '(max-width: 1024px)',
        type: 'image/webp',
        sizes: 768,
      },
    ]

    expect(getSources(uuid, options)).toEqual(expected)
  })
  test('one format and two sizes', () => {
    const options = {
      formats: ['jpg'],
      sizes: {
        '(max-width: 1024px)': 768,
        '(max-width: 1280px)': 1024,
      },
    }
    const expected = [
      {
        src: `${cdnurl}-/resize/768x/-/format/jpg/`,
        srcset: `${cdnurl}-/resize/1536x/-/format/jpg/ 2x`,
        media: '(max-width: 1024px)',
        type: 'image/jpg',
        sizes: 768,
      },
      {
        src: `${cdnurl}-/resize/1024x/-/format/jpg/`,
        srcset: `${cdnurl}-/resize/2048x/-/format/jpg/ 2x`,
        media: '(max-width: 1280px)',
        type: 'image/jpg',
        sizes: 1024,
      },
    ]

    expect(getSources(uuid, options)).toEqual(expected)
  })
  test('three formats and three sizes', () => {
    const options = {
      formats: ['jpg', 'webp', 'png'],
      sizes: {
        '(max-width: 1024px)': 768,
        '(max-width: 1280px)': 1024,
        'default': 1280,
      },
    }
    const expected = [
      {
        src: `${cdnurl}-/resize/768x/-/format/jpg/`,
        srcset: `${cdnurl}-/resize/1536x/-/format/jpg/ 2x`,
        media: '(max-width: 1024px)',
        type: 'image/jpg',
        sizes: 768,
      },
      {
        src: `${cdnurl}-/resize/1024x/-/format/jpg/`,
        srcset: `${cdnurl}-/resize/2048x/-/format/jpg/ 2x`,
        media: '(max-width: 1280px)',
        type: 'image/jpg',
        sizes: 1024,
      },
      {
        src: `${cdnurl}-/resize/1280x/-/format/jpg/`,
        srcset: `${cdnurl}-/resize/2560x/-/format/jpg/ 2x`,
        type: 'image/jpg',
        sizes: 1280,
      },
      {
        src: `${cdnurl}-/resize/768x/-/format/webp/`,
        srcset: `${cdnurl}-/resize/1536x/-/format/webp/ 2x`,
        media: '(max-width: 1024px)',
        type: 'image/webp',
        sizes: 768,
      },
      {
        src: `${cdnurl}-/resize/1024x/-/format/webp/`,
        srcset: `${cdnurl}-/resize/2048x/-/format/webp/ 2x`,
        media: '(max-width: 1280px)',
        type: 'image/webp',
        sizes: 1024,
      },
      {
        src: `${cdnurl}-/resize/1280x/-/format/webp/`,
        srcset: `${cdnurl}-/resize/2560x/-/format/webp/ 2x`,
        type: 'image/webp',
        sizes: 1280,
      },
      {
        src: `${cdnurl}-/resize/768x/-/format/png/`,
        srcset: `${cdnurl}-/resize/1536x/-/format/png/ 2x`,
        media: '(max-width: 1024px)',
        type: 'image/png',
        sizes: 768,
      },
      {
        src: `${cdnurl}-/resize/1024x/-/format/png/`,
        srcset: `${cdnurl}-/resize/2048x/-/format/png/ 2x`,
        media: '(max-width: 1280px)',
        type: 'image/png',
        sizes: 1024,
      },
      {
        src: `${cdnurl}-/resize/1280x/-/format/png/`,
        srcset: `${cdnurl}-/resize/2560x/-/format/png/ 2x`,
        type: 'image/png',
        sizes: 1280,
      },
    ]

    expect(getSources(uuid, options)).toEqual(expected)
  })
})
