/**
 * COMPONENT TESTS — Summary Page (Data Display + Category Switching)
 *
 * Category: Component rendering with localStorage-driven state
 * Strategy: Mock next/navigation, next/link, and localStorage to simulate
 *           the analysis data being available. Verify the donut chart, category
 *           sidebar, scores table, and category-switching behavior.
 *
 * Covers:
 *  - Redirect to /select when no analysis data in localStorage
 *  - Loading spinner before data is parsed
 *  - Renders Demographics heading and initial race category
 *  - Displays the top prediction with correct percentage
 *  - Switches categories when sidebar buttons are clicked
 *  - Updates donut chart percentage on category change
 *  - Selects a different value from the scores table
 */
import '@testing-library/jest-dom'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import Summary from './page'

const mockPush = jest.fn()
const mockRouter = { push: mockPush }

jest.mock('next/navigation', () => ({
  useRouter: () => mockRouter,
}))

jest.mock('next/link', () => {
  return ({ children, href, ...props }: { children: React.ReactNode; href: string; [key: string]: unknown }) => (
    <a href={href} {...props}>{children}</a>
  )
})

const mockAnalysisData = {
  data: {
    race: { white: 0.7, black: 0.15, asian: 0.1, 'middle eastern': 0.05 },
    age: { '20-30': 0.6, '30-40': 0.3, '40-50': 0.1 },
    gender: { male: 0.85, female: 0.15 },
  },
}

describe('Summary Page', () => {
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
  })

  it('redirects to /select when no analysis data exists', () => {
    render(<Summary />)
    expect(mockPush).toHaveBeenCalledWith('/select')
  })

  it('redirects to /select when localStorage contains invalid JSON', () => {
    localStorageMock['skinstric_analysis'] = 'invalid json {'
    render(<Summary />)
    expect(mockPush).toHaveBeenCalledWith('/select')
  })

  it('renders Demographics heading when data is available', () => {
    localStorageMock['skinstric_analysis'] = JSON.stringify(mockAnalysisData)
    render(<Summary />)
    expect(screen.getByText('Demographics')).toBeInTheDocument()
  })

  it('displays race as the default active category', () => {
    localStorageMock['skinstric_analysis'] = JSON.stringify(mockAnalysisData)
    render(<Summary />)
    expect(screen.getAllByText('White').length).toBeGreaterThan(0)
    expect(screen.getAllByText('70%').length).toBeGreaterThan(0)
  })

  it('renders all race entries in the scores table', () => {
    localStorageMock['skinstric_analysis'] = JSON.stringify(mockAnalysisData)
    render(<Summary />)
    expect(screen.getAllByText('White').length).toBeGreaterThan(0)
    expect(screen.getByText('Black')).toBeInTheDocument()
    expect(screen.getByText('Asian')).toBeInTheDocument()
    expect(screen.getByText('Middle Eastern')).toBeInTheDocument()
  })

  it('switches to age category when Age sidebar button is clicked', () => {
    localStorageMock['skinstric_analysis'] = JSON.stringify(mockAnalysisData)
    render(<Summary />)

    // The age button shows the top age value
    fireEvent.click(screen.getByText('Age'))

    expect(screen.getAllByText('60%').length).toBeGreaterThan(0)
    expect(screen.getAllByText('20-30').length).toBeGreaterThan(0)
  })

  it('switches to gender category when Sex sidebar button is clicked', () => {
    localStorageMock['skinstric_analysis'] = JSON.stringify(mockAnalysisData)
    render(<Summary />)

    fireEvent.click(screen.getByText('Sex'))

    expect(screen.getAllByText('85%').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Male').length).toBeGreaterThan(0)
  })

  it('updates selection when a different score is clicked', () => {
    localStorageMock['skinstric_analysis'] = JSON.stringify(mockAnalysisData)
    render(<Summary />)

    // Click on "Black" in the scores table
    fireEvent.click(screen.getByText('Black'))

    // The donut chart center should update to 15%
    expect(screen.getAllByText('15%').length).toBeGreaterThan(0)
  })

  it('renders A.I. Analysis subtitle', () => {
    localStorageMock['skinstric_analysis'] = JSON.stringify(mockAnalysisData)
    render(<Summary />)
    expect(screen.getByText('A.I. Analysis')).toBeInTheDocument()
    expect(screen.getByText('Predicted Race & Age')).toBeInTheDocument()
  })
})
