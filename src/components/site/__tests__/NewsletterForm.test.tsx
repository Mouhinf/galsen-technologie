/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NewsletterForm from '../NewsletterForm';

// Mock fetch globally
const originalFetch = global.fetch;
let mockFetch: jest.Mock;

beforeEach(() => {
  mockFetch = jest.fn();
  global.fetch = mockFetch;
});

afterAll(() => {
  global.fetch = originalFetch;
});

describe('NewsletterForm', () => {
  it('renders the form with input and subscribe button', () => {
    render(<NewsletterForm />);

    expect(
      screen.getByLabelText("Adresse email pour la newsletter")
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: "S'abonner à la newsletter" })
    ).toBeInTheDocument();
  });

  it('disables the button when email is empty', () => {
    render(<NewsletterForm />);

    const button = screen.getByRole('button', {
      name: "S'abonner à la newsletter",
    });
    expect(button).toBeDisabled();
  });

  it('enables the button when email is typed', async () => {
    const user = userEvent.setup();
    render(<NewsletterForm />);

    const input = screen.getByLabelText("Adresse email pour la newsletter");
    await user.type(input, 'test@example.com');

    const button = screen.getByRole('button', {
      name: "S'abonner à la newsletter",
    });
    expect(button).toBeEnabled();
  });

  it('shows success message on successful subscription', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ message: 'Merci pour votre inscription !' }),
    });

    const user = userEvent.setup();
    render(<NewsletterForm />);

    const input = screen.getByLabelText("Adresse email pour la newsletter");
    await user.type(input, 'test@example.com');

    const button = screen.getByRole('button', {
      name: "S'abonner à la newsletter",
    });
    await user.click(button);

    await waitFor(() => {
      expect(
        screen.getByText('Merci pour votre inscription !')
      ).toBeInTheDocument();
    });

    // Input should be cleared and replaced by success message
    expect(input).toHaveValue('');
  });

  it('shows error message when subscription fails', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: 'Adresse email invalide.' }),
    });

    const user = userEvent.setup();
    render(<NewsletterForm />);

    const input = screen.getByLabelText("Adresse email pour la newsletter");
    await user.type(input, 'test@example.com');

    const button = screen.getByRole('button', {
      name: "S'abonner à la newsletter",
    });
    await user.click(button);

    await waitFor(() => {
      expect(
        screen.getByText('Adresse email invalide.')
      ).toBeInTheDocument();
    });

    // Button should still be visible (not replaced by success message)
    expect(
      screen.getByRole('button', { name: "S'abonner à la newsletter" })
    ).toBeInTheDocument();
  });

  it('shows loading state while submitting', async () => {
    // Don't resolve immediately to catch loading state
    let resolvePromise!: (value: any) => void;
    mockFetch.mockReturnValueOnce(
      new Promise((resolve) => {
        resolvePromise = resolve;
      })
    );

    const user = userEvent.setup();
    render(<NewsletterForm />);

    const input = screen.getByLabelText("Adresse email pour la newsletter");
    await user.type(input, 'test@example.com');

    const button = screen.getByRole('button', {
      name: "S'abonner à la newsletter",
    });
    await user.click(button);

    // Wait for React state update to apply disabled state
    await waitFor(() => {
      expect(input).toBeDisabled();
    });
    await waitFor(() => {
      expect(button).toBeDisabled();
    });

    // Resolve the request and wait for success state
    resolvePromise({
      ok: true,
      json: async () => ({ message: 'Merci !' }),
    });

    await waitFor(() => {
      expect(screen.getByText('Merci !')).toBeInTheDocument();
    });
  });

  it('handles network errors gracefully', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Network error'));

    const user = userEvent.setup();
    render(<NewsletterForm />);

    const input = screen.getByLabelText("Adresse email pour la newsletter");
    await user.type(input, 'test@example.com');

    const button = screen.getByRole('button', {
      name: "S'abonner à la newsletter",
    });
    await user.click(button);

    await waitFor(() => {
      expect(screen.getByText('Network error')).toBeInTheDocument();
    });
  });

  it('shows generic error when fetch response has no error field', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({}),
    });

    const user = userEvent.setup();
    render(<NewsletterForm />);

    const input = screen.getByLabelText("Adresse email pour la newsletter");
    await user.type(input, 'test@example.com');

    const button = screen.getByRole('button', {
      name: "S'abonner à la newsletter",
    });
    await user.click(button);

    await waitFor(() => {
      expect(
        screen.getByText("Erreur lors de l'inscription")
      ).toBeInTheDocument();
    });
  });

  it('shows generic error when JSON parsing fails', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      json: async () => {
        throw new Error('Invalid JSON');
      },
    });

    const user = userEvent.setup();
    render(<NewsletterForm />);

    const input = screen.getByLabelText("Adresse email pour la newsletter");
    await user.type(input, 'test@example.com');
    await user.click(
      screen.getByRole('button', { name: "S'abonner à la newsletter" })
    );

    await waitFor(() => {
      expect(
        screen.getByText("Erreur lors de l'inscription")
      ).toBeInTheDocument();
    });
  });
});
