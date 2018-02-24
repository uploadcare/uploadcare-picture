import {buildOptions} from '../modules/build-options'

describe('buildOptions', () => {
  test('options as string', () => {
    const options = '50vw'
    const expected = {
      width: '50vw',
      pixel_density: ['1x', '2x'],
      max_resize: 3000,
    }

    expect(buildOptions(options)).toEqual(expected)
  })
  test('options as number', () => {
    const options = 768
    const expected = {
      width: 768,
      pixel_density: ['1x', '2x'],
      max_resize: 3000,
    }

    expect(buildOptions(options)).toEqual(expected)
  })
  test('options as object (without pixel_density)', () => {
    const options = {
      width: 1024,
      name: 'example',
    }
    const expected = {
      width: 1024,
      name: 'example',
      pixel_density: ['1x', '2x'],
      max_resize: 3000,
    }

    expect(buildOptions(options)).toEqual(expected)
  })
  test('options as object (with pixel_density)', () => {
    const options = {
      width: 1024,
      pixel_density: ['2x', '3x'],
      max_resize: 3000,
    }
    const expected = {
      width: 1024,
      pixel_density: ['2x', '3x'],
      max_resize: 3000,
    }

    expect(buildOptions(options)).toEqual(expected)
  })
})
