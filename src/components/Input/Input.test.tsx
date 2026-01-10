/**
 * Input Component Tests
 */

import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Input } from '../Input';

describe('Input', () => {
    it('renders with placeholder', () => {
        render(<Input placeholder="Enter text" />);
        expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
    });

    it('renders with label', () => {
        render(<Input label="Email" />);
        expect(screen.getByText('Email')).toBeInTheDocument();
    });

    it('handles input changes', () => {
        const handleChange = vi.fn();
        render(<Input onChange={handleChange} />);

        fireEvent.change(screen.getByRole('textbox'), { target: { value: 'test' } });
        expect(handleChange).toHaveBeenCalled();
    });

    it('can be controlled', () => {
        const { rerender } = render(<Input value="initial" onChange={() => { }} />);
        expect(screen.getByRole('textbox')).toHaveValue('initial');

        rerender(<Input value="updated" onChange={() => { }} />);
        expect(screen.getByRole('textbox')).toHaveValue('updated');
    });

    it('can be disabled', () => {
        render(<Input disabled />);
        expect(screen.getByRole('textbox')).toBeDisabled();
    });

    it('shows error message', () => {
        render(<Input error="This field is required" />);
        expect(screen.getByText('This field is required')).toBeInTheDocument();
    });

    it('renders with left icon', () => {
        const Icon = () => <span data-testid="icon">🔍</span>;
        render(<Input leftIcon={<Icon />} />);
        expect(screen.getByTestId('icon')).toBeInTheDocument();
    });

    it('renders with right icon', () => {
        const Icon = () => <span data-testid="icon">✓</span>;
        render(<Input rightIcon={<Icon />} />);
        expect(screen.getByTestId('icon')).toBeInTheDocument();
    });
});
