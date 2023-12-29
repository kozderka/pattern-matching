import { describe, test } from 'node:test'
import assert from 'node:assert'
import { match } from '../src/index.js'

describe('Check all patterns', () => {
  test('Number', () => {
    const result = match(1)
      .where(Number, (value) => 'Number')
      .run()

    assert.deepStrictEqual(result, 'Number')
  })
  test('String', () => {
    const result = match('test')
      .where(String, (value) => 'String')
      .run()

    assert.deepStrictEqual(result, 'String')
  })
  test('Boolean', () => {
    const result = match(true)
      .where(Boolean, (value) => 'Boolean')
      .run()

    assert.deepStrictEqual(result, 'Boolean')
  })
  test('Otherwise', () => {
    const result = match('test')
      .where(Number, (value) => 'Number')
      .otherwise((value) => 'Otherwise')
      .run()

    assert.deepStrictEqual(result, 'Otherwise')
  })
  test('Object', () => {
    const result = match({ a: 1, b: 2 })
      .where({ b: 2 }, (value) => 'Object')
      .run()

    assert.deepStrictEqual(result, 'Object')
  })
  test('string', () => {
    const result = match('text')
      .where('text', (value) => 'text')
      .run()

    assert.deepStrictEqual(result, 'text')
  })
  test('number', () => {
    const result = match(1)
      .where(1, (value) => 'number')
      .run()

    assert.deepStrictEqual(result, 'number')
  })
  test('boolean', () => {
    const result = match(false)
      .where(false, (value) => 'boolean')
      .run()

    assert.deepStrictEqual(result, 'boolean')
  })
})
