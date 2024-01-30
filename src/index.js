import isFunction from 'lodash.isfunction'

/**
 * @typedef {Object} PatternBuilder
 * @property {(*, (*)=>*)=>PatternBuilder} where
 * @property {((*)=>*)=>PatternBuilder} otherwise
 * @property {()=>*} run
 */

/**
 * @example
 * import match from '@kozderka/pattern-matching'
 *
 * const result = match(1)
 *  .where((value) => value === 1, (value) => '2')
 *  .where(2, (value) => '2')
 *  .where('text', (value) => 'text')
 *  .where(true, (value) => 'true')
 *  .where({a: 1, b:2}, (value) => 'object')
 *  .otherwise((value) => 'otherwise')
 *  .run()
 *
 * @template V
 * @param {V} value
 * @returns {PatternBuilder}
 */
export default function match(value) {
  return patternBuilder(value)(null)([])
}

/**
 *
 * @param {*} value
 * @returns {((*)=>*)=>({pattern: *, callback: (*)=>*})=>PatternBuilder}
 */
function patternBuilder(value) {
  return (otherwise) =>
    (patterns = []) => {
      return {
        where: function (pattern, callback) {
          return patternBuilder(value)(otherwise)([
            ...patterns,
            { pattern, callback },
          ])
        },
        otherwise: function (otherwise) {
          return patternBuilder(value)(otherwise)(patterns)
        },
        run: function () {
          const pattern = patterns.find(({ pattern }) =>
            matchPattern(value)(pattern),
          )

          if (pattern) {
            return pattern.callback(value)
          } else if (otherwise) {
            return otherwise(value)
          }

          return null
        },
      }
    }
}

/**
 *
 * @param {*} value
 * @returns {(*)=>boolean}
 */
function matchPattern(value) {
  return (pattern) => {
    if (isFunction(pattern)) {
      return pattern(value) === true
    } else if (typeof pattern !== 'object') {
      return pattern === value
    } else {
      return Object.keys(pattern).every((key) => {
        return matchPattern(value[key])(pattern[key])
      })
    }
  }
}
