import {buildName} from '../src/modules/build-name'

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
