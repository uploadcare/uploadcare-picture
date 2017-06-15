import {buildSrc} from '../modules/build-src'

const uuid = '18d1c520-c52d-4c34-82a0-7e07dcbcf105'
const cdnurl = `https://ucarecdn.com/${uuid}/`

describe('buildSrc', () => {
  test('empty options', () => {
    const options = {}
    const expected = 'https://ucarecdn.com/18d1c520-c52d-4c34-82a0-7e07dcbcf105/-/format/auto/'

    expect(buildSrc(uuid, options)).toEqual(expected)
  })
  test('width (wrong format)', () => {
    expect(() => { // eslint-disable-line max-nested-callbacks
      buildSrc(uuid, {width: 'wrong format'})
    }).toThrow()
  })
  test('width (wrong letter)', () => {
    expect(() => { // eslint-disable-line max-nested-callbacks
      buildSrc(uuid, {width: '200r'})
    }).toThrow()
  })
  test('width', () => {
    const options = {width: 1024}
    const expected = 'https://ucarecdn.com/18d1c520-c52d-4c34-82a0-7e07dcbcf105/-/resize/1024x/-/format/auto/'

    expect(buildSrc(uuid, options)).toEqual(expected)
  })
  test('width (as viewport units)', () => {
    const options = {
      width: '200w',
      max_resize: 3000,
    }
    const expected = `${cdnurl}-/resize/200x/-/format/auto/`

    expect(buildSrc(uuid, options)).toEqual(expected)
  })
  test('width (as pixels)', () => {
    const options = {
      width: '200px',
      max_resize: 3000,
    }
    const expected = `${cdnurl}-/resize/200x/-/format/auto/`

    expect(buildSrc(uuid, options)).toEqual(expected)
  })
  test('width with oversize', () => {
    const options = {
      width: 4000,
      max_resize: 3000,
    }
    const expected = `${cdnurl}-/resize/3000x/-/format/auto/`

    expect(buildSrc(uuid, options)).toEqual(expected)
  })
  test('width with oversize (dangerously unlimited)', () => {
    const options = {
      width: 4000,
      oversize: 'dangerously unlimited',
      max_resize: 3000,
    }
    const expected = `${cdnurl}-/format/auto/`

    expect(buildSrc(uuid, options)).toEqual(expected)
  })
})
