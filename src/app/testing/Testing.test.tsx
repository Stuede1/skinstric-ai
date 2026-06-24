/**
 * INTEGRATION TESTS — Testing Page (Multi-step Form + API)
 *
 * Category: Async data submission + multi-step form interaction
 * Strategy: Mock next/navigation, next/link, gsap, and global fetch.
 *           Simulate the complete user flow: entering name → location → API submission.
 *           Verify validation messages, step transitions, localStorage writes, and API calls.
 *
 * Covers:
 *  - Initial render: name step with "Click to type" prompt
 *  - Validation: error messages for empty, numeric, special char, too-short input
 *  - Step progression: name → location → success
 *  - localStorage writes on successful submission
 *  - fetch POST to skinstricPhaseOne API with correct payload
 *  - Error handling when API request fails
 *  - Back button navigation between steps
 */
import '@testing-library/jest-dom'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import Testing from './page'

const mockPush = jest.fn()

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
}))

jest.mock('next/link', () => {
  return ({ children, href, ...props }: { children: React.ReactNode; href: string; [key: string]: unknown }) => (
    <a href={href} {...props}>{children}</a>
  )
})

jest.mock('gsap', () => ({
  to: jest.fn(),
  fromTo: jest.fn(),
  timeline: () => ({
    fromTo: jest.fn().mockReturnThis(),
  }),
}))

describe('Testing Page', () => {
  let localStorageMock: Record<string, string>

  beforeEach(() => {
    mockPush.mockClear()
    localStorageMock = {}
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: (key: string) => localStorageMock[key] ?? null,
        setItem: (key: string, value: string) => { localStorageMock[key] = value },
        removeItem: (key: string) => { delete localStorageMock[key] },
        clear: () => { localStorageMock = {} },
      },
      writable: true,
    })
    global.fetch = jest.fn()
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('renders the name step initially', () => {
    render(<Testing />)
    expect(screen.getByText('Click to type')).toBeInTheDocument()
    expect(screen.getByText('Introduce Yourself')).toBeInTheDocument()
  })

  it('shows input field when clicked', () => {
    render(<Testing />)
    fireEvent.click(screen.getByText('Introduce Yourself'))
    expect(screen.getByPlaceholderText('Introduce Yourself')).toBeInTheDocument()
  })

  describe('validation', () => {
    it('shows required error on empty proceed', async () => {
      render(<Testing />)
      fireEvent.click(screen.getByText('Introduce Yourself'))

      const input = screen.getByPlaceholderText('Introduce Yourself')
      fireEvent.change(input, { target: { value: '' } })
      fireEvent.keyDown(input, { key: 'Enter' })

      expect(screen.getByText('This field is required')).toBeInTheDocument()
    })

    it('shows number error when digits are entered', () => {
      render(<Testing />)
      fireEvent.click(screen.getByText('Introduce Yourself'))

      const input = screen.getByPlaceholderText('Introduce Yourself')
      fireEvent.change(input, { target: { value: 'Cole123' } })
      fireEvent.keyDown(input, { key: 'Enter' })

      expect(screen.getByText('Must not contain numbers')).toBeInTheDocument()
    })

    it('shows character error when special chars are entered', () => {
      render(<Testing />)
      fireEvent.click(screen.getByText('Introduce Yourself'))

      const input = screen.getByPlaceholderText('Introduce Yourself')
      fireEvent.change(input, { target: { value: 'Cole@!' } })
      fireEvent.keyDown(input, { key: 'Enter' })

      expect(screen.getByText('Must only contain letters')).toBeInTheDocument()
    })

    it('shows min length error for single character', () => {
      render(<Testing />)
      fireEvent.click(screen.getByText('Introduce Yourself'))

      const input = screen.getByPlaceholderText('Introduce Yourself')
      fireEvent.change(input, { target: { value: 'C' } })
      fireEvent.keyDown(input, { key: 'Enter' })

      expect(screen.getByText('Must be at least 2 characters')).toBeInTheDocument()
    })
  })

  describe('step progression', () => {
    it('moves to location step after valid name', () => {
      render(<Testing />)
      fireEvent.click(screen.getByText('Introduce Yourself'))

      const input = screen.getByPlaceholderText('Introduce Yourself')
      fireEvent.change(input, { target: { value: 'Cole' } })
      fireEvent.keyDown(input, { key: 'Enter' })

      expect(screen.getByPlaceholderText('your city name')).toBeInTheDocument()
    })

    it('submits to API after valid location and shows success', async () => {
      jest.spyOn(console, 'log').mockImplementation(() => {})
      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true }),
      })

      render(<Testing />)

      // Enter name
      fireEvent.click(screen.getByText('Introduce Yourself'))
      const nameInput = screen.getByPlaceholderText('Introduce Yourself')
      fireEvent.change(nameInput, { target: { value: 'Cole' } })
      fireEvent.keyDown(nameInput, { key: 'Enter' })

      // Enter location
      const locationInput = screen.getByPlaceholderText('your city name')
      fireEvent.change(locationInput, { target: { value: 'Portland' } })
      fireEvent.keyDown(locationInput, { key: 'Enter' })

      await waitFor(() => {
        expect(screen.getByText('Thank you')).toBeInTheDocument()
        expect(screen.getByText('Cole')).toBeInTheDocument()
        expect(screen.getByText('from Portland')).toBeInTheDocument()
      })
    })

    it('writes name and location to localStorage', async () => {
      jest.spyOn(console, 'log').mockImplementation(() => {})
      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true }),
      })

      render(<Testing />)

      fireEvent.click(screen.getByText('Introduce Yourself'))
      const nameInput = screen.getByPlaceholderText('Introduce Yourself')
      fireEvent.change(nameInput, { target: { value: 'Cole' } })
      fireEvent.keyDown(nameInput, { key: 'Enter' })

      const locationInput = screen.getByPlaceholderText('your city name')
      fireEvent.change(locationInput, { target: { value: 'Portland' } })
      fireEvent.keyDown(locationInput, { key: 'Enter' })

      await waitFor(() => {
        expect(localStorageMock['skinstric_name']).toBe('Cole')
        expect(localStorageMock['skinstric_location']).toBe('Portland')
      })
    })

    it('calls fetch with correct payload', async () => {
      jest.spyOn(console, 'log').mockImplementation(() => {})
      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true }),
      })

      render(<Testing />)

      fireEvent.click(screen.getByText('Introduce Yourself'))
      const nameInput = screen.getByPlaceholderText('Introduce Yourself')
      fireEvent.change(nameInput, { target: { value: 'Cole' } })
      fireEvent.keyDown(nameInput, { key: 'Enter' })

      const locationInput = screen.getByPlaceholderText('your city name')
      fireEvent.change(locationInput, { target: { value: 'Portland' } })
      fireEvent.keyDown(locationInput, { key: 'Enter' })

      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledWith(
          'https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseOne',
          expect.objectContaining({
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: 'Cole', location: 'Portland' }),
          })
        )
      })
    })
  })

  describe('error handling', () => {
    it('shows error message when API fails', async () => {
      const spy = jest.spyOn(console, 'error').mockImplementation(() => {})
      ;(global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network failure'))

      render(<Testing />)

      fireEvent.click(screen.getByText('Introduce Yourself'))
      const nameInput = screen.getByPlaceholderText('Introduce Yourself')
      fireEvent.change(nameInput, { target: { value: 'Cole' } })
      fireEvent.keyDown(nameInput, { key: 'Enter' })

      const locationInput = screen.getByPlaceholderText('your city name')
      fireEvent.change(locationInput, { target: { value: 'Portland' } })
      fireEvent.keyDown(locationInput, { key: 'Enter' })

      await waitFor(() => {
        expect(screen.getByText('Something went wrong. Please try again.')).toBeInTheDocument()
      })
      spy.mockRestore()
    })

    it('shows error when API returns non-ok status', async () => {
      const spy = jest.spyOn(console, 'error').mockImplementation(() => {})
      ;(global.fetch as jest.Mock).mockResolvedValueOnce({ ok: false, status: 500 })

      render(<Testing />)

      fireEvent.click(screen.getByText('Introduce Yourself'))
      const nameInput = screen.getByPlaceholderText('Introduce Yourself')
      fireEvent.change(nameInput, { target: { value: 'Cole' } })
      fireEvent.keyDown(nameInput, { key: 'Enter' })

      const locationInput = screen.getByPlaceholderText('your city name')
      fireEvent.change(locationInput, { target: { value: 'Portland' } })
      fireEvent.keyDown(locationInput, { key: 'Enter' })

      await waitFor(() => {
        expect(screen.getByText('Something went wrong. Please try again.')).toBeInTheDocument()
      })
      spy.mockRestore()
    })
  })

  describe('back navigation', () => {
    it('navigates to home when Back is clicked on name step', () => {
      render(<Testing />)
      fireEvent.click(screen.getByText('Back'))
      expect(mockPush).toHaveBeenCalledWith('/')
    })

    it('goes back to name step from location step', () => {
      render(<Testing />)

      // Advance to location step
      fireEvent.click(screen.getByText('Introduce Yourself'))
      const nameInput = screen.getByPlaceholderText('Introduce Yourself')
      fireEvent.change(nameInput, { target: { value: 'Cole' } })
      fireEvent.keyDown(nameInput, { key: 'Enter' })

      expect(screen.getByPlaceholderText('your city name')).toBeInTheDocument()

      // Click back
      fireEvent.click(screen.getByText('Back'))

      // Should return to name step — shows previously entered name and click prompt
      expect(screen.getByText('Click to type')).toBeInTheDocument()
      expect(screen.getByText('Cole')).toBeInTheDocument()
      expect(screen.queryByPlaceholderText('your city name')).not.toBeInTheDocument()
    })
  })
})
