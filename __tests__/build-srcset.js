import {buildSrcSet} from '../modules/build-srcset'

const uuid = '18d1c520-c52d-4c34-82a0-7e07dcbcf105'
const cdnurl = `https://ucarecdn.com/${uuid}/`

describe('buildSrcSet', () => {
  test('empty options', () => {
    const options = {}
    const expected = undefined

    expect(buildSrcSet(uuid, options)).toEqual(expected)
  })
  test('only width', () => {
    const options = {width: 1024}
    const expected = undefined

    expect(buildSrcSet(uuid, options)).toEqual(expected)
  })
  test('width and pixel_density as array (one element)', () => {
    const options = {
      width: 1024,
      pixel_density: ['2x'],
      max_resize: 3000,
    }
    const expected = `${cdnurl}-/resize/2048x/-/format/auto/ 2x`

    expect(buildSrcSet(uuid, options)).toEqual(expected)
  })
  test('width and pixel_density as array (three elements)', () => {
    const options = {
      width: 1024,
      pixel_density: ['2x', '3x', '4x'],
      max_resize: 3000,
    }
    const expected = `${cdnurl}-/resize/2048x/-/format/auto/ 2x, ${cdnurl}-/resize/3000x/-/format/auto/ 3x`

    expect(buildSrcSet(uuid, options)).toEqual(expected)
  })
  test('width and pixel_density as array (one element with oversize)', () => {
    const options = {
      width: 1024,
      pixel_density: ['2x'],
      oversize: 'dangerously unlimited',
      max_resize: 3000,
    }
    const expected = `${cdnurl}-/resize/2048x/-/format/auto/ 2x`

    expect(buildSrcSet(uuid, options)).toEqual(expected)
  })
  test('width and pixel_density as array (three elements with oversize)', () => {
    const options = {
      width: 1024,
      pixel_density: ['2x', '3x', '4x'],
      oversize: 'dangerously unlimited',
      max_resize: 3000,
    }
    const expected = `${cdnurl}-/resize/2048x/-/format/auto/ 2x, ${cdnurl}-/format/auto/ 3x`

    expect(buildSrcSet(uuid, options)).toEqual(expected)
  })
})
