import {buildWidth, getImage} from '../src/modules/get-image'

const uuid = '18d1c520-c52d-4c34-82a0-7e07dcbcf105'
const cdnurl = `https://ucarecdn.com/${uuid}/`

describe('buildWidth', () => {
  test('empty width', () => {
    const width = buildWidth()
    const expected = undefined

    expect(width).toEqual(expected)
  })
  test('zero width', () => {
    const width = buildWidth(0)
    const expected = undefined

    expect(width).toEqual(expected)
  })
  test('undefined width', () => {
    const width = buildWidth(undefined)
    const expected = undefined

    expect(width).toEqual(expected)
  })
  test('width as number', () => {
    const width = buildWidth(768)
    const expected = 768

    expect(width).toEqual(expected)
  })
  test('width as string', () => {
    const width = buildWidth('50vw')
    const expected = '50vw'

    expect(width).toEqual(expected)
  })
})

describe('getImage', () => { // eslint-disable-line max-statements
  test('undefined options', () => {
    const options = undefined
    const expected = {src: `${cdnurl}-/format/auto/`}

    expect(getImage(uuid, options)).toEqual(expected)
  })
  test('empty options', () => {
    const options = {}
    const expected = {src: `${cdnurl}-/format/auto/`}

    expect(getImage(uuid, options)).toEqual(expected)
  })
  test('width as number', () => {
    const options = {width: 1024}
    const expected = {
      src: `${cdnurl}-/resize/1024x/-/format/auto/`,
      srcset: `${cdnurl}-/resize/2048x/-/format/auto/ 2x`,
      width: 1024,
    }

    expect(getImage(uuid, options)).toEqual(expected)
  })
  test('wrong width format', () => {
    const options = {width: '1024xp'}
    const expected = {
      src: `${cdnurl}-/format/auto/`,
      width: '1024xp',
    }

    expect(getImage(uuid, options)).toEqual(expected)
  })
  test('width as string (viewport units)', () => {
    const options = {width: '50vw'}
    const expected = {
      src: `${cdnurl}-/format/auto/`,
      width: '50vw',
    }

    expect(getImage(uuid, options)).toEqual(expected)
  })
  test('width as string (pixels)', () => {
    const options = {width: '500px'}
    const expected = {
      src: `${cdnurl}-/resize/500x/-/format/auto/`,
      srcset: `${cdnurl}-/resize/1000x/-/format/auto/ 2x`,
      width: '500px',
    }

    expect(getImage(uuid, options)).toEqual(expected)
  })
  test('width more than 3000 (without oversize)', () => {
    const options = {width: 4000}
    const expected = {
      src: `${cdnurl}-/resize/3000x/-/format/auto/`,
      width: 4000,
    }

    expect(getImage(uuid, options)).toEqual(expected)
  })
  test('width more than 3000 (with oversize)', () => {
    const options = {
      width: 4000,
      oversize: 'dangerously unlimited',
    }
    const expected = {
      src: `${cdnurl}-/format/auto/`,
      width: 4000,
    }

    expect(getImage(uuid, options)).toEqual(expected)
  })
  test('width and pixel_density as array (one element)', () => {
    const options = {
      width: 1024,
      pixel_density: ['2x'],
    }
    const expected = {
      src: `${cdnurl}-/resize/1024x/-/format/auto/`,
      srcset: `${cdnurl}-/resize/2048x/-/format/auto/ 2x`,
      width: 1024,
    }

    expect(getImage(uuid, options)).toEqual(expected)
  })
  test('width and pixel_density as array (three elements)', () => {
    const options = {
      width: 1024,
      pixel_density: ['2x', '3x', '4x'],
    }
    const expected = {
      src: `${cdnurl}-/resize/1024x/-/format/auto/`,
      srcset: `${cdnurl}-/resize/2048x/-/format/auto/ 2x, ${cdnurl}-/resize/3000x/-/format/auto/ 3x`,
      width: 1024,
    }

    expect(getImage(uuid, options)).toEqual(expected)
  })
  test('width and pixel_density as array (three elements with oversize)', () => {
    const options = {
      width: 1024,
      pixel_density: ['2x', '3x', '4x'],
      oversize: 'dangerously unlimited',
    }
    const expected = {
      src: `${cdnurl}-/resize/1024x/-/format/auto/`,
      srcset: `${cdnurl}-/resize/2048x/-/format/auto/ 2x, ${cdnurl}-/format/auto/ 3x`,
      width: 1024,
    }

    expect(getImage(uuid, options)).toEqual(expected)
  })
})
