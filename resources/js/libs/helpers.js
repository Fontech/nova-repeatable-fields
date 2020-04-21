const isa = value => value && Array.isArray(value)

const values = items => {
  if (isa(items)) {
    return items
  }

  return Object.values(items)
}

export const contains = (haystack, needle) => values(haystack).indexOf(needle) !== -1

const normalizeKey = key => {
  if (!isa(key)) {
    key = `${key}`.replace(/^\[|\]/g, '').replace(/\[/g, '.').split('.')
  }

  return [...key]
}

const keys = (items) => {
  let keys = Object.keys(items)

  if (isa(items)) {
    keys = keys.map(k => +k)
  }

  return keys
}

const _has = (items, key, defaultValue = null) => {
  key = normalizeKey(key)

  let segment = `${key.shift()}`

  if (isa(items)) {
    items = {...items}
  }

  if (!contains(keys(items), segment)) {
    return [false, defaultValue]
  }

  let target = items[segment]

  if (!key.length) {
    return [true, target]
  }

  return _has(target, key, defaultValue)
}

export const get = (items, key, defaultValue = null) => _has(items, key, defaultValue)[1]

export const pluck = (items, value, key = null) => {
  const keyIsNull = key === null

  let result = keyIsNull ? [] : {}

  for (let k in items) {
    const row = items[k]

    result = keyIsNull ? [...result, get(row, value)] : { ...result, [get(row, key)]: get(row, value) }
  }

  return result
}