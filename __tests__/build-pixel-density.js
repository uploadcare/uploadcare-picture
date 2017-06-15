import {buildPixelDensity, pixelDensityFromNumber, pixelDensityFromString} from '../modules/build-pixel-density'

describe('pixelDensityFromNumber', () => {
  test('pixel density as number', () => {
    const pd = pixelDensityFromNumber(3)
    const expected = [2, 3]

    expect(pd).toEqual(expected)
  })
  test('pixel density as number (more than 16)', () => {
    const pd = pixelDensityFromNumber(24)
    const expected = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]

    expect(pd).toEqual(expected)
  })
  test('pixel density not a number (number as string)', () => {
    const pd = pixelDensityFromNumber('4')
    const expected = [2, 3, 4]

    expect(pd).toEqual(expected)
  })
  test('pixel density not a number (wrong string)', () => {
    const expected = [2, 3, 4]

    expect(() => { // eslint-disable-line max-nested-callbacks
      pixelDensityFromNumber('string')
    }).toThrow()
  })
})

describe('pixelDensityFromString', () => {
  test('pixel density as string (300w)', () => {
    expect(pixelDensityFromString('300w')).toBe('300w')
  })
  test('pixel density as string (3x)', () => {
    expect(pixelDensityFromString('3x')).toBe('3x')
  })
  test('pixel density as string (300)', () => {
    expect(pixelDensityFromString('300')).toBe('300')
  })
  test('pixel density as string (3)', () => {
    expect(pixelDensityFromString('3')).toBe('3')
  })
  test('pixel density as string (wrong)', () => {
    expect(() => { // eslint-disable-line max-nested-callbacks
      pixelDensityFromString('wrong')
    }).toThrow('pixel density must be a number')
  })
})

describe('buildPixelDensity', () => {
  test('pixel-density wrong format', () => {
    expect(() => { // eslint-disable-line max-nested-callbacks
      buildPixelDensity({})
    }).toThrow()
  })
  test('pixel-density as number', () => {
    const pd = 3
    const expected = ['2x', '3x']

    expect(buildPixelDensity(pd)).toEqual(expected)
  })
  test('pixel-density as string', () => {
    const pd = '300w'
    const expected = ['300w']

    expect(buildPixelDensity(pd)).toEqual(expected)
  })
  test('pixel-density as array of numbers', () => {
    const pd = [2, 3, 4]
    const expected = ['2x', '3x', '4x']

    expect(buildPixelDensity(pd)).toEqual(expected)
  })
  test('pixel-density as array of strings', () => {
    const pd = ['300w', '400w', '500w']
    const expected = ['300w', '400w', '500w']

    expect(buildPixelDensity(pd)).toEqual(expected)
  })
  test('pixel-density as array of mixed', () => {
    const pd = ['300w', '400w', 2, 3]
    const expected = ['300w', '400w', '2x', '3x']

    expect(buildPixelDensity(pd)).toEqual(expected)
  })
})
