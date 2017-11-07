import Oscillator from './'
import ERRORS from '../errors.js'
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
  expect(osc.getPhaseIncrement(5)).toBe((2 * Math.PI * (445)) / SAMPLERATE)
})

test('set type', () => {
  const osc = new Oscillator()
  osc.setType(0)
  expect(osc.type).toBe(0)
  osc.setType(1)
  expect(osc.type).toBe(1)
  osc.setType(2)
  expect(osc.type).toBe(2)
  osc.setType(3)
  expect(osc.type).toBe(3)
  osc.setType(4)
  expect(osc.type).toBe(4)
  osc.setType()
  expect(osc.type).toBe(0)
})

test('set frequency', () => {
  const osc = new Oscillator()
  osc.setFreq(20)
  expect(osc.freq).toBe(20)
  expect(() => {
    osc.setFreq(0)
  }).toThrowError(ERRORS.invalidFreq)
})

test('set gain', () => {
  const osc = new Oscillator()
  osc.setGain(1)
  expect(osc.gain).toBe(1)
  osc.setGain()
  expect(osc.gain).toBe(0)
  expect(() => {
    osc.setGain(-1)
  }).toThrowError(ERRORS.invalidGain)
})

test('set phase', () => {
  const osc = new Oscillator()
  osc.setPhase(1)
  expect(osc.phase).toBe(1)
  osc.reset()
  expect(osc.phase).toBe(0)
})
