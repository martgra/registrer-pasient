import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import Home from '@/app/page'
import { vi } from 'vitest'

describe('Home Component', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('renders the initial UI correctly', () => {
    render(<Home />)

    // Check for the heading
    expect(screen.getByRole('heading', { name: /Registrer Oppmøte/i })).toBeInTheDocument()
    // Check for the input field
    expect(screen.getByPlaceholderText('Skriv inn ditt personnummer')).toBeInTheDocument()
    // Check that there's no error or success message initially
    expect(screen.queryByText(/Oppmøte registrert!/i)).toBeNull()
    expect(screen.queryByText(/Ugyldig personnummer/i)).toBeNull()
  })

  it('updates personnummer field when digits are pressed', () => {
    render(<Home />)

    // Let's assume Keypad has buttons with test ids like "digit-1", "digit-2", etc.
    const digitButton = (digit: number) => screen.getByTestId(`digit-${digit}`)

    fireEvent.click(digitButton(1))
    fireEvent.click(digitButton(2))
    fireEvent.click(digitButton(3))

    const input = screen.getByPlaceholderText('Skriv inn ditt personnummer') as HTMLInputElement
    expect(input.value).toBe('123')
  })

  it('does not accept more than 11 digits', () => {
    render(<Home />)
    const digitButton = (digit: number) => screen.getByTestId(`digit-${digit}`)
    const input = screen.getByPlaceholderText('Skriv inn ditt personnummer') as HTMLInputElement

    // Press 12 digits
    for (let i = 0; i < 12; i++) {
      fireEvent.click(digitButton(1))
    }

    // Should only have 11 digits
    expect(input.value).toBe('11111111111')
  })

  it('shows an error if confirm is pressed without 11 digits', async () => {
    render(<Home />)

    const confirmButton = screen.getByTestId('confirm-button')
    fireEvent.click(confirmButton)

    expect(await screen.findByText(/Ugyldig personnummer/i)).toBeInTheDocument()
  })

  it('allows deleting a digit', () => {
    render(<Home />)
    const digitButton = (digit: number) => screen.getByTestId(`digit-${digit}`)
    const deleteButton = screen.getByTestId('delete-button')
    const input = screen.getByPlaceholderText('Skriv inn ditt personnummer') as HTMLInputElement

    fireEvent.click(digitButton(1))
    fireEvent.click(digitButton(2))
    fireEvent.click(digitButton(3))

    expect(input.value).toBe('123')

    fireEvent.click(deleteButton)

    expect(input.value).toBe('12')
  })

  it('confirms successfully with 11 digits', async () => {
    // Mock a successful fetch
    vi.spyOn(global, 'fetch').mockResolvedValueOnce(new Response(null, { status: 200 }))

    render(<Home />)

    const digitButton = (digit: number) => screen.getByTestId(`digit-${digit}`)
    const confirmButton = screen.getByTestId('confirm-button')
    const input = screen.getByPlaceholderText('Skriv inn ditt personnummer') as HTMLInputElement

    // Enter 11 digits
    for (const number of [1, 8, 0, 3, 8, 6, 2, 1, 9, 9, 4]) {
      fireEvent.click(digitButton(number))
    }

    fireEvent.click(confirmButton)

    await waitFor(() => {
      expect(screen.getByText('Oppmøte registrert!')).toBeInTheDocument()
      expect(input.value).toBe('')
    })
  })

  it('shows an error if API request fails', async () => {
    // Mock a failed fetch
    vi.spyOn(global, 'fetch').mockResolvedValueOnce(
      new Response(JSON.stringify({ message: 'Server feil' }), { status: 500 })
    )

    render(<Home />)

    const digitButton = (digit: number) => screen.getByTestId(`digit-${digit}`)
    const confirmButton = screen.getByTestId('confirm-button')

    // Enter 11 digits
    for (const number of [1, 8, 0, 3, 8, 6, 2, 1, 9, 9, 4]) {
      fireEvent.click(digitButton(number))
    }

    fireEvent.click(confirmButton)

    expect(await screen.findByText('Server feil')).toBeInTheDocument()
  })
})
