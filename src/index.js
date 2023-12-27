export function match (value) {
  return patternBuilder(value)(null)([])
}

function patternBuilder (value) {
  return (otherwise) => (patterns = []) => {
    return {
      where: function (pattern, callback) {
        return patternBuilder(value)(otherwise)([...patterns, { pattern, callback }])
      },
      otherwise: function (otherwise) {
        return patternBuilder(value)(otherwise)(patterns)
      },
      run: function () {
        const pattern = patterns.find(({ pattern }) => matchPattern(value)(pattern))

        if (pattern) {
          return pattern.callback(value)
        } else {
          return otherwise(value)
        }
      }
    }
  }
}

function matchPattern (value) {
  return (pattern) => {
    if (String === pattern && typeof value === 'string') {
      return true
    } else if (Number === pattern && isNaN(value) === false && typeof value === 'number') {
      return true
    } else if (Boolean === pattern && typeof value === 'boolean') {
      return true
    } else if (typeof pattern === 'function') {
      return pattern(value) === true
    } else if (typeof pattern !== 'object') {
      return pattern === value
    } else {
      return Object.entries(pattern).every(([key, value]) => {
        return matchPattern(value)(pattern[key])
      })
    }
  }
}
