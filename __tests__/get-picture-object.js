/* eslint-disable max-len, max-nested-callbacks */

import {getPictureObject, checkWarnsEnv} from '../modules/get-picture-object'

global.console.warn = jest.fn()
global.console.info = jest.fn()

const uuid = '18d1c520-c52d-4c34-82a0-7e07dcbcf105'
const cdnurl = `https://ucarecdn.com/${uuid}/`

describe('checkWarnsEnv', () => {
  test('NODE_ENV === production', () => {
    const warns = (function() { // eslint-disable-line func-style
      const prevEnv = process.env.NODE_ENV

      process.env.NODE_ENV = 'production'

      const warns = checkWarnsEnv()

      process.env.NODE_ENV = prevEnv

      return warns
    })()

    const expected = true

    expect(warns).toBe(expected)
  })
  test('NODE_ENV !== production', () => {
    const warns = checkWarnsEnv()
    const expected = false

    expect(warns).toBe(expected)
  })
  test('no_warnings option', () => {
    const warns = checkWarnsEnv({no_warnings: true})
    const expected = true

    expect(warns).toBe(expected)
  })
})

describe('uuid', () => {
  test('no uuid', () => {
    expect(() => {
      getPictureObject()
    }).toThrow('You must pass to the function uuid as first argument')
  })

  test('empty uuid', () => {
    expect(() => {
      getPictureObject('')
    }).toThrow('You must pass to the function uuid as first argument')
  })

  test('undefined uuid', () => {
    expect(() => {
      getPictureObject(undefined)
    }).toThrow('You must pass to the function uuid as first argument')
  })
})

describe('options', () => {
  const expected = {image: {src: `${cdnurl}-/format/auto/`}}

  test('no options', () => {
    expect(getPictureObject(uuid)).toEqual(expected)
  })

  test('empty options', () => {
    expect(getPictureObject(uuid, {})).toEqual(expected)
  })

  test('undefined options', () => {
    expect(getPictureObject(uuid, undefined)).toEqual(expected)
  })

  test('options as string', () => {
    const expected = {
      image: {
        src: `${cdnurl}-/resize/768x/-/format/auto/`,
        srcset: `${cdnurl}-/resize/1536x/-/format/auto/ 2x`,
        width: '768px',
      },
    }

    expect(getPictureObject(uuid, '768px')).toEqual(expected)
  })

  test('options as number', () => {
    const expected = {
      image: {
        src: `${cdnurl}-/resize/768x/-/format/auto/`,
        srcset: `${cdnurl}-/resize/1536x/-/format/auto/ 2x`,
        width: 768,
      },
    }

    expect(getPictureObject(uuid, 768)).toEqual(expected)
  })
})

describe('width', () => {
  test('empty width', () => {
    const options = {width: ''}
    const expected = {image: {src: `${cdnurl}-/format/auto/`}}

    expect(getPictureObject(uuid, options)).toEqual(expected)
  })
  test('undefined width', () => {
    const options = {width: undefined}
    const expected = {image: {src: `${cdnurl}-/format/auto/`}}

    expect(getPictureObject(uuid, options)).toEqual(expected)
  })
  test('width as string', () => {
    const options = {width: '768px'}
    const expected = {
      image: {
        src: `${cdnurl}-/resize/768x/-/format/auto/`,
        srcset: `${cdnurl}-/resize/1536x/-/format/auto/ 2x`,
        width: '768px',
      },
    }

    expect(getPictureObject(uuid, options)).toEqual(expected)
  })
  test('width as number', () => {
    const options = {width: 768}
    const expected = {
      image: {
        src: `${cdnurl}-/resize/768x/-/format/auto/`,
        srcset: `${cdnurl}-/resize/1536x/-/format/auto/ 2x`,
        width: 768,
      },
    }

    expect(getPictureObject(uuid, options)).toEqual(expected)
  })
})

describe('format and name', () => {
  test('one format', () => {
    const options = {formats: ['jpg']}
    const expected = {
      sources: [
        {
          type: 'image/jpg',
          src: `${cdnurl}-/format/jpg/`,
        },
      ],
      image: {src: `${cdnurl}-/format/auto/`},
    }

    expect(getPictureObject(uuid, options)).toEqual(expected)
  })

  test('two formats', () => {
    const options = {formats: ['jpg', 'webp']}
    const expected = {
      sources: [
        {
          type: 'image/webp',
          src: `${cdnurl}-/format/webp/`,
        },
        {
          type: 'image/jpg',
          src: `${cdnurl}-/format/jpg/`,
        },
      ],
      image: {src: `${cdnurl}-/format/auto/`},
    }

    expect(getPictureObject(uuid, options)).toEqual(expected)
  })

  test('only name', () => {
    const options = {name: 'example'}
    const expected = {
      image: {
        src: `${cdnurl}-/format/auto/example`,
        alt: 'example',
      },
    }

    expect(getPictureObject(uuid, options)).toEqual(expected)
  })

  test('only name (with extension)', () => {
    const options = {name: 'example.jpg'}
    const expected = {
      image: {
        src: `${cdnurl}-/format/auto/example`,
        alt: 'example',
      },
    }

    expect(getPictureObject(uuid, options)).toEqual(expected)
  })

  test('one format and name', () => {
    const options = {
      formats: ['jpg'],
      name: 'example',
    }
    const expected = {
      sources: [
        {
          type: 'image/jpg',
          src: `${cdnurl}-/format/jpg/example.jpg`,
        },
      ],
      image: {
        src: `${cdnurl}-/format/auto/example`,
        alt: 'example',
      },
    }

    expect(getPictureObject(uuid, options)).toEqual(expected)
  })

  test('two formats and name', () => {
    const options = {
      formats: ['jpg', 'webp'],
      name: 'example',
    }
    const expected = {
      sources: [
        {
          type: 'image/webp',
          src: `${cdnurl}-/format/webp/example.webp`,
        },
        {
          type: 'image/jpg',
          src: `${cdnurl}-/format/jpg/example.jpg`,
        },
      ],
      image: {
        src: `${cdnurl}-/format/auto/example`,
        alt: 'example',
      },
    }

    expect(getPictureObject(uuid, options)).toEqual(expected)
  })

  test('two formats and name (with extension)', () => {
    const options = {
      formats: ['jpg', 'webp'],
      name: 'example.jpg',
    }
    const expected = {
      sources: [
        {
          type: 'image/webp',
          src: `${cdnurl}-/format/webp/example.webp`,
        },
        {
          type: 'image/jpg',
          src: `${cdnurl}-/format/jpg/example.jpg`,
        },
      ],
      image: {
        src: `${cdnurl}-/format/auto/example`,
        alt: 'example',
      },
    }

    expect(getPictureObject(uuid, options)).toEqual(expected)
  })
})

describe('sizes', () => {
  test('one size', () => {
    const options = {sizes: {'(max-width: 1024px)': '768px'}}
    const expected = {
      sources: [
        {
          srcset: `${cdnurl}-/resize/768x/-/format/auto/ 1x, ${cdnurl}-/resize/1536x/-/format/auto/ 2x`,
          media: '(max-width: 1024px)',
          sizes: '768px',
        },
      ],
      image: {src: `${cdnurl}-/format/auto/`},
    }

    expect(getPictureObject(uuid, options)).toEqual(expected)
  })

  test('one size (with default)', () => {
    const options = {
      sizes: {
        '(max-width: 1024px)': '768px',
        'default': '1024px',
      },
    }
    const expected = {
      sources: [
        {
          srcset: `${cdnurl}-/resize/768x/-/format/auto/ 1x, ${cdnurl}-/resize/1536x/-/format/auto/ 2x`,
          media: '(max-width: 1024px)',
          sizes: '768px',
        },
      ],
      image: {
        src: `${cdnurl}-/resize/1024x/-/format/auto/`,
        srcset: `${cdnurl}-/resize/2048x/-/format/auto/ 2x`,
        sizes: '1024px',
      },
    }

    expect(getPictureObject(uuid, options)).toEqual(expected)
  })

  test('two sizes', () => {
    const options = {
      sizes: {
        '(max-width: 1024px)': '768px',
        '(min-width: 1025px)': '1024px',
      },
    }
    const expected = {
      sources: [
        {
          srcset: `${cdnurl}-/resize/768x/-/format/auto/ 1x, ${cdnurl}-/resize/1536x/-/format/auto/ 2x`,
          media: '(max-width: 1024px)',
          sizes: '768px',
        },
        {
          srcset: `${cdnurl}-/resize/1024x/-/format/auto/ 1x, ${cdnurl}-/resize/2048x/-/format/auto/ 2x`,
          media: '(min-width: 1025px)',
          sizes: '1024px',
        },
      ],
      image: {src: `${cdnurl}-/format/auto/`},
    }

    expect(getPictureObject(uuid, options)).toEqual(expected)
  })

  test('two sizes (with default)', () => {
    const options = {
      sizes: {
        '(max-width: 768px)': '480px',
        '(max-width: 1280px)': '1024px',
        'default': '1280px',
      },
    }
    const expected = {
      sources: [
        {
          srcset: `${cdnurl}-/resize/480x/-/format/auto/ 1x, ${cdnurl}-/resize/960x/-/format/auto/ 2x`,
          media: '(max-width: 768px)',
          sizes: '480px',
        },
        {
          srcset: `${cdnurl}-/resize/1024x/-/format/auto/ 1x, ${cdnurl}-/resize/2048x/-/format/auto/ 2x`,
          media: '(max-width: 1280px)',
          sizes: '1024px',
        },
      ],
      image: {
        src: `${cdnurl}-/resize/1280x/-/format/auto/`,
        srcset: `${cdnurl}-/resize/2560x/-/format/auto/ 2x`,
        sizes: '1280px',
      },
    }

    expect(getPictureObject(uuid, options)).toEqual(expected)
  })
})

describe('formats and sizes', () => {
  test('one size and one format', () => {
    const options = {
      sizes: {'(max-width: 1024px)': '768px'},
      formats: ['jpg'],
    }
    const expected = {
      sources: [
        {
          srcset: `${cdnurl}-/resize/768x/-/format/jpg/ 1x, ${cdnurl}-/resize/1536x/-/format/jpg/ 2x`,
          media: '(max-width: 1024px)',
          type: 'image/jpg',
          sizes: '768px',
        },
      ],
      image: {src: `${cdnurl}-/format/auto/`},
    }

    expect(getPictureObject(uuid, options)).toEqual(expected)
  })
  test('one size and two formats', () => {
    const options = {
      sizes: {'(max-width: 1024px)': '768px'},
      formats: ['jpg', 'webp'],
    }
    const expected = {
      sources: [
        {
          srcset: `${cdnurl}-/resize/768x/-/format/webp/ 1x, ${cdnurl}-/resize/1536x/-/format/webp/ 2x`,
          media: '(max-width: 1024px)',
          type: 'image/webp',
          sizes: '768px',
        },
        {
          srcset: `${cdnurl}-/resize/768x/-/format/jpg/ 1x, ${cdnurl}-/resize/1536x/-/format/jpg/ 2x`,
          media: '(max-width: 1024px)',
          type: 'image/jpg',
          sizes: '768px',
        },
      ],
      image: {src: `${cdnurl}-/format/auto/`},
    }

    expect(getPictureObject(uuid, options)).toEqual(expected)
  })
  test('two sizes and one format', () => {
    const options = {
      sizes: {
        '(max-width: 1024px)': '768px',
        '(min-width: 1025px)': '1024px',
      },
      formats: ['jpg'],
    }
    const expected = {
      sources: [
        {
          srcset: `${cdnurl}-/resize/768x/-/format/jpg/ 1x, ${cdnurl}-/resize/1536x/-/format/jpg/ 2x`,
          media: '(max-width: 1024px)',
          type: 'image/jpg',
          sizes: '768px',
        },
        {
          srcset: `${cdnurl}-/resize/1024x/-/format/jpg/ 1x, ${cdnurl}-/resize/2048x/-/format/jpg/ 2x`,
          media: '(min-width: 1025px)',
          type: 'image/jpg',
          sizes: '1024px',
        },
      ],
      image: {src: `${cdnurl}-/format/auto/`},
    }

    expect(getPictureObject(uuid, options)).toEqual(expected)
  })
  test('two sizes and two formats', () => {
    const options = {
      sizes: {
        '(max-width: 1024px)': '768px',
        '(min-width: 1025px)': '1024px',
      },
      formats: ['jpg', 'webp'],
    }
    const expected = {
      sources: [
        {
          srcset: `${cdnurl}-/resize/768x/-/format/webp/ 1x, ${cdnurl}-/resize/1536x/-/format/webp/ 2x`,
          media: '(max-width: 1024px)',
          type: 'image/webp',
          sizes: '768px',
        },
        {
          srcset: `${cdnurl}-/resize/1024x/-/format/webp/ 1x, ${cdnurl}-/resize/2048x/-/format/webp/ 2x`,
          media: '(min-width: 1025px)',
          type: 'image/webp',
          sizes: '1024px',
        },
        {
          srcset: `${cdnurl}-/resize/768x/-/format/jpg/ 1x, ${cdnurl}-/resize/1536x/-/format/jpg/ 2x`,
          media: '(max-width: 1024px)',
          type: 'image/jpg',
          sizes: '768px',
        },
        {
          srcset: `${cdnurl}-/resize/1024x/-/format/jpg/ 1x, ${cdnurl}-/resize/2048x/-/format/jpg/ 2x`,
          media: '(min-width: 1025px)',
          type: 'image/jpg',
          sizes: '1024px',
        },
      ],
      image: {src: `${cdnurl}-/format/auto/`},
    }

    expect(getPictureObject(uuid, options)).toEqual(expected)
  })
  test('three sizes and three formats', () => {
    const options = {
      sizes: {
        '(max-width: 1024px)': '768px',
        '(min-width: 1025px)': '1024px',
        'default': '1280px',
      },
      formats: ['jpg', 'webp', 'png'],
    }
    const expected = {
      sources: [
        {
          srcset: `${cdnurl}-/resize/768x/-/format/webp/ 1x, ${cdnurl}-/resize/1536x/-/format/webp/ 2x`,
          media: '(max-width: 1024px)',
          type: 'image/webp',
          sizes: '768px',
        },
        {
          srcset: `${cdnurl}-/resize/1024x/-/format/webp/ 1x, ${cdnurl}-/resize/2048x/-/format/webp/ 2x`,
          media: '(min-width: 1025px)',
          type: 'image/webp',
          sizes: '1024px',
        },
        {
          srcset: `${cdnurl}-/resize/1280x/-/format/webp/ 1x, ${cdnurl}-/resize/2560x/-/format/webp/ 2x`,
          type: 'image/webp',
          sizes: '1280px',
        },
        {
          srcset: `${cdnurl}-/resize/768x/-/format/jpg/ 1x, ${cdnurl}-/resize/1536x/-/format/jpg/ 2x`,
          media: '(max-width: 1024px)',
          type: 'image/jpg',
          sizes: '768px',
        },
        {
          srcset: `${cdnurl}-/resize/1024x/-/format/jpg/ 1x, ${cdnurl}-/resize/2048x/-/format/jpg/ 2x`,
          media: '(min-width: 1025px)',
          type: 'image/jpg',
          sizes: '1024px',
        },
        {
          srcset: `${cdnurl}-/resize/1280x/-/format/jpg/ 1x, ${cdnurl}-/resize/2560x/-/format/jpg/ 2x`,
          type: 'image/jpg',
          sizes: '1280px',
        },
        {
          srcset: `${cdnurl}-/resize/768x/-/format/png/ 1x, ${cdnurl}-/resize/1536x/-/format/png/ 2x`,
          media: '(max-width: 1024px)',
          type: 'image/png',
          sizes: '768px',
        },
        {
          srcset: `${cdnurl}-/resize/1024x/-/format/png/ 1x, ${cdnurl}-/resize/2048x/-/format/png/ 2x`,
          media: '(min-width: 1025px)',
          type: 'image/png',
          sizes: '1024px',
        },
        {
          srcset: `${cdnurl}-/resize/1280x/-/format/png/ 1x, ${cdnurl}-/resize/2560x/-/format/png/ 2x`,
          type: 'image/png',
          sizes: '1280px',
        },
      ],
      image: {
        src: `${cdnurl}-/resize/1280x/-/format/auto/`,
        srcset: `${cdnurl}-/resize/2560x/-/format/auto/ 2x`,
        sizes: '1280px',
      },
    }

    expect(getPictureObject(uuid, options)).toEqual(expected)
  })
})

describe('pixel_density', () => {
  test('only pixel_density (without width and sizes)', () => {
    const options = {pixel_density: [2, 3]}

    expect(() => {
      getPictureObject(uuid, options)
    }).toThrow()
  })
  test('pixel_density with sizes', () => {
    const options = {
      sizes: {
        '(max-width: 1024px)': '768px',
        'default': '1024px',
      },
      pixel_density: [2, 3],
    }
    const expected = {
      sources: [
        {
          srcset: `${cdnurl}-/resize/1536x/-/format/auto/ 2x, ${cdnurl}-/resize/2304x/-/format/auto/ 3x`,
          media: '(max-width: 1024px)',
          sizes: '768px',
        },
      ],
      image: {
        src: `${cdnurl}-/resize/1024x/-/format/auto/`,
        srcset: `${cdnurl}-/resize/2048x/-/format/auto/ 2x, ${cdnurl}-/resize/3000x/-/format/auto/ 3x`,
        sizes: '1024px',
      },
    }

    expect(getPictureObject(uuid, options)).toEqual(expected)
  })
  test('empty pixel_density', () => {
    const options = {
      width: 768,
      pixel_density: '',
    }
    const expected = {
      image: {
        src: `${cdnurl}-/resize/768x/-/format/auto/`,
        srcset: `${cdnurl}-/resize/1536x/-/format/auto/ 2x`,
        width: 768,
      },
    }

    expect(getPictureObject(uuid, options)).toEqual(expected)
  })
  test('pixel_density as string', () => {
    const options = {
      width: 768,
      pixel_density: '300w',
    }
    const expected = {
      image: {
        src: `${cdnurl}-/resize/768x/-/format/auto/`,
        srcset: `${cdnurl}-/resize/300x/-/format/auto/ 300w`,
        width: 768,
      },
    }

    expect(getPictureObject(uuid, options)).toEqual(expected)
  })
  test('pixel_density as number', () => {
    const options = {
      width: 768,
      pixel_density: 3,
    }
    const expected = {
      image: {
        src: `${cdnurl}-/resize/768x/-/format/auto/`,
        srcset: `${cdnurl}-/resize/1536x/-/format/auto/ 2x, ${cdnurl}-/resize/2304x/-/format/auto/ 3x`,
        width: 768,
      },
    }

    expect(getPictureObject(uuid, options)).toEqual(expected)
  })
  test('pixel_density as array (one element)', () => {
    const options = {
      width: 768,
      pixel_density: [3],
    }
    const expected = {
      image: {
        src: `${cdnurl}-/resize/768x/-/format/auto/`,
        srcset: `${cdnurl}-/resize/2304x/-/format/auto/ 3x`,
        width: 768,
      },
    }

    expect(getPictureObject(uuid, options)).toEqual(expected)
  })
  test('pixel_density as array (three elements)', () => {
    const options = {
      width: 768,
      pixel_density: [1, 2, 4],
    }
    const expected = {
      image: {
        src: `${cdnurl}-/resize/768x/-/format/auto/`,
        srcset: `${cdnurl}-/resize/1536x/-/format/auto/ 2x, ${cdnurl}-/resize/3000x/-/format/auto/ 4x`,
        width: 768,
      },
    }

    expect(getPictureObject(uuid, options)).toEqual(expected)
  })
})

describe('sizes that more than 3000px', () => {
  test('one size with default and array of pixel_density', () => {
    const options = {
      sizes: {
        '(max-width: 1280px)': '1024px',
        'default': '1280px',
      },
      pixel_density: [2, 4],
    }
    const expected = {
      sources: [
        {
          srcset: `${cdnurl}-/resize/2048x/-/format/auto/ 2x, ${cdnurl}-/resize/3000x/-/format/auto/ 4x`,
          media: '(max-width: 1280px)',
          sizes: '1024px',
        },
      ],
      image: {
        src: `${cdnurl}-/resize/1280x/-/format/auto/`,
        srcset: `${cdnurl}-/resize/2560x/-/format/auto/ 2x, ${cdnurl}-/resize/3000x/-/format/auto/ 4x`,
        sizes: '1280px',
      },
    }

    expect(getPictureObject(uuid, options)).toEqual(expected)
  })
  test('width and array of pixel_density', () => {
    const options = {
      width: 1024,
      pixel_density: [2, 4],
    }
    const expected = {
      image: {
        src: `${cdnurl}-/resize/1024x/-/format/auto/`,
        srcset: `${cdnurl}-/resize/2048x/-/format/auto/ 2x, ${cdnurl}-/resize/3000x/-/format/auto/ 4x`,
        width: 1024,
      },
    }

    expect(getPictureObject(uuid, options)).toEqual(expected)
  })
  test('width and array of pixel_density and oversize: dangerously unlimited', () => {
    const options = {
      width: 1024,
      pixel_density: [2, 4],
      oversize: 'dangerously unlimited',
    }
    const expected = {
      image: {
        src: `${cdnurl}-/resize/1024x/-/format/auto/`,
        srcset: `${cdnurl}-/resize/2048x/-/format/auto/ 2x, ${cdnurl}-/format/auto/ 4x`,
        width: 1024,
      },
    }

    expect(getPictureObject(uuid, options)).toEqual(expected)
  })
  test('oversize: dangerously unlimited', () => {
    const options = {
      sizes: {
        '(max-width: 1280px)': '1024px',
        'default': '1280px',
      },
      pixel_density: [2, 4],
      oversize: 'dangerously unlimited',
    }
    const expected = {
      sources: [
        {
          srcset: `${cdnurl}-/resize/2048x/-/format/auto/ 2x, ${cdnurl}-/format/auto/ 4x`,
          media: '(max-width: 1280px)',
          sizes: '1024px',
        },
      ],
      image: {
        src: `${cdnurl}-/resize/1280x/-/format/auto/`,
        srcset: `${cdnurl}-/resize/2560x/-/format/auto/ 2x, ${cdnurl}-/format/auto/ 4x`,
        sizes: '1280px',
      },
    }

    expect(getPictureObject(uuid, options)).toEqual(expected)
  })
})

describe('real examples', () => {
  test('sizes with default, formats and pixel_density', () => {
    const options = {
      sizes: {
        '(max-width: 1024px)': '768px',
        'default': '1024px',
      },
      formats: ['jpg', 'webp'],
      pixel_density: [1, 2, 3, 4],
    }
    const expected = {
      sources: [
        {
          srcset: `${cdnurl}-/resize/768x/-/format/webp/ 1x, ${cdnurl}-/resize/1536x/-/format/webp/ 2x, ${cdnurl}-/resize/2304x/-/format/webp/ 3x, ${cdnurl}-/resize/3000x/-/format/webp/ 4x`,
          type: 'image/webp',
          media: '(max-width: 1024px)',
          sizes: '768px',
        },
        {
          srcset: `${cdnurl}-/resize/1024x/-/format/webp/ 1x, ${cdnurl}-/resize/2048x/-/format/webp/ 2x, ${cdnurl}-/resize/3000x/-/format/webp/ 3x`,
          type: 'image/webp',
          sizes: '1024px',
        },
        {
          srcset: `${cdnurl}-/resize/768x/-/format/jpg/ 1x, ${cdnurl}-/resize/1536x/-/format/jpg/ 2x, ${cdnurl}-/resize/2304x/-/format/jpg/ 3x, ${cdnurl}-/resize/3000x/-/format/jpg/ 4x`,
          type: 'image/jpg',
          media: '(max-width: 1024px)',
          sizes: '768px',
        },
        {
          srcset: `${cdnurl}-/resize/1024x/-/format/jpg/ 1x, ${cdnurl}-/resize/2048x/-/format/jpg/ 2x, ${cdnurl}-/resize/3000x/-/format/jpg/ 3x`,
          type: 'image/jpg',
          sizes: '1024px',
        },
      ],
      image: {
        src: `${cdnurl}-/resize/1024x/-/format/auto/`,
        srcset: `${cdnurl}-/resize/2048x/-/format/auto/ 2x, ${cdnurl}-/resize/3000x/-/format/auto/ 3x`,
        sizes: '1024px',
      },
    }

    expect(getPictureObject(uuid, options)).toEqual(expected)
  })
  test('width, formats, name and pixel_density', () => {
    const options = {
      width: 768,
      formats: ['jpg', 'webp'],
      name: 'example',
      pixel_density: [1, 2, 3, 4],
    }
    const expected = {
      sources: [
        {
          srcset: `${cdnurl}-/resize/768x/-/format/webp/example.webp 1x, ${cdnurl}-/resize/1536x/-/format/webp/example.webp 2x, ${cdnurl}-/resize/2304x/-/format/webp/example.webp 3x, ${cdnurl}-/resize/3000x/-/format/webp/example.webp 4x`,
          type: 'image/webp',
        },
        {
          srcset: `${cdnurl}-/resize/768x/-/format/jpg/example.jpg 1x, ${cdnurl}-/resize/1536x/-/format/jpg/example.jpg 2x, ${cdnurl}-/resize/2304x/-/format/jpg/example.jpg 3x, ${cdnurl}-/resize/3000x/-/format/jpg/example.jpg 4x`,
          type: 'image/jpg',
        },
      ],
      image: {
        alt: 'example',
        src: `${cdnurl}-/resize/768x/-/format/auto/example`,
        srcset: `${cdnurl}-/resize/1536x/-/format/auto/example 2x, ${cdnurl}-/resize/2304x/-/format/auto/example 3x, ${cdnurl}-/resize/3000x/-/format/auto/example 4x`,
        width: 768,
      },
    }

    expect(getPictureObject(uuid, options)).toEqual(expected)
  })
  test('sizes with default, formats, name, pixel_density and oversize', () => {
    const options = {
      sizes: {
        '(max-width: 1024px)': '768px',
        'default': '1024px',
      },
      formats: ['jpg', 'webp'],
      name: 'example',
      pixel_density: [1, 2, 3, 4],
      oversize: 'dangerously unlimited',
    }
    const expected = {
      sources: [
        {
          srcset: `${cdnurl}-/resize/768x/-/format/webp/example.webp 1x, ${cdnurl}-/resize/1536x/-/format/webp/example.webp 2x, ${cdnurl}-/resize/2304x/-/format/webp/example.webp 3x, ${cdnurl}-/format/webp/example.webp 4x`,
          type: 'image/webp',
          media: '(max-width: 1024px)',
          sizes: '768px',
        },
        {
          srcset: `${cdnurl}-/resize/1024x/-/format/webp/example.webp 1x, ${cdnurl}-/resize/2048x/-/format/webp/example.webp 2x, ${cdnurl}-/format/webp/example.webp 3x`,
          type: 'image/webp',
          sizes: '1024px',
        },
        {
          srcset: `${cdnurl}-/resize/768x/-/format/jpg/example.jpg 1x, ${cdnurl}-/resize/1536x/-/format/jpg/example.jpg 2x, ${cdnurl}-/resize/2304x/-/format/jpg/example.jpg 3x, ${cdnurl}-/format/jpg/example.jpg 4x`,
          type: 'image/jpg',
          media: '(max-width: 1024px)',
          sizes: '768px',
        },
        {
          srcset: `${cdnurl}-/resize/1024x/-/format/jpg/example.jpg 1x, ${cdnurl}-/resize/2048x/-/format/jpg/example.jpg 2x, ${cdnurl}-/format/jpg/example.jpg 3x`,
          type: 'image/jpg',
          sizes: '1024px',
        },
      ],
      image: {
        alt: 'example',
        src: `${cdnurl}-/resize/1024x/-/format/auto/example`,
        srcset: `${cdnurl}-/resize/2048x/-/format/auto/example 2x, ${cdnurl}-/format/auto/example 3x`,
        sizes: '1024px',
      },
    }

    expect(getPictureObject(uuid, options)).toEqual(expected)
  })
})

describe('modifiers', () => {})

describe('warnings', () => {
  test('empty width', () => {
    getPictureObject(uuid)
    expect(console.warn).toHaveBeenCalledWith('Setting width or sizes.default is recommended') // eslint-disable-line no-console
  })

  test('has media but don\'t have default', () => {
    getPictureObject(uuid, {
      sizes: {
        '(max-width: 768px)': '480px',
        '(max-width: 1280px)': '1024px',
      },
    })
    expect(console.warn).toHaveBeenCalledWith('Empty default size') // eslint-disable-line no-console
  })
})
