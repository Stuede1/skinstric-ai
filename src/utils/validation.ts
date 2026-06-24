/**
 * Input validation for the testing/intro form.
 * Rules: required, no numbers, only letters/spaces/hyphens/apostrophes/commas/periods, min 2 chars.
 */
export function validate(value: string): string | null {
  const trimmed = value.trim()
  if (!trimmed) return 'This field is required'
  if (/\d/.test(trimmed)) return 'Must not contain numbers'
  if (!/^[a-zA-Z\s\-'.,]+$/.test(trimmed)) return 'Must only contain letters'
  if (trimmed.length < 2) return 'Must be at least 2 characters'
  return null
}
