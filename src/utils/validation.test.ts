/**
 * UNIT TESTS — validation.ts
 *
 * Category: Pure function / input validation logic
 * Strategy: Test the validate function in isolation with deterministic inputs
 *           covering every validation rule and edge case.
 *
 * Covers:
 *  - Required field (empty string, whitespace-only)
 *  - Number rejection
 *  - Special character rejection
 *  - Minimum length enforcement
 *  - Valid inputs (letters, hyphens, apostrophes, commas, periods)
 */
import { validate } from './validation'

describe('validate', () => {
  describe('required field', () => {
    it('returns error for empty string', () => {
      expect(validate('')).toBe('This field is required')
    })

    it('returns error for whitespace-only input', () => {
      expect(validate('   ')).toBe('This field is required')
    })

    it('returns error for tab/newline whitespace', () => {
      expect(validate('\t\n')).toBe('This field is required')
    })
  })

  describe('number rejection', () => {
    it('rejects input containing digits', () => {
      expect(validate('John123')).toBe('Must not contain numbers')
    })

    it('rejects input that is only digits', () => {
      expect(validate('12345')).toBe('Must not contain numbers')
    })

    it('rejects single digit mixed with letters', () => {
      expect(validate('Cole2')).toBe('Must not contain numbers')
    })
  })

  describe('special character rejection', () => {
    it('rejects @ symbol', () => {
      expect(validate('test@name')).toBe('Must only contain letters')
    })

    it('rejects exclamation mark', () => {
      expect(validate('Hello!')).toBe('Must only contain letters')
    })

    it('rejects parentheses', () => {
      expect(validate('Name(test)')).toBe('Must only contain letters')
    })

    it('rejects forward slash', () => {
      expect(validate('City/Town')).toBe('Must only contain letters')
    })
  })

  describe('minimum length', () => {
    it('rejects single character input', () => {
      expect(validate('A')).toBe('Must be at least 2 characters')
    })

    it('accepts exactly 2 characters', () => {
      expect(validate('Al')).toBeNull()
    })
  })

  describe('valid inputs', () => {
    it('accepts simple name', () => {
      expect(validate('Cole')).toBeNull()
    })

    it('accepts name with spaces', () => {
      expect(validate('Cole Stuedeman')).toBeNull()
    })

    it('accepts hyphenated name', () => {
      expect(validate('Mary-Jane')).toBeNull()
    })

    it('accepts name with apostrophe', () => {
      expect(validate("O'Brien")).toBeNull()
    })

    it('accepts city with period', () => {
      expect(validate('St. Louis')).toBeNull()
    })

    it('accepts city with comma', () => {
      expect(validate('Portland, Oregon')).toBeNull()
    })

    it('trims leading/trailing whitespace before validating', () => {
      expect(validate('  Cole  ')).toBeNull()
    })
  })
})
