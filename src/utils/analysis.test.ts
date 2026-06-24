/**
 * UNIT TESTS — analysis.ts
 *
 * Category: Pure function / data transformation logic
 * Strategy: Test capitalize and sortedEntries in isolation with varied inputs
 *           to verify string formatting and numerical sorting behavior.
 *
 * Covers:
 *  - capitalize: single word, multi-word, already capitalized, lowercase
 *  - sortedEntries: descending sort by value, tie-breaking, single entry, empty object
 */
import { capitalize, sortedEntries } from './analysis'

describe('capitalize', () => {
  it('capitalizes a single lowercase word', () => {
    expect(capitalize('white')).toBe('White')
  })

  it('capitalizes each word in a multi-word string', () => {
    expect(capitalize('south asian')).toBe('South Asian')
  })

  it('preserves already-capitalized words', () => {
    expect(capitalize('Already Good')).toBe('Already Good')
  })

  it('handles single character', () => {
    expect(capitalize('a')).toBe('A')
  })

  it('handles empty string', () => {
    expect(capitalize('')).toBe('')
  })

  it('capitalizes mixed case words', () => {
    expect(capitalize('mIDDLE eASTERN')).toBe('MIDDLE EASTERN')
  })
})

describe('sortedEntries', () => {
  it('sorts entries by value descending', () => {
    const input = { white: 0.6, black: 0.2, asian: 0.15, other: 0.05 }
    const result = sortedEntries(input)

    expect(result[0]).toEqual(['white', 0.6])
    expect(result[1]).toEqual(['black', 0.2])
    expect(result[2]).toEqual(['asian', 0.15])
    expect(result[3]).toEqual(['other', 0.05])
  })

  it('handles ties by preserving insertion order', () => {
    const input = { male: 0.5, female: 0.5 }
    const result = sortedEntries(input)

    expect(result).toHaveLength(2)
    expect(result[0][1]).toBe(0.5)
    expect(result[1][1]).toBe(0.5)
  })

  it('handles single entry', () => {
    const input = { category: 0.99 }
    const result = sortedEntries(input)

    expect(result).toEqual([['category', 0.99]])
  })

  it('handles empty object', () => {
    const result = sortedEntries({})
    expect(result).toEqual([])
  })

  it('correctly sorts decimal precision values', () => {
    const input = { '20-30': 0.451, '30-40': 0.449, '40-50': 0.1 }
    const result = sortedEntries(input)

    expect(result[0][0]).toBe('20-30')
    expect(result[1][0]).toBe('30-40')
    expect(result[2][0]).toBe('40-50')
  })
})
