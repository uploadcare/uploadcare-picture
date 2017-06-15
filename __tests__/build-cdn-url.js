import {buildName, buildCDNUrl, buildFormat, maxNumber, buildResize, buildWidthNumber} from '../modules/build-cdn-url'

const uuid = '18d1c520-c52d-4c34-82a0-7e07dcbcf105'
const cdnurl = `https://ucarecdn.com/${uuid}/`

describe('buildName', () => {
  test('only name', () => {
    expect(buildName(null, 'example')).toBe('example')
  })
  test('only format', () => {
    expect(buildName('jpg', null)).toBe('')
  })
  test('name and format', () => {
    expect(buildName('jpg', 'example')).toBe('example.jpg')
  })
})

describe('buildWidthNumber', () => {
  test('width as number', () => {
    const number = buildWidthNumber(200)
    const expected = 200

    expect(number).toBe(expected)
  })
  test('width in pixels', () => {
    const number = buildWidthNumber('200px')
    const expected = 200

    expect(number).toBe(expected)
  })
  test('width in viewport units', () => {
    const number = buildWidthNumber('50vw')
    const expected = null

    expect(number).toBe(expected)
  })
})

describe('buildResize', () => {
  test('undefined options', () => {
    expect(() => { // eslint-disable-line max-nested-callbacks
      buildResize('2x')
    }).toThrow()
  })
  test('resize wrong format', () => {
    expect(() => { // eslint-disable-line max-nested-callbacks
      buildResize('wrong format', {width: 1000})
    }).toThrow()
  })
  test('resize 2x', () => {
    const resize = buildResize('2x', {
      width: 1000,
      max_resize: 3000,
    })
    const expected = '-/resize/2000x/'

    expect(resize).toBe(expected)
  })
  test('resize 200w', () => {
    const resize = buildResize('200w', {
      width: 1000,
      max_resize: 3000,
    })
    const expected = '-/resize/200x/'

    expect(resize).toBe(expected)
  })
  test('resize 200w (without width)', () => {
    const resize = buildResize('200w', {max_resize: 3000})
    const expected = '-/resize/200x/'

    expect(resize).toBe(expected)
  })
  test('resize 2x (with oversize)', () => {
    const resize = buildResize('2x', {
      width: 2000,
      oversize: 'dangerously unlimited',
      max_resize: 3000,
    })
    const expected = ''

    expect(resize).toBe(expected)
  })
  test('resize 4000w (with oversize)', () => {
    const resize = buildResize('4000w', {
      width: 0,
      oversize: 'dangerously unlimited',
      max_resize: 3000,
    })
    const expected = ''

    expect(resize).toBe(expected)
  })
  test('resize 2x (with wrong oversize)', () => {
    const resize = buildResize('2x', {
      width: 2000,
      oversize: 'wrong oversize',
      max_resize: 3000,
    })
    const expected = '-/resize/3000x/'

    expect(resize).toBe(expected)
  })
})

describe('maxNumber', () => {
  test('number less than 3000', () => {
    const resize = maxNumber(2000, undefined, 3000)
    const expected = '-/resize/2000x/'

    expect(resize).toBe(expected)
  })
  test('number less than 3000 (with oversize)', () => {
    const resize = maxNumber(2000, 'dangerously unlimited', 3000)
    const expected = '-/resize/2000x/'

    expect(resize).toBe(expected)
  })
  test('number more than 3000', () => {
    const resize = maxNumber(4000, undefined, 3000)
    const expected = '-/resize/3000x/'

    expect(resize).toBe(expected)
  })
  test('number more than 3000 (with oversize)', () => {
    const resize = maxNumber(4000, 'dangerously unlimited', 3000)
    const expected = ''

    expect(resize).toBe(expected)
  })
  test('number more than 3000 (with wrong oversize)', () => {
    const resize = maxNumber(4000, 'wrong oversize', 3000)
    const expected = '-/resize/3000x/'

    expect(resize).toBe(expected)
  })
})

describe('buildFormat', () => {
  test('set format', () => {
    const format = buildFormat('jpg')
    const expected = '-/format/jpg/'

    expect(format).toBe(expected)
  })
  test('undefined format', () => {
    const format = buildFormat(undefined)
    const expected = '-/format/auto/'

    expect(format).toBe(expected)
  })
  test('null format', () => {
    const format = buildFormat(null)
    const expected = '-/format/auto/'

    expect(format).toBe(expected)
  })
  test('empty string format', () => {
    const format = buildFormat('')
    const expected = '-/format/auto/'

    expect(format).toBe(expected)
  })
})

describe('buildCDNUrl', () => {
  test('width', () => {
    const options = {
      width: 768,
      max_resize: 3000,
    }
    const expected = `${cdnurl}-/resize/768x/-/format/auto/`

    expect(buildCDNUrl(uuid, options)).toEqual(expected)
  })
  test('width more than 3000', () => {
    const options = {
      width: 4000,
      max_resize: 3000,
    }
    const expected = `${cdnurl}-/resize/3000x/-/format/auto/`

    expect(buildCDNUrl(uuid, options)).toEqual(expected)
  })
  test('width and format', () => {
    const options = {
      width: 768,
      format: 'jpg',
      max_resize: 3000,
    }
    const expected = `${cdnurl}-/resize/768x/-/format/jpg/`

    expect(buildCDNUrl(uuid, options)).toEqual(expected)
  })
  test('width and resize', () => {
    const options = {
      width: 768,
      resize: '2x',
      max_resize: 3000,
    }
    const expected = `${cdnurl}-/resize/1536x/-/format/auto/`

    expect(buildCDNUrl(uuid, options)).toEqual(expected)
  })
  test('width, resize and oversize', () => {
    const options = {
      width: 1024,
      resize: '4x',
      oversize: 'dangerously unlimited',
      max_resize: 3000,
    }
    const expected = `${cdnurl}-/format/auto/`

    expect(buildCDNUrl(uuid, options)).toEqual(expected)
  })
})
