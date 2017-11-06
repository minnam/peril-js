import Oscillator from './'
import {TWOPI, SAMPLERATE} from '../constant'

test('contains these variables', () => {
  const osc = new Oscillator()

  expect(osc).toHaveProperty('type')
  expect(osc).toHaveProperty('freq')
  expect(osc).toHaveProperty('gain')
  expect(osc).toHaveProperty('phase')
})

test('get sinewave tick', () => {
  const osc = new Oscillator()
  expect(osc.getSineTick(0)).toBe(Math.sin(0))
  expect(osc.getSineTick(TWOPI)).toBe(Math.sin(TWOPI))
})

test('get square wave tick', () => {
  const osc = new Oscillator()
  expect(osc.getSquareTick(0)).toBe(1)
  expect(osc.getSquareTick(TWOPI)).toBe(-1)
})

test('get sawtooth(ramp up) wave tick', () => {
  const osc = new Oscillator()
  expect(osc.getSawtoothUTick(0)).toBe(2 * (((0) * (1.0 / TWOPI))) - 1.0)
})

test('get sawtooth(ramp down) wave tick', () => {
  const osc = new Oscillator()
  expect(osc.getSawtoothDTick(0)).toBe(1.0 - 2 * ((0) * (1.0 / TWOPI)))
})

test('get triangle wave tick', () => {
  const osc = new Oscillator()
  let val = (2 * ((0) * (1.0 / TWOPI))) - 1.0
  if (val < 0.0) {
    val = -val
  }
  val = 2.0 * (val - 0.5)
  expect(osc.getTriTick(0)).toBe(val)
})

test('get phase increment', () => {
  const osc = new Oscillator()

  expect(osc.getPhaseIncrement(0)).toBe((2 * Math.PI * (440)) / SAMPLERATE)
})
