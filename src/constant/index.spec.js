import {
  CONTEXT,
  PI,
  TWOPI,
  SAMPLERATE
} from './'

test('is web audio context object', () => {
  expect(typeof CONTEXT).toBe('object')
})

test('is pi', () => {
  expect(PI).toBe(Math.PI)
})

test('is pi times two', () => {
  expect(TWOPI).toBe(Math.PI * 2)
})

test('is 44100', () => {
  expect(SAMPLERATE).toBe(44100)
})
