import { describe, test } from 'node:test'
import assert from 'node:assert'
import match from '../src/index.js'

describe('Check all patterns', () => {
  test('Otherwise', () => {
    const result = match('test')
      .where(
        (value) => typeof value === 'object' && value.a === 1,
        (value) => 'function',
      )
      .where({ b: 2 }, (value) => 'Object')
      .where('text', (value) => 'text')
      .where(1, (value) => 'number')
      .where(false, (value) => 'boolean')
      .otherwise((value) => 'Otherwise')
      .run()

    assert.deepStrictEqual(result, 'Otherwise')
  })
  test('Object', () => {
    const result = match({ a: 3, b: 2 })
      .where(
        (value) => typeof value === 'object' && value.a === 1,
        (value) => 'function',
      )
      .where({ b: 2 }, (value) => 'Object')
      .where('text', (value) => 'text')
      .where(1, (value) => 'number')
      .where(false, (value) => 'boolean')
      .otherwise((value) => 'Otherwise')
      .run()

    assert.deepStrictEqual(result, 'Object')
  })
  test('function', () => {
    const result = match({ a: 1, b: 2 })
      .where(
        (value) => typeof value === 'object' && value.a === 1,
        (value) => 'function',
      )
      .where({ b: 2 }, (value) => 'Object')
      .where('text', (value) => 'text')
      .where(1, (value) => 'number')
      .where(false, (value) => 'boolean')
      .otherwise((value) => 'Otherwise')
      .run()

    assert.deepStrictEqual(result, 'function')
  })
  test('string', () => {
    const result = match('text')
      .where(
        (value) => typeof value === 'object' && value.a === 1,
        (value) => 'function',
      )
      .where({ b: 2 }, (value) => 'Object')
      .where('text', (value) => 'text')
      .where(1, (value) => 'number')
      .where(false, (value) => 'boolean')
      .otherwise((value) => 'Otherwise')
      .run()

    assert.deepStrictEqual(result, 'text')
  })
  test('number', () => {
    const result = match(1)
      .where(
        (value) => typeof value === 'object' && value.a === 1,
        (value) => 'function',
      )
      .where({ b: 2 }, (value) => 'Object')
      .where('text', (value) => 'text')
      .where(1, (value) => 'number')
      .where(false, (value) => 'boolean')
      .otherwise((value) => 'Otherwise')
      .run()

    assert.deepStrictEqual(result, 'number')
  })
  test('boolean', () => {
    const result = match(false)
      .where(
        (value) => typeof value === 'object' && value.a === 1,
        (value) => 'function',
      )
      .where({ b: 2 }, (value) => 'Object')
      .where('text', (value) => 'text')
      .where(1, (value) => 'number')
      .where(false, (value) => 'boolean')
      .otherwise((value) => 'Otherwise')
      .run()

    assert.deepStrictEqual(result, 'boolean')
  })
})
