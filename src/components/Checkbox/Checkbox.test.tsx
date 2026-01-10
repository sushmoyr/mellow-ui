/**
 * Checkbox Component Tests
 */

import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Checkbox } from '../Checkbox';

describe('Checkbox', () => {
    it('renders unchecked by default', () => {
        render(<Checkbox />);
        expect(screen.getByRole('checkbox')).not.toBeChecked();
    });

    it('renders checked when defaultChecked is true', () => {
        render(<Checkbox defaultChecked />);
        expect(screen.getByRole('checkbox')).toBeChecked();
    });

    it('renders with label', () => {
        render(<Checkbox label="Accept terms" />);
        expect(screen.getByText('Accept terms')).toBeInTheDocument();
    });

    it('toggles when clicked', () => {
        render(<Checkbox />);
        const checkbox = screen.getByRole('checkbox');

        expect(checkbox).not.toBeChecked();
        fireEvent.click(checkbox);
        expect(checkbox).toBeChecked();
        fireEvent.click(checkbox);
        expect(checkbox).not.toBeChecked();
    });

    it('can be controlled', () => {
        const { rerender } = render(<Checkbox checked={false} onChange={() => { }} />);
        expect(screen.getByRole('checkbox')).not.toBeChecked();

        rerender(<Checkbox checked={true} onChange={() => { }} />);
        expect(screen.getByRole('checkbox')).toBeChecked();
    });

    it('can be disabled', () => {
        render(<Checkbox disabled />);
        expect(screen.getByRole('checkbox')).toBeDisabled();
    });

    it('handles change events', () => {
        const handleChange = vi.fn();
        render(<Checkbox onChange={handleChange} />);

        fireEvent.click(screen.getByRole('checkbox'));
        expect(handleChange).toHaveBeenCalled();
    });
});
