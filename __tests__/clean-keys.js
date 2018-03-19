import {cleanKeys} from '../src/modules/clean-keys'

describe('cleanKeys', () => {
  test('clean object', () => {
    const obj = {
      key1: {keyA: 1},
      key2: undefined,
      key3: null,
      key4: {},
    }
    const expected = {key1: {keyA: 1}}

    expect(cleanKeys(obj)).toEqual(expected)
  })
  test('clean array', () => {
    const obj = {
      key1: [1, 2, 3],
      key2: undefined,
      key3: null,
      key4: [],
    }
    const expected = {key1: [1, 2, 3]}

    expect(cleanKeys(obj)).toEqual(expected)
  })
  test('clean string', () => {
    const obj = {
      key1: 'string1',
      key2: undefined,
      key3: null,
      key4: '',
    }
    const expected = {
      key1: 'string1',
      key4: '',
    }

    expect(cleanKeys(obj)).toEqual(expected)
  })
  test('clean number', () => {
    const obj = {
      key1: 1,
      key2: undefined,
      key3: null,
      key4: 0,
    }
    const expected = {
      key1: 1,
      key4: 0,
    }

    expect(cleanKeys(obj)).toEqual(expected)
  })
  test('clean embedded', () => {
    const obj = {
      key1: {
        k1: 0,
        k2: 2,
        k3: null,
      },
      key2: [undefined, 1, 'string'],
      key3: null,
      key4: {
        k1: null,
        k2: undefined,
        k3: {},
      },
      key5: [null, undefined],
    }
    const expected = {
      key1: {
        k1: 0,
        k2: 2,
      },
      key2: [1, 'string'],
    }

    expect(cleanKeys(obj)).toEqual(expected)
  })
})
